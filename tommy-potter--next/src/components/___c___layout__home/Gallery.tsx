"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Image from "next/image"
import { IconClose } from "../__c_utils__svg"

const potteryImages = [
  { src: "/img/collection/collection-001-jm.jpg", alt: "Photo by JM", w: 3038, h: 4554 },
  { src: "/img/collection/collection-002-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4000, h: 3000 },
  { src: "/img/collection/collection-003-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4000, h: 3000 },
  { src: "/img/collection/collection-004-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4000, h: 3000 },
  { src: "/img/collection/collection-005-jm.jpg", alt: "Photo by JM", w: 2681, h: 3681 },
  { src: "/img/collection/collection-006-evy-prentice.jpg", alt: "Pottery by Evy Prentice", w: 6000, h: 4000 },
  { src: "/img/collection/collection-007-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4896, h: 3264 },
  { src: "/img/collection/collection-008-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4000, h: 3000 },
  { src: "/img/collection/collection-009-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 4000, h: 3000 },
  { src: "/img/collection/collection-010-tom-crew.jpg", alt: "Pottery by Tom Crew", w: 2675, h: 2010 },
  { src: "/img/collection/collection-011-cafeconcetto.jpg", alt: "Photo by Cafeconcetto", w: 4000, h: 6000 },
]

export default function Gallery() {
  const [selected, setSelected] = useState<null | (typeof potteryImages)[0]>(null)
  const [loading, setLoading] = useState(false)
  return (
    <section id="collection" className="flex justify-center w-full">
      <div className=" max-w-5xl py-16 ">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 2.0, ease: "easeIn" }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl tracking-tight theme-font">The Collection</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }}>
            <p className="mt-2 text-xl theme-font">Curated pottery pieces capturing timeless beauty and craftsmanship.</p>
          </motion.div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-4">
          {potteryImages.map((img, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <motion.div
                key={index}
                className="mb-4 break-inside-avoid cursor-pointer"
                onClick={() => {
                  setSelected(img)
                  setLoading(true)
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                viewport={{ once: true }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="rounded-md"
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Modal viewer */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}>
              <motion.div
                key="modal"
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing on image click
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <Image
                  onLoadingComplete={() => setLoading(false)}
                  src={selected.src}
                  alt={selected.alt}
                  width={selected.w}
                  height={selected.h}
                  className="rounded-md object-contain w-auto h-auto max-h-[90vh] max-w-[90vw] mx-auto"
                  sizes="100vw"
                  priority
                />
                <button onClick={() => setSelected(null)} className="absolute top-2 right-10 bg-black/30 rounded-full cursor-pointer">
                  <IconClose size={36} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
