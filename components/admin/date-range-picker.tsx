"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({ dateRange, onDateRangeChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Predefined date ranges
  const handlePredefinedRange = (value: string) => {
    const today = new Date()
    let from: Date
    let to = today

    switch (value) {
      case "last7days":
        from = addDays(today, -7)
        break
      case "last30days":
        from = addDays(today, -30)
        break
      case "thisMonth":
        from = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case "lastMonth":
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        to = new Date(today.getFullYear(), today.getMonth(), 0)
        break
      case "last3months":
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1)
        break
      case "last6months":
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1)
        break
      case "thisYear":
        from = new Date(today.getFullYear(), 0, 1)
        break
      case "lastYear":
        from = new Date(today.getFullYear() - 1, 0, 1)
        to = new Date(today.getFullYear() - 1, 11, 31)
        break
      default:
        from = addDays(today, -30)
    }

    onDateRangeChange({ from, to })
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-[300px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                onDateRangeChange(range)
                if (range?.from && range?.to) {
                  setIsOpen(false)
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={handlePredefinedRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
            <SelectItem value="thisMonth">This month</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
            <SelectItem value="last3months">Last 3 months</SelectItem>
            <SelectItem value="last6months">Last 6 months</SelectItem>
            <SelectItem value="thisYear">This year</SelectItem>
            <SelectItem value="lastYear">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
