export const revalidate = 60 // seconds

import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import wretch from "wretch"
import Image from "next/image"
import Link from "next/link"

type WPPost = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  featured_media: number
  categories: number[]
  tags: number[]
}

type WPMedia = {
  id: number
  source_url: string
  alt_text: string
}

type WPTerm = {
  id: number
  name: string
  slug: string
}

type WPPreview = {
  id: number
  slug: string
  title: { rendered: string }
  date: string
}

async function fetchWPPost(slug: string): Promise<
  WPPost & {
    featuredImage?: WPMedia
    categoryList?: WPTerm[]
    tagList?: WPTerm[]
    prevPost?: WPPreview // older (newer date)
    nextPost?: WPPreview // newer (older date)
  }
> {
  const base = process.env.NEXT_PUBLIC_WP
  const url = `${base}/posts?slug=${slug}`
  try {
    const rawRes = await wretch(url).get().json<WPPost[]>()
    if (!rawRes || rawRes.length === 0) {
      notFound()
    }

    const post = rawRes[0]
    const postDate = post.date
    const [featuredImage, categoryList, tagList, newerPosts, olderPosts] = await Promise.all([
      post.featured_media ? wretch(`${base}/media/${post.featured_media}`).get().json<WPMedia>() : null,
      post.categories.length
        ? wretch(`${base}/categories?include=${post.categories.join(",")}`)
            .get()
            .json<WPTerm[]>()
        : [],
      post.tags.length
        ? wretch(`${base}/tags?include=${post.tags.join(",")}`)
            .get()
            .json<WPTerm[]>()
        : [],
      wretch(`${base}/posts?per_page=1&orderby=date&order=asc&after=${postDate}`).get().json<WPPreview[]>(),
      wretch(`${base}/posts?per_page=1&orderby=date&order=desc&before=${postDate}`).get().json<WPPreview[]>(),
    ])

    return {
      ...post,
      featuredImage: featuredImage || undefined,
      categoryList,
      tagList,
      nextPost: newerPosts[0], // newer (older date)
      prevPost: olderPosts[0], // older (newer date)
    }
  } catch (err) {
    console.error("Failed to fetch post with meta:", err)
    redirect("/")
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchWPPost(slug)

  return {
    title: post?.title?.rendered || "Blog Post",
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchWPPost(slug)

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 font-serif">
      {/* Title Block */}
      <div className="text-center mb-10">
        <p className="font-theme text-2xl uppercase tracking-wide">Blog :</p>
        <h1 className="font-theme text-4xl font-light sm:text-5xl leading-tight" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Category */}
        {post.categoryList?.length && post.categoryList.length > 0 && (
          <span>
            {post.categoryList.map((cat) => (
              <div dangerouslySetInnerHTML={{ __html: cat.name }} key={cat.id} className="pt-3 text-sm font-light" />
            ))}
          </span>
        )}
      </div>

      {/* Content Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Featured Image */}
        <div className="w-full flex justify-center">
          <div className="relative max-w-lg aspect-[6/5] md:aspect-auto md:w-full">
            {post.featuredImage && (
              <Image
                src={post.featuredImage.source_url}
                alt={post.featuredImage.alt_text || "Featured image"}
                className="object-cover object-center w-full h-full rounded-md"
                width={2560} // or any base size
                height={1920}
              />
            )}
          </div>
        </div>

        {/* Right: Date + Body + Category + Tags */}
        <div className="prose lg:prose-xl max-w-none">
          {/* Date */}
          <div className="text-sm py-5 flex items-center gap-5">{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}</div>

          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          {/* Tags */}
          {post.tagList?.length && post.tagList.length > 0 && (
            <p className="mt-2 text-sm ">
              {post.tagList.map((tag) => (
                <span dangerouslySetInnerHTML={{ __html: `#${tag.name}` }} key={tag.id} className="inline-block"></span>
              ))}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-around py-10 text-sm ">
        {post.prevPost ? (
          <Link href={`/blog/${post.prevPost.slug}`} className="hover:text-neutral-500 transition duration-200">
            ← Older
          </Link>
        ) : (
          <span className="opacity-30">← Older</span>
        )}

        <Link href="/" className="hover:text-neutral-500 transition duration-200">
          Top
        </Link>

        {post.nextPost ? (
          <Link href={`/blog/${post.nextPost.slug}`} className="hover:text-neutral-500 transition duration-200">
            Newer →
          </Link>
        ) : (
          <span className="opacity-30">Newer →</span>
        )}
      </div>
    </article>
  )
}
