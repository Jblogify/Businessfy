import { Skeleton } from "@/components/ui/skeleton"

export default function StyleGuideLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-5 w-full max-w-xl" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="grid gap-8">
        <div>
          <Skeleton className="mb-4 h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>

        <div>
          <Skeleton className="mb-4 h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-60 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
