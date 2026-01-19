"use client"

import { useState } from "react"
import ShotList from "./ShotList"
import ShotEditor, { Shot } from "./ShotEditor"
import OutputTable from "./OutputTable"

const initialShots: Shot[] = [
  { id: "s1", name: "Hero Product Shot" },
  { id: "s2", name: "Lifestyle Shot" },
  { id: "s3", name: "Close-up Detail Shot" },
]

export default function ShotsTab() {
  const [shots, setShots] = useState<Shot[]>(initialShots)
  const [activeShotId, setActiveShotId] = useState(shots[0].id)

  const activeShot = shots.find(s => s.id === activeShotId)!

  function updateShot(updated: Shot) {
    setShots(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    )
  }

  function deleteShot(id: string) {
    setShots(prev => prev.filter(s => s.id !== id))
    if (activeShotId === id && shots.length > 1) {
      setActiveShotId(shots[0].id)
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* LEFT */}
      <div className="col-span-3">
        <ShotList
          shots={shots}
          activeShotId={activeShotId}
          onSelect={setActiveShotId}
        />
      </div>

      {/* CENTER */}
      <div className="col-span-5">
        <ShotEditor
          shot={activeShot}
          onChange={updateShot}
          onDelete={deleteShot}
        />
      </div>

      {/* RIGHT */}
      <div className="col-span-4">
        <OutputTable />
      </div>
    </div>
  )
}
