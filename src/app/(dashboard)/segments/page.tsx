import { SegmentsClient } from "./SegmentsClient"

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Audience Segmentation</h1>
        <p className="text-muted-foreground">Define your target customer or upload a CSV to generate smart audience segments.</p>
      </div>
      <SegmentsClient />
    </div>
  )
}
