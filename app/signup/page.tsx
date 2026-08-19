export default function SignupPage() {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
  
          <p className="mt-2 text-gray-600">
            Join InternLink NG and start finding opportunities.
          </p>
  
          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
  
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
  
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
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
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
  
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>
  
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
  
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Account
            </button>
          </form>
  
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-blue-600">
              Log in
            </a>
          </p>
        </div>
      </main>
    );
  }