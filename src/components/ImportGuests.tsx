import { useState } from "react"
import { useInvitationStore } from "../stores/invitationStore"


export default function ImportGuests({ eventId }: { eventId: string }) {
  const importGuests = useInvitationStore((s) => s.importGuests)

  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) return

    await importGuests(eventId, file)
  }
  
  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={(e) => {
          if (e.target.files) setFile(e.target.files[0])
        }}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}