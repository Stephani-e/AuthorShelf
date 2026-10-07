import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
      <main className="flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="flex items-center justify-between px-8 py-6 bg-white/70 + backdrop-blur + border-b">
          <div className="font-serif text-2xl text-white font-bold tracking-tight">
            AuthorShelf.
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-white transition-colors">
              Log in
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col md:flex-row items-stretch">

          {/* Readers Split */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 md:border-r bg-white hover:bg-zinc-100 transition-colors duration-500 group cursor-default">
            <div className="w-48 h-64 rounded-lg mb-8 overflow-hidden relative shadow-md group-hover:shadow-2xl group-hover:-rotate-3 group-hover:-translate-y-2 transition-all duration-500">
              <Image
                  src={"/Images/BookCover.jpg"}
                  alt={"Book Cover"}
                  fill
                  className="object-cover"
              />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-center text-black">
              For Readers
            </h2>
            <p className="text-zinc-800 mb-8 max-w-sm text-center">
              Discover breathtaking serialized fiction. Support authors directly and read in a beautifully designed environment.
            </p>
            <Link
                href="/explore"
                className="px-8 py-3 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform"
            >
              Start Reading
            </Link>
          </div>

          {/* Authors Split */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-black hover:bg-zinc-950 border-t-white transition-colors duration-500 group cursor-default">
            {/* Image Placeholder */}
            <div className="w-48 h-64 rounded-lg mb-8 overflow-hidden relative shadow-md group-hover:shadow-2xl group-hover:-rotate-3 group-hover:-translate-y-2 transition-all duration-500">
              <Image
                  src={"/Images/AuthorDesk.jpg"}
                  alt={"AuthorDesk"}
                  fill
                  className="object-cover"
              />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-center">
              For Authors
            </h2>
            <p className="text-white mb-8 max-w-sm text-center">
              Your fiction, your audience. Publish beautifully crafted chapters, build your brand, and connect with your readers.
            </p>
            <Link
                href="/dashboard/profile"
                className="px-8 py-3 border-2 border-zinc-900 dark:border-white rounded-full font-medium hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all"
            >
              Start Writing
            </Link>
          </div>

        </section>
      </main>
  )
}