"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="w-full border-t border-neutral-800 py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Column */}

        <div className="text-center lg:text-left space-y-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, ease: "easeIn" }} viewport={{ once: true }}>
            <h2 className="theme-font font-light text-4xl">About Tommy Potter</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 3, ease: "easeOut" }} viewport={{ once: true }}>
            <p className="font-serif font-light text-lg leading-relaxed">
              Tommy Potter is a pottery artisan based in the highlands of somewhere. With a love for tactile forms and timeless beauty, their work reflects a deep respect for tradition blended with
              quiet innovation. Every curve tells a story — one of patience, precision, and passion.
            </p>{" "}
          </motion.div>
        </div>

        {/* Image Column */}
        <motion.div className="flex justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, ease: "easeIn" }} viewport={{ once: true }}>
          <div className="aspect-[6/5] w-full max-w-[600px] relative">
            <Image src="/img/about-anne-nygard-sm.jpg" alt="Photo by Anne Nygard" fill sizes="900" className="object-cover object-center rounded-md shadow-md" priority />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
