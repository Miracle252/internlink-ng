import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold">
            Please log in
          </h1>

          <p className="mt-3 text-gray-600">
            You need to be logged in to view your dashboard.
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

            <Link
              href="/dashboard"
              className="font-medium text-blue-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-medium text-blue-600">
            Student Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Welcome,{" "}
            {session.user.name?.split(" ")[0] || "Student"}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Manage your internship journey from one place.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Link
              href="/applications"
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              <p className="text-sm font-medium text-blue-600">
                Applications
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Track Applications
              </h2>

              <p className="mt-3 text-gray-600">
                View the opportunities you have applied for and
                track their progress.
              </p>
            </Link>

            <Link
              href="/saved"
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              <p className="text-sm font-medium text-blue-600">
                Saved
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Saved Opportunities
              </h2>

              <p className="mt-3 text-gray-600">
                Quickly return to internships and SIWES
                opportunities you are interested in.
              </p>
            </Link>

            <Link
              href="/profile"
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
            >
              <p className="text-sm font-medium text-blue-600">
                Profile
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Complete Your Profile
              </h2>

              <p className="mt-3 text-gray-600">
                Add your university, course, skills, and other
                information employers need.
              </p>
            </Link>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
              Your Account
            </h2>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                  {session.user.name?.charAt(0) || "S"}
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold">
                  {session.user.name || "Student"}
                </h3>

                <p className="mt-1 text-gray-600">
                  {session.user.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-blue-600 p-8 text-white">
            <h2 className="text-2xl font-bold">
              Ready for your next opportunity?
            </h2>

            <p className="mt-3 max-w-2xl text-blue-100">
              Explore available internships and SIWES
              opportunities that could be your next big step.
            </p>

            <Link
              href="/internships"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-blue-600 hover:bg-gray-100"
            >
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}