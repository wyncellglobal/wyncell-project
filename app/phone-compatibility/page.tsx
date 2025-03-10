import Link from "next/link"

export default function PhoneCompatibility() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">eSIM Phone Compatibility</h1>
      <p className="mb-4">
        To use our eSIM service, your phone needs to be eSIM compatible and unlocked. Most modern smartphones support
        eSIM technology.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Popular eSIM-compatible phones include:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>iPhone XS and newer models</li>
        <li>Google Pixel 3 and newer models</li>
        <li>Samsung Galaxy S20 and newer models</li>
        <li>Many recent models from other manufacturers</li>
      </ul>
      <p className="mb-4">
        To check if your specific phone model is compatible, please consult your device's specifications or contact your
        phone manufacturer.
      </p>
      <h2 className="text-2xl font-semibold mb-2">How to install an eSIM:</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Purchase an eSIM plan from our website</li>
        <li>You'll receive a QR code or activation code</li>
        <li>On your phone, go to Settings &gt; Cellular/Mobile Data &gt; Add Cellular/Data Plan</li>
        <li>Scan the QR code or manually enter the activation code</li>
        <li>Follow the on-screen instructions to complete the setup</li>
      </ol>
      <p className="mb-4">The exact steps may vary slightly depending on your device and operating system.</p>
      <Link
        href="/"
        className="bg-[#00ACCD] text-white px-6 py-2 rounded-full hover:bg-[#0090AB] transition-colors inline-block"
      >
        Back to Home
      </Link>
    </div>
  )
}

