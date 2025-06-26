// src/app/not-found.tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold tracking-tight mb-4">Oops... This page was not found.</h1>
      <p className="text-lg  mb-8">The blog post or page you were looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-neutral-800 text-white rounded-lg shadow-md transition hover:bg-neutral-700 ">
        ← Go back home
      </Link>
    </div>
  )
}
