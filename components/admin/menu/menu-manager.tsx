"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GripVertical, Eye, EyeOff, Plus, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define the menu item type
interface MenuItem {
  id: string
  label: string
  href: string
  isVisible: boolean
  icon?: string
}

// SortableItem component for each menu item
function SortableMenuItem({
  item,
  onToggleVisibility,
  onRemove,
  onEdit,
}: {
  item: MenuItem
  onToggleVisibility: (id: string) => void
  onRemove: (id: string) => void
  onEdit: (id: string, field: "label" | "href", value: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <Card className={`border ${isDragging ? "border-business-500 bg-business-50/10" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
            >
              <GripVertical className="h-5 w-5 text-gray-500" />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`label-${item.id}`} className="text-xs text-muted-foreground mb-1 block">
                  Label
                </Label>
                <Input
                  id={`label-${item.id}`}
                  value={item.label}
                  onChange={(e) => onEdit(item.id, "label", e.target.value)}
                  className="h-8"
                />
              </div>
              <div>
                <Label htmlFor={`href-${item.id}`} className="text-xs text-muted-foreground mb-1 block">
                  URL Path
                </Label>
                <Input
                  id={`href-${item.id}`}
                  value={item.href}
                  onChange={(e) => onEdit(item.id, "href", e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  id={`visibility-${item.id}`}
                  checked={item.isVisible}
                  onCheckedChange={() => onToggleVisibility(item.id)}
                />
                <Label htmlFor={`visibility-${item.id}`} className="cursor-pointer">
                  {item.isVisible ? (
                    <Eye className="h-4 w-4 text-business-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </Label>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "home", label: "Home", href: "/", isVisible: true },
    { id: "projects", label: "Projects", href: "/projects", isVisible: true },
    { id: "services", label: "Services", href: "/services", isVisible: true },
    { id: "about", label: "About", href: "/about", isVisible: true },
    { id: "contact", label: "Contact", href: "/contact", isVisible: true },
  ])

  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle drag end event
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        setHasChanges(true)
        return newItems
      })
    }
  }

  // Toggle visibility of a menu item
  function toggleVisibility(id: string) {
    setMenuItems((items) => items.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item)))
    setHasChanges(true)
  }

  // Remove a menu item
  function removeMenuItem(id: string) {
    setMenuItems((items) => items.filter((item) => item.id !== id))
    setHasChanges(true)
  }

  // Edit a menu item
  function editMenuItem(id: string, field: "label" | "href", value: string) {
    setMenuItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setHasChanges(true)
  }

  // Add a new menu item
  function addMenuItem() {
    const newId = `menu-item-${Date.now()}`
    setMenuItems((items) => [...items, { id: newId, label: "New Item", href: "/new-page", isVisible: true }])
    setHasChanges(true)
  }

  // Save menu changes
  function saveChanges() {
    // In a real application, this would save to a database
    // For now, we'll just simulate a save with a toast notification

    // Update localStorage for demo purposes
    localStorage.setItem("menuItems", JSON.stringify(menuItems))

    toast({
      title: "Menu saved",
      description: "Your menu changes have been saved successfully.",
    })

    setHasChanges(false)
  }

  // Load saved menu on initial render
  useEffect(() => {
    const savedMenu = localStorage.getItem("menuItems")
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu))
      } catch (e) {
        console.error("Failed to parse saved menu", e)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Menu Management</h3>
          <p className="text-sm text-muted-foreground">
            Drag and drop menu items to reorder them, toggle visibility, or edit their properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={addMenuItem} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
          <Button
            onClick={saveChanges}
            disabled={!hasChanges}
            className="flex items-center gap-1 bg-business-600 hover:bg-business-700"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Structure</CardTitle>
          <CardDescription>The order below reflects how items will appear in your site navigation.</CardDescription>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={menuItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {menuItems.map((item) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  onToggleVisibility={toggleVisibility}
                  onRemove={removeMenuItem}
                  onEdit={editMenuItem}
                />
              ))}
            </SortableContext>
          </DndContext>

          {menuItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No menu items. Click "Add Item" to create your first menu item.
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            {menuItems.filter((item) => item.isVisible).length} of {menuItems.length} items visible
          </div>
          {hasChanges && <div className="text-sm text-business-600">You have unsaved changes</div>}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Preview</CardTitle>
          <CardDescription>This is how your menu will appear to visitors.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center border-b pb-4">
            <div className="flex gap-6">
              {menuItems
                .filter((item) => item.isVisible)
                .map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-2 font-medium text-business-600 hover:text-business-400 cursor-pointer"
                  >
                    {item.label}
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
