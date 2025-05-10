import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, Building, CheckCircle, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Jalal Nasser Headquarters"
            width={1920}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Building the Future of Saudi Arabia
            </h1>
            <p className="mb-8 max-w-3xl text-lg md:text-xl">
              BusinessFy is a leading Saudi Arabian company providing innovative solutions and services across multiple
              sectors.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-900"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-green-800 md:text-4xl">About BusinessFy</h2>
                <p className="mb-4 text-gray-700">
                  Founded in 1995, BusinessFy has grown to become one of the most respected companies in Saudi Arabia.
                  With a commitment to excellence and innovation, we have successfully completed numerous projects
                  across the Kingdom.
                </p>
                <p className="mb-6 text-gray-700">
                  Our team of experienced professionals is dedicated to delivering high-quality services that meet the
                  unique needs of our clients. We pride ourselves on our ability to combine traditional values with
                  modern approaches.
                </p>
                <Button asChild className="w-fit bg-green-700 hover:bg-green-800">
                  <Link href="/about" className="flex items-center">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="About Jalal Nasser"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-green-800 md:text-4xl">Our Services</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                We offer a comprehensive range of services designed to meet the diverse needs of our clients across
                various sectors.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Construction",
                  icon: Building,
                  description:
                    "From residential buildings to commercial complexes, we handle construction projects of all sizes.",
                },
                {
                  title: "Engineering",
                  icon: Award,
                  description: "Our team of engineers provides innovative solutions to complex technical challenges.",
                },
                {
                  title: "Project Management",
                  icon: Clock,
                  description:
                    "We ensure your projects are completed on time, within budget, and to the highest standards.",
                },
                {
                  title: "Consulting",
                  icon: Users,
                  description:
                    "Our experts offer strategic advice to help you make informed decisions for your business.",
                },
                {
                  title: "Maintenance",
                  icon: CheckCircle,
                  description:
                    "We provide comprehensive maintenance services to keep your facilities in optimal condition.",
                },
                {
                  title: "Training",
                  icon: Users,
                  description: "We offer specialized training programs to enhance the skills of your workforce.",
                },
              ].map((service, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mb-4 text-gray-700">{service.description}</p>
                    <Link
                      href={`/services/${service.title.toLowerCase()}`}
                      className="inline-flex items-center text-green-700 hover:text-green-800"
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-green-800 md:text-4xl">Featured Projects</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                Explore some of our most significant projects that showcase our expertise and commitment to excellence.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "King Abdullah Financial District",
                  location: "Riyadh",
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Jeddah Tower",
                  location: "Jeddah",
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Riyadh Metro",
                  location: "Riyadh",
                  image: "/placeholder.svg?height=300&width=400",
                },
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-[200px]">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                    <p className="mb-4 text-gray-700">Location: {project.location}</p>
                    <Link
                      href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-green-700 hover:text-green-800"
                    >
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild className="bg-green-700 hover:bg-green-800">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-green-50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-green-800 md:text-4xl">What Our Clients Say</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                Hear from our satisfied clients about their experience working with BusinessFy.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Mohammed Al-Saud",
                  position: "CEO, Saudi Development Company",
                  testimonial:
                    "BusinessFy exceeded our expectations with their professionalism and attention to detail. They delivered our project on time and within budget.",
                },
                {
                  name: "Fatima Al-Rashid",
                  position: "Director, Riyadh Investments",
                  testimonial:
                    "Working with BusinessFy was a pleasure. Their team was responsive, knowledgeable, and committed to delivering high-quality results.",
                },
                {
                  name: "Abdullah Al-Qahtani",
                  position: "Project Manager, Ministry of Housing",
                  testimonial:
                    "BusinessFy's expertise and innovative approach helped us overcome complex challenges and achieve our project goals.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 text-green-700">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-xl">
                            ★
                          </span>
                        ))}
                    </div>
                    <p className="mb-6 text-gray-700">"{testimonial.testimonial}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-800 py-16 text-white md:py-24">
          <div className="container text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Project?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-green-100">
              Contact us today to discuss how BusinessFy can help bring your vision to life. Our team is ready to
              provide the expertise and support you need.
            </p>
            <Button asChild size="lg" className="bg-white text-green-800 hover:bg-green-100">
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
