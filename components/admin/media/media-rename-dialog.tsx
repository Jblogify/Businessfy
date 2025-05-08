"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface MediaRenameDialogProps {
  isOpen: boolean
  onClose: () => void
  media: any
  onRename: (newName: string) => void
}

export function MediaRenameDialog({ isOpen, onClose, media, onRename }: MediaRenameDialogProps) {
  const { toast } = useToast()
  const [newName, setNewName] = useState<string>(media.name)
  const [isRenaming, setIsRenaming] = useState<boolean>(false)

  const handleRename = () => {
    if (!newName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid file name",
        variant: "destructive",
      })
      return
    }

    // Check if the name has changed
    if (newName === media.name) {
      onClose()
      return
    }

    setIsRenaming(true)

    // Simulate API call
    setTimeout(() => {
      setIsRenaming(false)
      onRename(newName)
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Enter a new name for "{media.name}".</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-name">File Name</Label>
            <Input
              id="file-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new file name"
            />
          </div>

          <div className="rounded-md bg-muted p-3 text-sm">
            <p>Renaming this file will not break existing links if the file extension remains the same.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRenaming}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={isRenaming || !newName.trim() || newName === media.name}
            className="bg-green-700 hover:bg-green-800"
          >
            {isRenaming ? "Renaming..." : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
