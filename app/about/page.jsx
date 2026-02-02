export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12 mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          About Civic Connect
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Civic Connect is a digital platform designed to bridge the gap between
          citizens and authorities by providing a transparent and efficient
          complaint management system.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to empower citizens to raise civic issues easily while
            enabling authorities to track, manage, and resolve complaints in a
            structured and accountable manner.
          </p>
        </div>

        {/* Technology */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Technology Stack
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Frontend built with <span className="font-medium">Next.js</span></li>
            <li>• Styled using <span className="font-medium">Tailwind CSS</span></li>
            <li>• Backend APIs developed with <span className="font-medium">Java Spring Boot</span></li>
            <li>• Database powered by <span className="font-medium">SQL</span></li>
          </ul>
        </div>

        {/* Developers */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:col-span-2">
          <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
            Developers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="border rounded-xl p-4">
              <p className="font-semibold text-gray-800">Ankit Puri</p>
              <p className="text-sm text-gray-500">Frontend & Integration</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="font-semibold text-gray-800">Sahaj Khadka</p>
              <p className="text-sm text-gray-500">Backend & API Development</p>
            </div>

            <div className="border rounded-xl p-4">
              <p className="font-semibold text-gray-800">Aashish Thapa Magar</p>
              <p className="text-sm text-gray-500">Database & System Design</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-14 text-center text-sm text-gray-500">
        <p>
          Built using Next.js & Java Spring Boot
        </p>
      </div>

    </div>
  );
}
