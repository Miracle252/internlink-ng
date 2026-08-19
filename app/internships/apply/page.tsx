"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { internships } from "../../../lib/internships";

const APPLICATIONS_COOKIE_NAME =
  "internlink-applications";

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("id");

  const internship = internships.find(
    (item) => item.id === internshipId
  );

  const [submitted, setSubmitted] = useState(false);

  function saveApplication() {
    if (!internship) {
      return;
    }

    let existingApplications = [];

    try {
      const saved =
        document.cookie
          .split("; ")
          .find((cookie) =>
            cookie.startsWith(
              `${APPLICATIONS_COOKIE_NAME}=`
            )
          );

      if (saved) {
        const value = saved.substring(
          `${APPLICATIONS_COOKIE_NAME}=`.length
        );

        const decoded = decodeURIComponent(value);
        const parsed: unknown = JSON.parse(decoded);

        if (Array.isArray(parsed)) {
          existingApplications = parsed;
        }
      }
    } catch {
      existingApplications = [];
    }

    const newApplication = {
      id: crypto.randomUUID(),
      internshipId: internship.id,
      status: "Applied",
      date: new Date().toISOString(),
    };

    const updatedApplications = [
      ...existingApplications,
      newApplication,
    ];

    document.cookie = `${APPLICATIONS_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(updatedApplications)
    )}; path=/; max-age=31536000; SameSite=Lax`;

    setSubmitted(true);
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    saveApplication();
  }

  if (!internship) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold">
            Internship Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            Please go back and select an internship before
            applying.
          </p>

          <Link
            href="/internships"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Browse Opportunities
          </Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Application Submitted!
          </h1>

          <p className="mt-3 text-gray-600">
            Your application for{" "}
            <span className="font-semibold">
              {internship.title}
            </span>{" "}
            has been submitted successfully.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/applications"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Track Application
            </Link>

            <Link
              href="/internships"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50"
            >
              Browse Opportunities
            </Link>
          </div>
        </div>
      </main>
    );
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
              href="/applications"
              prefetch={false}
              className="hover:text-blue-600"
            >
              Applications
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
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/internships/${internship.id}`}
            className="text-sm font-medium text-blue-600"
          >
            ← Back to Opportunity
          </Link>

          <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
            <div className="rounded-xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-600">
                Applying for
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {internship.title}
              </h2>

              <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                <span>{internship.company}</span>
                <span>•</span>
                <span>{internship.location}</span>
                <span>•</span>
                <span>{internship.type}</span>
              </div>
            </div>

            <div className="mt-8 border-b pb-6">
              <p className="font-medium text-blue-600">
                Application Form
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Complete Your Application
              </h1>

              <p className="mt-3 text-gray-600">
                Provide your details below to apply for this
                opportunity.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  required
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
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  required
                  placeholder="08012345678"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  University
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your university"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Course of Study
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Cover Letter / Message
                </label>

                <textarea
                  required
                  rows={6}
                  placeholder="Tell the company why you are interested in this opportunity..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  CV
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-4 font-medium text-white hover:bg-blue-700"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}