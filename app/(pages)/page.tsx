"use client"

import React, { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cities, districts, facilities } from "@/app/lib/constants"
import { MapContainer } from "@/components/MapContainer"

const Home: React.FC = () => {
  const [selectLocation, setSelectLocation] = useState({
    city: "",
    district: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([
    facilities[0].id,
  ])

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const facilityChange = (facilityId: number) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId]
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-none">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              className="w-full justify-between"
              onClick={handleOpenDrawer}
            >
              {selectLocation.city && selectLocation.district ? (
                <span>
                  {selectLocation.city} {selectLocation.district}
                </span>
              ) : (
                <span>選擇位置和設施</span>
              )}
              <MapPin className="ml-2 h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-md mx-auto">
            <div className="p-4 space-y-4 w-full">
              <Select
                onValueChange={(value) => {
                  setSelectLocation({ city: value, district: "" })
                }}
                value={selectLocation.city}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇縣市" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => {
                  setSelectLocation({ ...selectLocation, district: value })
                }}
                value={selectLocation.district}
                disabled={!selectLocation.city}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選擇鄉鎮市區" />
                </SelectTrigger>
                <SelectContent>
                  {selectLocation.city &&
                    districts[
                      selectLocation.city as keyof typeof districts
                    ].map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {/* 選擇 */}
              <div className="space-y-2">
                <label className="text-base font-semibold">選擇設施：</label>
                <div className="grid grid-cols-3">
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`facility-${facility.id}`}
                        value={String(facility.id)}
                        checked={selectedFacilities.includes(facility.id)}
                        onCheckedChange={() => facilityChange(facility.id)}
                      />
                      <label htmlFor={`facility-${facility.id}`}>
                        {facility.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={handleCloseDrawer}>
                確認
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* 顯示選擇結果 */}
      <div className="h-8 pt-1 text-sm ">
        <span>
          選擇：
          {selectedFacilities
            .map((id) => facilities.find((f) => f.id === id)?.name)
            .join(", ")}
        </span>
      </div>
      <MapContainer />
    </div>
  )
}

export default Home
