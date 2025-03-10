"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface StreetViewProps {
  lat: number
  lng: number
}

declare global {
  interface Window {
    google: any
    initStreetView: () => void
  }
}

const StreetView: React.FC<StreetViewProps> = ({ lat, lng }) => {
  const streetViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadStreetView = () => {
      if (streetViewRef.current && window.google) {
        const panorama = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
          position: { lat, lng },
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
        })
      }
    }

    if (window.google) {
      loadStreetView()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initStreetView`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      window.initStreetView = loadStreetView
    }

    return () => {
      window.initStreetView = null
    }
  }, [lat, lng])

  return <div ref={streetViewRef} style={{ width: "100%", height: "300px" }} />
}

export default StreetView

