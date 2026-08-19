import Link from "next/link";
import { notFound } from "next/navigation";
import { internships } from "@/lib/internships";

export default async function InternshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const internship = internships.find(
    (item) => item.id === id
  );

  if (!internship) {
    notFound();
  }

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

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/internships"
            className="text-sm font-medium text-blue-600"
          >
            ← Back to Opportunities
          </Link>

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {internship.type}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {internship.location}
                  </span>
                </div>

                <h1 className="mt-4 text-4xl font-bold">
                  {internship.title}
                </h1>

                <p className="mt-2 text-lg font-medium text-gray-700">
                  {internship.company}
                </p>
              </div>

              <Link
                href={`/internships/apply?id=${internship.id}`}
                className="rounded-lg bg-blue-600 px-7 py-3 text-center font-medium text-white hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </div>

            <div className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-bold">
                About This Opportunity
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {internship.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">
                Opportunity Details
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold">
                    {internship.location}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold">
                    {internship.duration}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Opportunity Type
                  </p>

                  <p className="mt-1 font-semibold">
                    {internship.type}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">
                    Company
                  </p>

                  <p className="mt-1 font-semibold">
                    {internship.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold">
                Requirements
              </h2>

              <ul className="mt-5 space-y-3">
                {internship.requirements.map((requirement) => (
                  <li
                    key={requirement}
                    className="flex gap-3 text-gray-600"
                  >
                    <span className="mt-1 text-blue-600">
                      ✓
                    </span>

                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t pt-8">
              <Link
                href={`/internships/apply?id=${internship.id}`}
                className="block w-full rounded-lg bg-blue-600 px-6 py-4 text-center font-medium text-white hover:bg-blue-700"
              >
                Apply for This Opportunity
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}