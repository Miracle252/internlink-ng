import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userEmail: session.user.email,
      },
      select: {
        cvFileName: true,
        cvFileData: true,
      },
    });

    if (!application || !application.cvFileData) {
      return NextResponse.json(
        { error: "CV not found." },
        { status: 404 }
      );
    }

    const fileName = application.cvFileName || "CV";

    const extension = fileName.toLowerCase();

    let contentType = "application/octet-stream";

    if (extension.endsWith(".pdf")) {
      contentType = "application/pdf";
    } else if (extension.endsWith(".doc")) {
      contentType = "application/msword";
    } else if (extension.endsWith(".docx")) {
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    return new NextResponse(application.cvFileData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("CV retrieval error:", error);

    return NextResponse.json(
      { error: "Something went wrong while retrieving your CV." },
      { status: 500 }
    );
  }
}
