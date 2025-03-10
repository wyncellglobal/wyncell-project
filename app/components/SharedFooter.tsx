import Link from "next/link"
import Image from "next/image"

export default function SharedFooter() {
  return (
    <footer className="bg-wyncell-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6 relative">
              <div className="absolute inset-0 bg-white rounded-full" style={{ transform: "scale(1.2)" }}></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Wyncell%20(2)-nmRkExoPYDMYJMku2tQxuZIuvvsYQX.png"
                alt="Wyncell Telecom"
                width={160}
                height={40}
                className="h-10 w-auto relative"
              />
            </Link>
            <p className="text-gray-400 mb-4">Your affordable trusted provider for global connectivity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wyncell-secondary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wyncell-secondary">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/plans" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/phones-and-devices"
                  className="text-gray-300 hover:text-wyncell-secondary transition-colors"
                >
                  Phones & Devices
                </Link>
              </li>
              <li>
                <Link href="/esim-guide" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  eSIM Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-wyncell-secondary">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-wyncell-secondary transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wyncell Global Data | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

