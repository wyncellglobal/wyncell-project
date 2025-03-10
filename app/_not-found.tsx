import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-xl mb-8">Could not find requested resource</p>
      <Link
        href="/"
        className="bg-wyncell-primary text-white px-6 py-3 rounded-full hover:bg-wyncell-secondary transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

