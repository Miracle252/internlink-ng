import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "../../lib/prisma";

const internshipNames: Record<string, string> = {
  "software-engineering": "Software Engineering Intern",
  "ui-ux-design": "UI/UX Design Intern",
  "data-analyst": "Data Analyst Intern",
};

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Sign in required</h1>

          <p className="mt-3 text-gray-600">
            Please sign in to view your applications.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const applications = await prisma.application.findMany({
    where: {
      userEmail: session.user.email,
    },
    orderBy: {
      appliedAt: "desc",
    },
  });

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const underReviewCount = applications.filter(
    (application) => application.status === "Under Review"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            InternLink NG
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/internships"
              className="hover:text-blue-600"
            >
              Opportunities
            </Link>

            <Link
              href="/applications"
              className="font-medium text-blue-600"
            >
              Applications
            </Link>

            <Link
              href="/saved"
              className="hover:text-blue-600"
            >
              Saved
            </Link>

            <Link
              href="/profile"
              className="hover:text-blue-600"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div>
            <h1 className="text-4xl font-bold">
              My Applications
            </h1>

            <p className="mt-2 text-gray-600">
              Track the internships you have applied for.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Applications
              </p>

              <p className="mt-2 text-3xl font-bold">
                {totalApplications}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Applied
              </p>

              <p className="mt-2 text-3xl font-bold">
                {appliedCount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Under Review
              </p>

              <p className="mt-2 text-3xl font-bold">
                {underReviewCount}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Interviews
              </p>

              <p className="mt-2 text-3xl font-bold">
                {interviewCount}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {applications.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold">
                  No applications yet
                </h2>

                <p className="mt-2 text-gray-600">
                  Start exploring opportunities and apply for one.
                </p>

                <Link
                  href="/internships"
                  className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Browse Opportunities
                </Link>
              </div>
            ) : (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold">
                        {internshipNames[application.internshipId] ||
                          application.internshipId}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Applied on{" "}
                        {new Date(
                          application.appliedAt
                        ).toLocaleDateString()}
                      </p>

                      <div className="mt-4 space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">
                            University:
                          </span>{" "}
                          {application.university}
                        </p>

                        <p>
                          <span className="font-medium">
                            Course:
                          </span>{" "}
                          {application.course}
                        </p>

                        {application.cvFileName && (
                          <p>
                            <span className="font-medium">
                              CV:
                            </span>{" "}
                            {application.cvFileName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                        {application.status}
                      </span>

                      {application.cvFileData && (
                        <a
                          href={`/api/applications/${application.id}/cv`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                        >
                          View CV
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}