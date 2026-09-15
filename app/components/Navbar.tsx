import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
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

          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-blue-600"
              >
                Dashboard
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

              <span className="font-medium">
                Hi,{" "}
                {session.user.name?.split(" ")[0] || "there"}
              </span>

              <SignOutButton />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
