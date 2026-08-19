"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  function handleGitHubLogin() {
    signIn("github", {
      callbackUrl: "/",
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            InternLink NG
          </Link>
        </div>
      </header>

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <div className="text-center">
            <p className="font-medium text-blue-600">
              Welcome Back
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Log in to InternLink NG
            </h1>

            <p className="mt-3 text-gray-600">
              Continue your internship journey.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGitHubLogin}
            className="mt-8 w-full rounded-lg bg-gray-900 px-6 py-4 font-medium text-white transition hover:bg-gray-800"
          >
            Continue with GitHub
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-lg bg-gray-200 px-6 py-4 font-medium text-gray-500"
            >
              Email Login Coming Soon
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            New to InternLink NG?

            <Link
              href="/signup"
              className="ml-1 font-medium text-blue-600 hover:underline"
            >
              Get Started
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}