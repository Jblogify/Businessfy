import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[350px]" />
      </div>
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-[120px]" />
          <Skeleton className="mt-2 h-4 w-[200px]" />
          <div className="pt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-[30%]" />
              <Skeleton className="h-4 w-[15%]" />
              <Skeleton className="h-4 w-[15%]" />
              <Skeleton className="h-4 w-[15%]" />
              <Skeleton className="h-4 w-[15%]" />
              <Skeleton className="h-4 w-[10%]" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-[30%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[10%]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
