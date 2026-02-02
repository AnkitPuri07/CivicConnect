"use client";
import React from 'react'

function Hero() {
  return (
    <>
   <div className="relative mt-20 px-6 md:px-10 lg:px-16 bg-white">
  {/* Hero container */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[80vh]">

    {/* LEFT: Text Content */}
    <div className="relative  space-y-6 text-center lg:text-left">
      <span className="uppercase tracking-wider text-sm text-slate-700 lg:text-gray-400">
        Civic Engagement Platform
      </span>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white lg:text-black">
        Connecting Citizens <br />
        <span className="text-blue-400 lg:text-blue-500">With Local Governance</span>
      </h1>

      <p className="text-gray-200 lg:text-gray-500 max-w-md mx-auto lg:mx-0">
        Report issues, track complaints, and stay informed about civic
        developments in your area — all in one place.
      </p>

      <div className="flex justify-center lg:justify-start gap-4">
        <a href="#FieldForComplaint" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </a>

        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </div>

    {/* RIGHT: Image (only visible on lg) */}
    <div className="hidden lg:block relative h-[450px]">
      <img
        src="/images/civic-hero.jpg"
        alt="Civic Connect"
        className="w-full h-full object-cover rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      />
    </div>

  </div>

  {/* Background Image for small/medium screens */}
  <div className="absolute inset-0 lg:hidden -z-10">
    <div
      className="w-full h-full bg-cover bg-center rounded-2xl"
      style={{ backgroundImage: "url('/images/civic-hero.jpg')" }}
    ></div>
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
  </div>
</div>

    </>
  )
}

export default Hero