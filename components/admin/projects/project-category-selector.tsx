"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

// Categories for filtering
const defaultCategories = [
  { value: "commercial", label: "Commercial" },
  { value: "skyscraper", label: "Skyscraper" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "entertainment", label: "Entertainment" },
  { value: "tourism", label: "Tourism" },
  { value: "smart-city", label: "Smart City" },
  { value: "cultural", label: "Cultural" },
]

interface ProjectCategorySelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ProjectCategorySelector({ value, onChange }: ProjectCategorySelectorProps) {
  const [categories, setCategories] = useState(defaultCategories)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") return

    const newValue = newCategoryName.toLowerCase().replace(/\s+/g, "-")
    const newCategory = {
      value: newValue,
      label: newCategoryName.trim(),
    }

    setCategories([...categories, newCategory])
    setNewCategoryName("")
    setIsDialogOpen(false)
    onChange(newValue)
  }

  return (
    <div className="flex gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category for your projects.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddCategory()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
