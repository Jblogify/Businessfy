import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function StyleGuideVoice() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Voice & Tone</h2>
        <p className="mb-6 text-muted-foreground">
          The BusinessFy voice and tone guidelines ensure consistent communication across all platforms and touchpoints.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Voice</CardTitle>
          <CardDescription>
            Our brand voice is the consistent expression of BusinessFy's personality through words.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Professional</h3>
              <p className="text-sm text-muted-foreground">
                We communicate with expertise and authority. Our language is clear, precise, and demonstrates our
                industry knowledge. We avoid jargon when possible, but use technical terms appropriately when speaking
                to knowledgeable audiences.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "Our comprehensive business solutions are designed to optimize your operational efficiency while
                  ensuring regulatory compliance."
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Approachable</h3>
              <p className="text-sm text-muted-foreground">
                While professional, we're also approachable and human. We use a conversational tone that's warm and
                engaging. We speak directly to our audience using "you" and "your" and avoid overly formal language that
                creates distance.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "We know you're busy, so we've made it simple to get started. Your business deserves tools that work
                  as hard as you do."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Confident</h3>
              <p className="text-sm text-muted-foreground">
                We speak with confidence about our solutions and their value. We use active voice and strong, positive
                language. We're assertive without being aggressive or making exaggerated claims.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "Our platform delivers measurable results. Businesses using BusinessFy report an average 30% increase
                  in productivity within the first three months."
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Helpful</h3>
              <p className="text-sm text-muted-foreground">
                We focus on being helpful and solution-oriented. Our communication anticipates questions and provides
                clear answers. We emphasize benefits rather than features and explain how our solutions solve real
                problems.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "Not sure which plan is right for you? Here's a quick guide to help you choose, or schedule a free
                  consultation with our team to get personalized recommendations."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tone Variations</CardTitle>
          <CardDescription>
            While our voice remains consistent, our tone adapts to different situations and audiences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Marketing & Website</h3>
              <p className="text-sm text-muted-foreground">
                Confident and inspiring. Focus on benefits and value proposition. Use clear calls to action and
                compelling headlines. Balance professional expertise with approachability.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "Transform your business operations with BusinessFy's integrated solutions. Start your free trial
                  today and see the difference for yourself."
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Product UI</h3>
              <p className="text-sm text-muted-foreground">
                Clear, concise, and helpful. Focus on guiding users through tasks. Use simple, direct language. Be
                encouraging and supportive, especially in error messages.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "Great job! Your report has been generated. You can download it now or schedule it to be sent
                  automatically each month."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Empathetic and solution-focused. Acknowledge concerns and provide clear solutions. Be patient and
                thorough. Use reassuring language and follow up to ensure resolution.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "I understand how frustrating this issue must be for you. Let's work together to resolve it. First,
                  let's try..."
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Technical Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Clear, precise, and thorough. Focus on accuracy and completeness. Use technical terms appropriately but
                provide explanations where needed. Structure content logically with clear headings.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">Example:</p>
                <p className="text-sm italic text-muted-foreground">
                  "The API authentication requires an OAuth 2.0 token. Generate your token in the Developer Portal and
                  include it in the header of all requests as shown below."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Writing Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Do</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use active voice and present tense when possible</li>
                <li>Be concise and get to the point quickly</li>
                <li>Use simple, clear language that's easy to understand</li>
                <li>Address the reader directly using "you" and "your"</li>
                <li>Use positive language that focuses on solutions</li>
                <li>Proofread all content for errors and clarity</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Don't</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Use jargon or technical terms without explanation</li>
                <li>Write long, complex sentences that are hard to follow</li>
                <li>Use passive voice that obscures who is taking action</li>
                <li>Make exaggerated claims or promises</li>
                <li>Use negative language that focuses on problems</li>
                <li>Use slang, colloquialisms, or culturally specific references</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Accessibility</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Use plain language that's easy to understand for all users</li>
              <li>Avoid idioms, metaphors, and cultural references that may not translate well</li>
              <li>Structure content with clear headings and logical organization</li>
              <li>Use descriptive link text rather than generic phrases like "click here"</li>
              <li>Provide text alternatives for non-text content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
