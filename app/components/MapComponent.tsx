"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { Country } from "../data/countries"

interface MapComponentProps {
  selectedCountry: Country | null
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

export default function MapComponent({ selectedCountry }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [0, 20],
        zoom: 1.5,
      })

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")
    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Failed to load the map. Please check your connection and try again.")
    }
  }, [])

  useEffect(() => {
    if (!map.current) return

    if (selectedCountry && selectedCountry.lat && selectedCountry.lng) {
      if (marker.current) {
        marker.current.remove()
      }

      marker.current = new mapboxgl.Marker({ color: "#00ACCD" })
        .setLngLat([selectedCountry.lng, selectedCountry.lat])
        .addTo(map.current)

      map.current.flyTo({
        center: [selectedCountry.lng, selectedCountry.lat],
        zoom: 4,
        duration: 2000,
      })
    } else {
      if (marker.current) {
        marker.current.remove()
      }
      map.current.flyTo({
        center: [0, 20],
        zoom: 1.5,
        duration: 2000,
      })
    }
  }, [selectedCountry])

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg">{error}</div>
    )
  }

  return <div ref={mapContainer} className="w-full h-64 rounded-lg overflow-hidden" />
}

