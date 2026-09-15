import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to apply." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const internshipId = String(
      formData.get("internshipId") || ""
    ).trim();

    const fullName = String(
      formData.get("fullName") || ""
    ).trim();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const university = String(
      formData.get("university") || ""
    ).trim();

    const course = String(
      formData.get("course") || ""
    ).trim();

    const coverLetter = String(
      formData.get("coverLetter") || ""
    ).trim();

    const cv = formData.get("cv");

    if (
      !internshipId ||
      !fullName ||
      !phone ||
      !university ||
      !course ||
      !coverLetter ||
      !(cv instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required application fields and upload your CV.",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(cv.type)) {
      return NextResponse.json(
        {
          error: "Please upload your CV as a PDF, DOC, or DOCX file.",
        },
        { status: 400 }
      );
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (cv.size > maxFileSize) {
      return NextResponse.json(
        {
          error: "Your CV must be smaller than 5MB.",
        },
        { status: 400 }
      );
    }

    const cvArrayBuffer = await cv.arrayBuffer();
    const cvFileData = Buffer.from(cvArrayBuffer);

    const application = await prisma.application.upsert({
      where: {
        userEmail_internshipId: {
          userEmail: session.user.email,
          internshipId,
        },
      },

      update: {
        fullName,
        phone,
        university,
        course,
        coverLetter,
        cvFileName: cv.name,
        cvFileData,
      },

      create: {
        userEmail: session.user.email,
        internshipId,
        fullName,
        phone,
        university,
        course,
        coverLetter,
        cvFileName: cv.name,
        cvFileData,
        status: "Applied",
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        message: "Application submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your application.",
      },
      { status: 500 }
    );
  }
}