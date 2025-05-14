import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-business-50 py-12 md:py-16">
          <div className="container">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-business-800 md:text-5xl">Contact Us</h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-700">
                We'd love to hear from you. Please fill out the form below or use our contact information to get in
                touch with us.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>You can also reach us using the following contact information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-business-600" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">King Fahd Road, Riyadh, Kingdom of Saudi Arabia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-business-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">+966 12 345 6789</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 text-business-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@jalalnasser.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-1 h-5 w-5 text-business-600" />
                      <div>
                        <p className="font-medium">Working Hours</p>
                        <p className="text-muted-foreground">Sunday - Thursday: 8:00 AM - 5:00 PM</p>
                        <p className="text-muted-foreground">Friday - Saturday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                    <CardDescription>Find us on the map</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video overflow-hidden rounded-md bg-muted">
                      {/* This would be a map in a real implementation */}
                      <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                        Map will be displayed here
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
