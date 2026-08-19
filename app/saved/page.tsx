import Link from "next/link";
import { cookies } from "next/headers";
import { internships } from "../../lib/internships";
import {
  SAVED_COOKIE_NAME,
  parseSavedIds,
} from "../../lib/saved";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const cookieStore = await cookies();

  const savedCookie = cookieStore.get(
    SAVED_COOKIE_NAME
  );

  const savedIds = parseSavedIds(savedCookie?.value);

  const savedInternships = internships.filter((internship) =>
    savedIds.includes(internship.id)
  );

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
              className="hover:text-blue-600"
            >
              Applications
            </Link>

            <Link
              href="/saved"
              prefetch={false}
              className="font-medium text-blue-600"
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
            Saved Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Opportunities You Saved
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Keep interesting opportunities here so you can come
            back to them later.
          </p>

          {savedInternships.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold">
                No saved opportunities yet
              </h2>

              <p className="mt-2 text-gray-600">
                Browse opportunities and save the ones you are
                interested in.
              </p>

              <Link
                href="/internships"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Browse Opportunities
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-5">
              {savedInternships.map((internship) => (
                <article
                  key={internship.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {internship.type}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {internship.location}
                        </span>
                      </div>

                      <h2 className="mt-4 text-xl font-semibold">
                        {internship.title}
                      </h2>

                      <p className="mt-1 font-medium text-gray-700">
                        {internship.company}
                      </p>

                      <p className="mt-3 max-w-2xl text-gray-600">
                        {internship.description}
                      </p>
                    </div>

                    <Link
                      href={`/internships/${internship.id}`}
                      className="rounded-lg bg-blue-600 px-5 py-2 text-center font-medium text-white hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}