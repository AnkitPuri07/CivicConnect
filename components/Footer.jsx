import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-blue-100 mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Civic Connect
          </h2>
          <p className="text-sm leading-relaxed">
            Civic Connect is a digital platform that enables citizens to
            register complaints, track their status, and collaborate with
            authorities for efficient civic issue resolution.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/complaints" className="hover:text-white">
                Complaints
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-white">
                Track Status
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Account
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Built With
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Next.js (Frontend)</li>
            <li>Tailwind CSS</li>
            <li>Java Spring Boot (API)</li>
            <li>SQL Database</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-500">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Civic Connect. All rights reserved.
          </p>
          <p className="mt-1 text-blue-200">
            Developed by Ankit Puri, Sahaj Khadka & Aashish Thapa Magar
          </p>
        </div>
      </div>

    </footer>
  );
}
