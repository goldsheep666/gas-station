"use client"
import { useState, useEffect, useCallback } from "react"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"

export const MapContainer: React.FC = () => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  const [userLocation, setUserLocation] = useState<{
    longitude: number
    latitude: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState("")

  const updatePosition = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    setUserLocation({ latitude, longitude })
    setIsLoading(false)
  }

  const handlePositionError = (error: GeolocationPositionError) => {
    setIsLoading(false)
    if (error.code === error.PERMISSION_DENIED) {
      setShowAlert("請開啟位置權限")
    } else {
      setShowAlert("無法取得位置，請稍後再試")
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setShowAlert("請更換瀏覽器")
      return
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    }

    const watchId = navigator.geolocation.watchPosition(
      updatePosition,
      handlePositionError,
      options
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  if (!token) {
    console.error("Mapbox token not found")
    return
  }

  if (isLoading) {
    return <div>Loading map...</div>
  }
  return (
    <>
      <div className="h-[calc(100vh-48px-100px)] flex-grow">
        <Map
          mapboxAccessToken={token}
          initialViewState={{
            longitude: userLocation?.longitude || 121.5,
            latitude: userLocation?.latitude || 25.0,
            zoom: userLocation ? 15 : 10,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {userLocation && (
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              color="black"
            />
          )}
        </Map>
      </div>
      <AlertDialog open={Boolean(showAlert)}>
        <AlertDialogContent>
          <AlertDialogDescription>{showAlert}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert("")}>
              確認
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
