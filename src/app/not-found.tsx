import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-sm text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover">
        Back to shop
      </Link>
    </div>
  )
}
