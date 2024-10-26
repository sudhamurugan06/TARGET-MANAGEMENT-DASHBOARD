import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold animate__animated animate__fadeInDown">Welcome to Target Management Dashboard</h1>
        <p className="mt-4 text-lg animate__animated animate__fadeIn animate__delay-1s">
          Manage and track your acquisition targets with ease.
        </p>
      </header>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <Link href="/dashboard">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl animate__animated animate__zoomIn">
            Go to Dashboard
          </button>
        </Link>
        <Link href="/dashboard/manage">
          <button className="px-6 py-3 bg-yellow-400 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl animate__animated animate__zoomIn animate__delay-2s">
            Manage Targets
          </button>
        </Link>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-sm">&copy; 2024 Target Management Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};
