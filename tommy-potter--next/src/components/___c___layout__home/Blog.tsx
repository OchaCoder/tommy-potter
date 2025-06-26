"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "../__c_utils__svg"

type Post = {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage: string | null
  category: string
  tags: string[]
}

export default function Blog({ posts }: { posts: Post[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector("article")
    if (!card) return
    const cardWidth = (card as HTMLElement).offsetWidth + 20 // 20 = approx gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
  }

  return (
    <section id="blog" className="py-20 px-2 relative">
      <h2 className="theme-font text-3xl border-b-2 w-full inline-block pb-2">Blog: Clay Journey on the Fingertips</h2>

      {/* Floating arrow buttons */}
      <button
        onClick={() => scrollByCard("left")}
        className="z-10 cursor-pointer hidden sm:flex absolute items-center left-2 top-1/2 -translate-y-1/2 bg-neutral-900/90 transition"
        style={{ height: "80px" }}>
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={() => scrollByCard("right")}
        className="z-10 cursor-pointer hidden sm:flex absolute items-center right-2 top-1/2 -translate-y-1/2 bg-neutral-900/90 transition"
        style={{ height: "80px" }}>
        <ChevronRight size={36} />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="
          mt-8 flex gap-5 overflow-x-auto
          pb-4 px-2 sm:px-4 
          snap-x snap-mandatory
          scroll-smooth

          sm:[&::-webkit-scrollbar]:hidden
          sm:[-ms-overflow-style:'none']
          sm:[scrollbar-width:'none']
        ">
        {posts.map((post) => (
          <article
            key={post.id}
            className="
              min-w-[220px] max-w-[240px] 
              shrink-0 snap-start 
              bg-neutral-800 text-white overflow-hidden 
              hover:shadow-lg transition-shadow duration-200
            ">
            {post.featuredImage && (
              <Link href={`/blog/${post.slug}`}>
                <Image src={post.featuredImage} alt={post.title} width={220} height={290} className="w-full object-cover aspect-[5/6] transition-opacity hover:opacity-80" />
              </Link>
            )}
            <div className="p-4 font-serif">
              <p className="text-[0.8rem]">
                {new Date(post.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
                ,{" "}
                <Link href={`/placeholder`} className="hover:text-gray-400">
                  <span dangerouslySetInnerHTML={{ __html: post.category }} />
                </Link>
              </p>

              <Link href={`/blog/${post.slug}`} className="block mt-1 space-y-1">
                <h3 className="theme-font text-xl hover:text-gray-300 transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                <div className="text-sm hover:text-gray-400 transition-colors" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </Link>

              <div className="mt-3 flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
