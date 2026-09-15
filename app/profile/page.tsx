import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "../../lib/prisma";

async function saveProfile(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const name = String(formData.get("name") || "").trim();
  const university = String(formData.get("university") || "").trim();
  const course = String(formData.get("course") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const skills = String(formData.get("skills") || "").trim();
  const bio = String(formData.get("bio") || "").trim();

  await prisma.profile.upsert({
    where: {
      email: session.user.email,
    },
    update: {
      name,
      university,
      course,
      location,
      phone,
      skills,
      bio,
    },
    create: {
      email: session.user.email,
      name,
      university,
      course,
      location,
      phone,
      skills,
      bio,
    },
  });

  redirect("/profile?saved=true");
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold">
            Please log in
          </h1>

          <p className="mt-3 text-gray-600">
            You need to be logged in to view your profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Log In
          </Link>
        </div>
      </main>
    );
  }

  const profile = await prisma.profile.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  const params = await searchParams;
  const saved = params.saved === "true";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            InternLink NG
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/internships"
              className="hover:text-blue-600"
            >
              Opportunities
            </Link>

            <Link
              href="/applications"
              className="hover:text-blue-600"
            >
              Applications
            </Link>

            <Link
              href="/saved"
              className="hover:text-blue-600"
            >
              Saved
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-medium text-blue-600">
            Student Profile
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Your Profile
          </h1>

          <p className="mt-4 text-gray-600">
            Complete your profile so future internship
            opportunities can match you better.
          </p>

          {saved && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              Profile saved successfully.
            </div>
          )}

          <form action={saveProfile}>
            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                Account Information
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      profile?.name || session.user.name || ""
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={session.user.email || ""}
                    disabled
                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    University
                  </label>

                  <input
                    type="text"
                    name="university"
                    defaultValue={profile?.university || ""}
                    placeholder="e.g. University of Lagos"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Course of Study
                  </label>

                  <input
                    type="text"
                    name="course"
                    defaultValue={profile?.course || ""}
                    placeholder="e.g. Computer Science"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    defaultValue={profile?.location || ""}
                    placeholder="e.g. Lagos"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    defaultValue={profile?.phone || ""}
                    placeholder="e.g. 08012345678"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                Skills
              </h2>

              <p className="mt-2 text-gray-600">
                Add the skills you want employers to know about.
              </p>

              <textarea
                name="skills"
                rows={4}
                defaultValue={profile?.skills || ""}
                placeholder="e.g. React, JavaScript, Python, UI/UX Design"
                className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                About You
              </h2>

              <p className="mt-2 text-gray-600">
                Write a short introduction about yourself.
              </p>

              <textarea
                name="bio"
                rows={5}
                defaultValue={profile?.bio || ""}
                placeholder="Tell employers a little about yourself, your interests, and what you hope to learn..."
                className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}