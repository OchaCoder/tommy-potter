import Link from "next/link"

export default function MenuItem({ url, title, aTag }: { url: string; title: string; aTag: boolean }) {
  return (
    <>
      {aTag ? (
        <a href={url} className="theme-font text-xl" target="_blank" rel="noopener noreferrer" aria-label="External link in a new tab">
          {title}
        </a>
      ) : (
        <Link href={url} className="theme-font text-xl">
          {title}
        </Link>
      )}
    </>
  )
}
