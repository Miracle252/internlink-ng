import Link from "next/link";
import { cookies } from "next/headers";
import { internships } from "../../lib/internships";
import {
  APPLICATIONS_COOKIE_NAME,
  parseApplications,
} from "../../lib/applications";

export const dynamic = "force-dynamic";

function getStatusStyle(status: string) {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-700";

    case "Under Review":
      return "bg-yellow-50 text-yellow-700";

    case "Interview":
      return "bg-purple-50 text-purple-700";

    case "Accepted":
      return "bg-green-50 text-green-700";

    case "Rejected":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ApplicationsPage() {
  const cookieStore = await cookies();

  const applicationsCookie = cookieStore.get(
    APPLICATIONS_COOKIE_NAME
  );

  const applications = parseApplications(
    applicationsCookie?.value
  );

  const applicationList = applications
    .map((application) => {
      const internship = internships.find(
        (item) => item.id === application.internshipId
      );

      if (!internship) {
        return null;
      }

      return {
        application,
        internship,
      };
    })
    .filter(
      (
        item
      ): item is {
        application: (typeof applications)[number];
        internship: (typeof internships)[number];
      } => item !== null
    );

  const appliedCount = applicationList.filter(
    (item) => item.application.status === "Applied"
  ).length;

  const underReviewCount = applicationList.filter(
    (item) => item.application.status === "Under Review"
  ).length;

  const interviewCount = applicationList.filter(
    (item) => item.application.status === "Interview"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            InternLink NG
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/internships"
              className="hover:text-blue-600"
            >
              Opportunities
            </Link>

            <Link
              href="/applications"
              prefetch={false}
              className="font-medium text-blue-600"
            >
              Applications
            </Link>

            <Link
              href="/saved"
              prefetch={false}
              className="hover:text-blue-600"
            >
              Saved
            </Link>

            <Link
              href="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-medium text-blue-600">
            Application Tracker
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Track Your Applications
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Keep track of the internships and SIWES
            opportunities you have applied for.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Applications
            </p>

            <p className="mt-2 text-3xl font-bold">
              {applicationList.length}
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
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold">
            Your Applications
          </h2>

          {applicationList.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold">
                No applications yet
              </h3>

              <p className="mt-2 text-gray-600">
                Apply for an internship to see it here.
              </p>

              <Link
                href="/internships"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Browse Opportunities
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {applicationList.map(
                ({ application, internship }) => (
                  <article
                    key={application.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {internship.type}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {internship.location}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">
                          {internship.title}
                        </h3>

                        <p className="mt-1 font-medium text-gray-700">
                          {internship.company}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          Applied on{" "}
                          {formatDate(application.date)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusStyle(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                        <Link
                          href={`/internships/${internship.id}`}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}