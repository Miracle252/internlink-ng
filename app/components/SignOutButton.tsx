"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-medium text-gray-700 hover:text-red-600"
    >
      Sign Out
    </button>
  );
}