import React from 'react'

function Hero() {
  return (
    <>
    <div className="relative mt-20 px-6 md:px-10 lg:px-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">

    {/* LEFT: Text Content */}
    <div className="space-y-6">
      <span className="uppercase tracking-wider text-sm text-gray-400">
        Civic Engagement Platform
      </span>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Connecting Citizens <br />
        <span className="text-blue-500">With Local Governance</span>
      </h1>

      <p className="text-gray-500 max-w-md">
        Report issues, track complaints, and stay informed about civic
        developments in your area — all in one place.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>

        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </div>

    {/* RIGHT: Image */}
    <div className="relative h-[350px] md:h-[450px] lg:h-[550px]">
      <img
        src="/images/civic-hero.jpg"
        alt="Civic Connect"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>

  </div>
</div>

    </>
  )
}

export default Hero