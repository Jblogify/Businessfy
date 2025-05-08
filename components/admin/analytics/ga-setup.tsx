"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { initGA } from "@/lib/analytics"

interface GASetupProps {
  onSetup: () => void
}

export function GASetup({ onSetup }: GASetupProps) {
  const [measurementId, setMeasurementId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSetup = () => {
    if (!measurementId) {
      setError("Please enter a valid Measurement ID")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Initialize Google Analytics
      const success = initGA(measurementId)

      if (success) {
        // Save the measurement ID to localStorage for persistence
        localStorage.setItem("ga_measurement_id", measurementId)

        // Call the onSetup callback
        onSetup()
      } else {
        setError("Failed to initialize Google Analytics. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while setting up Google Analytics")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Google Analytics</CardTitle>
        <CardDescription>Enter your Google Analytics Measurement ID to connect your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="measurement-id">Measurement ID</Label>
            <Input
              id="measurement-id"
              placeholder="G-XXXXXXXXXX"
              value={measurementId}
              onChange={(e) => setMeasurementId(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              You can find your Measurement ID in your Google Analytics account under Admin &gt; Data Streams
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-700 hover:bg-green-800" onClick={handleSetup} disabled={isLoading}>
          {isLoading ? "Connecting..." : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  )
}
