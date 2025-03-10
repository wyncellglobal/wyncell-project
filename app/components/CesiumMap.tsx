"use client"

import { useEffect, useRef, useState } from "react"
import * as Cesium from "cesium"
import { Viewer, Entity } from "resium"
import "cesium/Build/Cesium/Widgets/widgets.css"
import type { Country } from "../data/countries"

interface CesiumMapProps {
  selectedCountry?: Country | null
}

Cesium.Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || ""

export default function CesiumMap({ selectedCountry }: CesiumMapProps) {
  const viewerRef = useRef<Cesium.Viewer | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (viewerRef.current) {
      try {
        // Show sky atmosphere and stars
        viewerRef.current.scene.skyBox.show = true
        viewerRef.current.scene.skyAtmosphere.show = true
        viewerRef.current.scene.sun.show = true
        viewerRef.current.scene.moon.show = true
        viewerRef.current.scene.globe.show = false // Hide the Earth globe

        // Set initial view
        viewerRef.current.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000),
          orientation: {
            heading: 0.0,
            pitch: -0.5,
            roll: 0.0,
          },
          duration: 0,
        })
      } catch (err) {
        console.error("Error initializing Cesium:", err)
        setError("Failed to load the space view. Using fallback background.")
      }
    }
  }, [])

  useEffect(() => {
    if (selectedCountry && viewerRef.current && !error) {
      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(selectedCountry.lng, selectedCountry.lat, 20000000),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0,
        },
        duration: 2,
      })
    }
  }, [selectedCountry, error])

  if (error) {
    return (
      <div className="w-full h-full absolute inset-0 bg-black stars-background">
        {selectedCountry && (
          <div
            className="absolute text-white text-lg"
            style={{ left: `${selectedCountry.lng}%`, top: `${selectedCountry.lat}%` }}
          >
            {selectedCountry.name}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full h-full absolute inset-0">
      <Viewer
        ref={(ref) => {
          if (ref?.cesiumElement) {
            viewerRef.current = ref.cesiumElement
          }
        }}
        full
        scene3DOnly={true}
        homeButton={false}
        timeline={false}
        animation={false}
        fullscreenButton={false}
        baseLayerPicker={false}
        geocoder={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        creditContainer={document.createElement("div")}
      >
        {selectedCountry && (
          <Entity
            position={Cesium.Cartesian3.fromDegrees(selectedCountry.lng, selectedCountry.lat)}
            point={{ pixelSize: 10, color: Cesium.Color.fromCssColorString("#00E5FF") }}
            label={{
              text: selectedCountry.name,
              font: "14px Inter, sans-serif",
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -9),
            }}
          />
        )}
      </Viewer>
    </div>
  )
}

