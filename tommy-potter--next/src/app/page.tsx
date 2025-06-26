import Gallery from "@/components/___c___layout__home/Gallery"
import Hero from "@/components/___c___layout__home/Hero"
import wretch from "wretch"
import Blog from "@/components/___c___layout__home/Blog"
import About from "@/components/___c___layout__home/About"
import Newsletter from "@/components/___c___layout__home/NewsLetter"

export default async function Home() {
  const url = `${process.env.NEXT_PUBLIC_WP}/posts?per_page=5&_embed`

  let data: any[] = []

  try {
    data = await wretch(url).get().json()
  } catch (err) {
    console.error("Failed to fetch blog posts:", err)
    // Optional: return fallback UI instead of throwing
  }

  const posts = data.map((post: any) => ({
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    date: post.date,
    featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => tag.name) ?? [],
  }))

  return (
    <div>
      <Hero />

      <Gallery />

      <Blog posts={posts} />

      <About />

      <Newsletter />
    </div>
  )
}
