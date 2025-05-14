import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function StyleGuideImagery() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Imagery</h2>
        <p className="mb-6 text-muted-foreground">
          Imagery plays a crucial role in the BusinessFy brand identity. Consistent use of imagery helps maintain a
          cohesive look and feel across all platforms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Photography Style</CardTitle>
          <CardDescription>
            BusinessFy uses professional, clean photography that conveys trust, professionalism, and innovation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Business & Professional</h3>
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Professional business meeting"
                  width={500}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Images should depict professional environments, business meetings, and workplace scenarios that reflect
                modern business practices.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Technology & Innovation</h3>
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Technology and innovation"
                  width={500}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Images should showcase modern technology, innovation, and digital transformation in business contexts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image Treatment</CardTitle>
          <CardDescription>
            Consistent image treatment helps maintain a cohesive visual identity across all platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Color Grading</h3>
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Color grading example"
                  width={500}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Images should have a consistent color grading that emphasizes blues and teals to align with the
                BusinessFy brand colors. Avoid overly saturated or heavily filtered images.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Composition</h3>
              <div className="overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Composition example"
                  width={500}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Images should have clean compositions with clear focal points. Avoid cluttered or busy images that
                distract from the main subject.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagery Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Do</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use high-quality, professional images</li>
                <li>Ensure images are relevant to the content they accompany</li>
                <li>Maintain consistent style and treatment across all imagery</li>
                <li>Use images that reflect diversity and inclusion</li>
                <li>Optimize images for web performance</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Don't</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use low-quality or pixelated images</li>
                <li>Use generic stock photos that feel inauthentic</li>
                <li>Use images with heavy filters or effects that don't match our style</li>
                <li>Use images that perpetuate stereotypes</li>
                <li>Use images with visible watermarks or copyright issues</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Always include descriptive alt text for images</li>
              <li>Ensure text overlaid on images has sufficient contrast</li>
              <li>Don't rely solely on images to convey critical information</li>
              <li>Consider users with slow connections when using large images</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
