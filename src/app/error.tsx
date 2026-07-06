'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-text-hi">Something went wrong</h1>
      <p className="text-sm text-text-mid">
        The FakeStore API might be temporarily unavailable or rate-limiting requests. Try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-xl bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-accent-text hover:bg-accent-hover"
      >
        Try again
      </button>
    </div>
  )
}
