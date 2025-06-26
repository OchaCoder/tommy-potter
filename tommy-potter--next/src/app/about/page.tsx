import wretch from "wretch"
import { redirect } from "next/navigation"

type WPPage = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
}

export default async function Page() {
  try {
    const url = `${process.env.NEXT_PUBLIC_WP}/pages?slug=about`

    const rawRes = await wretch(url)
      .get()
      .json<WPPage[]>()
      .catch((err) => {
        console.log("error on wretch!!", err)
        redirect(`/`)
      })

    if (!rawRes || rawRes.length === 0) {
      redirect("/not-found")
    }

    const page = rawRes[0]

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-10 bg-pink-500">{page.title.rendered}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    )
  } catch (err) {
    // Network or parse error
    console.error("Network or parse error", err)
    redirect("/")
  }
}
