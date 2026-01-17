"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"

const mockAssets = [
  "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1200&auto=format&fit=crop",
]

export default function ReferenceAssetsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Manage Reference Assets
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[420px] sm:w-[520px]">
        <SheetHeader>
          <SheetTitle>Reference Assets</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <Button className="w-full">+ Upload Asset</Button>

          <div className="grid grid-cols-2 gap-3">
            {mockAssets.map((src, idx) => (
              <Card key={idx} className="relative h-28 overflow-hidden rounded-xl">
                <Image src={src} alt="asset" fill className="object-cover" />
              </Card>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
