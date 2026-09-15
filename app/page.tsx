import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-medium text-blue-600">
            Built for Nigerian Students
          </p>

          <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight">
            Find SIWES & Internship Opportunities Without the
            Stress.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Discover opportunities, save companies, track your
            applications, and take control of your internship
            journey.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/internships"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Find Opportunities
            </Link>

            <Link
              href="/#how-it-works"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section
        id="opportunities"
        className="bg-gray-50 px-8 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            Everything You Need for Your Internship Journey
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Find Opportunities
              </h3>

              <p className="mt-3 text-gray-600">
                Search for SIWES and internship opportunities
                based on your interests and location.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Track Applications
              </h3>

              <p className="mt-3 text-gray-600">
                Keep track of every application and know exactly
                where you stand.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Improve Your CV
              </h3>

              <p className="mt-3 text-gray-600">
                Get useful CV tips and eventually use AI to
                improve your CV.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="px-8 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            How InternLink NG Works
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-blue-600">
                1
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Create Your Profile
              </h3>

              <p className="mt-2 text-gray-600">
                Tell us about your course, skills, interests,
                and location.
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-blue-600">
                2
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Find Opportunities
              </h3>

              <p className="mt-2 text-gray-600">
                Explore internships and SIWES opportunities that
                match you.
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-blue-600">
                3
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Track Your Journey
              </h3>

              <p className="mt-2 text-gray-600">
                Save opportunities and track your applications
                from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t px-8 py-8">
        <div className="mx-auto max-w-6xl text-sm text-gray-500">
          © 2026 InternLink NG. Built for Nigerian students.
        </div>
      </footer>
    </main>
  );
}
