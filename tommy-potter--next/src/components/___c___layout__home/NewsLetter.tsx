"use client"

import Image from "next/image"

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image src="/img/taylor-heery-newsletter-sm.jpg" alt="Photo by Taylor Heery" fill className="object-cover object-center opacity-50" sizes="100vw" priority />
      </div>

      {/* Overlay + Content */}
      <div className="relative px-6 py-20 sm:px-10 lg:px-20 max-w-4xl mx-auto text-center">
        <h2 className="theme-font text-3xl sm:text-4xl font-light mb-6">
          <span>Never miss out—sign up for newsletters from </span>
          <span className="">Tommy Potter</span>
        </h2>

        {/* Form */}
        <form className="font-serif flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <input type="email" placeholder="Email Address" className="border-b  px-2 py-2 w-full focus:outline-none " required />
          <button type="submit" className="cursor-pointer mt-2 sm:mt-0 bg-neutral-800 text-white px-8 py-2 rounded hover:bg-neutral-800/90 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
