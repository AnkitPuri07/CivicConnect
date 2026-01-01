import Link from "next/link";

export default function Navbar() {
  return (
    <section className="flex flex-wrap justify-center">
       <nav className=" bg-white border-b border-gray-200 fixed z-3 rounded w-4/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-semibold text-blue-600">
          CivicConnect
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/complaints" className="hover:text-blue-600 transition">
            Complaints
          </Link>
          <Link href="/track" className="hover:text-blue-600 transition">
            Track Status
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
    </section>
   
  );
}
