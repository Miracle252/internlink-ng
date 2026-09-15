"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { internships } from "../../lib/internships";
import {
  SAVED_COOKIE_NAME,
  parseSavedIds,
} from "../../lib/saved";

const EMPTY_SAVED_IDS: string[] = [];
const savedListeners = new Set<() => void>();

let cachedCookieValue: string | null = null;
let cachedSavedIds: string[] = EMPTY_SAVED_IDS;

function getCookieValue(): string {
  if (typeof document === "undefined") {
    return "";
  }

  const savedCookie = document.cookie
    .split("; ")
    .find((cookie) =>
      cookie.startsWith(`${SAVED_COOKIE_NAME}=`)
    );

  return savedCookie
    ? savedCookie.substring(`${SAVED_COOKIE_NAME}=`.length)
    : "";
}

function getSavedIds() {
  const cookieValue = getCookieValue();

  if (cookieValue === cachedCookieValue) {
    return cachedSavedIds;
  }

  cachedCookieValue = cookieValue;

  if (!cookieValue) {
    cachedSavedIds = EMPTY_SAVED_IDS;
    return cachedSavedIds;
  }

  cachedSavedIds = parseSavedIds(cookieValue);

  return cachedSavedIds;
}

function getServerSavedIds() {
  return EMPTY_SAVED_IDS;
}

function subscribeToSavedIds(listener: () => void) {
  savedListeners.add(listener);

  return () => {
    savedListeners.delete(listener);
  };
}

function saveIdsToCookie(ids: string[]) {
  const encodedValue = encodeURIComponent(
    JSON.stringify(ids)
  );

  document.cookie = `${SAVED_COOKIE_NAME}=${encodedValue}; path=/; max-age=31536000; SameSite=Lax`;

  cachedCookieValue = encodedValue;
  cachedSavedIds = ids;

  savedListeners.forEach((listener) => listener());
}

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("Location");
  const [selectedType, setSelectedType] =
    useState("Opportunity Type");

  const savedIds = useSyncExternalStore(
    subscribeToSavedIds,
    getSavedIds,
    getServerSavedIds
  );

  function toggleSave(id: string) {
    const currentSavedIds = getSavedIds();

    const updatedIds = currentSavedIds.includes(id)
      ? currentSavedIds.filter(
          (savedId) => savedId !== id
        )
      : [...currentSavedIds, id];

    saveIdsToCookie(updatedIds);
  }

  const filteredInternships = internships.filter(
    (internship) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        internship.title.toLowerCase().includes(search) ||
        internship.company.toLowerCase().includes(search);

      const matchesLocation =
        selectedLocation === "Location" ||
        internship.location === selectedLocation;

      const matchesType =
        selectedType === "Opportunity Type" ||
        internship.type === selectedType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType
      );
    }
  );

  function clearFilters() {
    setSearchTerm("");
    setSelectedLocation("Location");
    setSelectedType("Opportunity Type");
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
              className="font-medium text-blue-600"
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

      <section className="px-8 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="font-medium text-blue-600">
            Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Find Your Next SIWES or Internship
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Discover opportunities that match your course,
            skills, location, and career interests.
          </p>
        </div>
      </section>

      <section className="px-8">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />

            <select
              value={selectedLocation}
              onChange={(event) =>
                setSelectedLocation(event.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="Location">
                Location
              </option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Ibadan">Ibadan</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={selectedType}
              onChange={(event) =>
                setSelectedType(event.target.value)
              }
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            >
              <option value="Opportunity Type">
                Opportunity Type
              </option>
              <option value="SIWES">SIWES</option>
              <option value="Internship">
                Internship
              </option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Available Opportunities
            </h2>

            <p className="text-sm text-gray-500">
              {filteredInternships.length} opportunities
            </p>
          </div>

          <div className="grid gap-6">
            {filteredInternships.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <h3 className="text-lg font-semibold">
                  No opportunities found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredInternships.map((internship) => {
                const isSaved = savedIds.includes(
                  internship.id
                );

                return (
                  <article
                    key={internship.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
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

                        <p className="mt-3 max-w-2xl text-gray-600">
                          {internship.description}
                        </p>
                      </div>

                      <div className="flex gap-3 md:flex-col">
                        <button
                          type="button"
                          onClick={() =>
                            toggleSave(internship.id)
                          }
                          className={
                            isSaved
                              ? "rounded-lg bg-blue-50 px-5 py-2 font-medium text-blue-700"
                              : "rounded-lg border border-gray-300 px-5 py-2 font-medium hover:bg-gray-50"
                          }
                        >
                          {isSaved ? "Saved" : "Save"}
                        </button>

                        <Link
                          href={`/internships/${internship.id}`}
                          className="rounded-lg bg-blue-600 px-5 py-2 text-center font-medium text-white hover:bg-blue-700"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
