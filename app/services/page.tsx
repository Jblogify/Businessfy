import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Building,
  Briefcase,
  Compass,
  HardHat,
  Home,
  Lightbulb,
  Ruler,
  Shield,
  Truck,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="BusinessFy Services"
            width={1920}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Our Services</h1>
            <p className="mb-8 max-w-3xl text-lg md:text-xl">
              Comprehensive solutions tailored to meet your specific needs and requirements
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">What We Offer</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                BusinessFy provides a wide range of services across multiple sectors, leveraging our expertise and
                experience to deliver exceptional results for our clients.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Construction Management",
                  description:
                    "Comprehensive management of construction projects from inception to completion, ensuring quality, timeliness, and cost-effectiveness.",
                  icon: Building,
                  link: "/services/construction-management",
                },
                {
                  title: "Architectural Design",
                  description:
                    "Innovative architectural solutions that combine aesthetics, functionality, and sustainability to create spaces that inspire and endure.",
                  icon: Compass,
                  link: "/services/architectural-design",
                },
                {
                  title: "Engineering Consultancy",
                  description:
                    "Expert engineering consultancy services across civil, structural, mechanical, and electrical disciplines to address complex technical challenges.",
                  icon: Ruler,
                  link: "/services/engineering-consultancy",
                },
                {
                  title: "Project Planning",
                  description:
                    "Strategic project planning services that establish clear objectives, timelines, and resource allocation to ensure successful project execution.",
                  icon: Briefcase,
                  link: "/services/project-planning",
                },
                {
                  title: "Infrastructure Development",
                  description:
                    "Development of critical infrastructure including roads, bridges, utilities, and public facilities to support community growth and economic development.",
                  icon: Truck,
                  link: "/services/infrastructure-development",
                },
                {
                  title: "Residential Construction",
                  description:
                    "Construction of high-quality residential properties, from individual homes to large-scale housing developments, tailored to meet market demands.",
                  icon: Home,
                  link: "/services/residential-construction",
                },
                {
                  title: "Commercial Construction",
                  description:
                    "Construction of commercial properties including office buildings, retail centers, and industrial facilities designed to meet business requirements.",
                  icon: Building,
                  link: "/services/commercial-construction",
                },
                {
                  title: "Renovation & Retrofitting",
                  description:
                    "Renovation and retrofitting services to modernize existing structures, improve energy efficiency, and extend building lifespan.",
                  icon: Wrench,
                  link: "/services/renovation-retrofitting",
                },
                {
                  title: "Safety Consulting",
                  description:
                    "Comprehensive safety consulting services to ensure compliance with regulations and create safe working environments.",
                  icon: Shield,
                  link: "/services/safety-consulting",
                },
              ].map((service, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-business-100 text-business-600">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mb-4 text-gray-700">{service.description}</p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-business-600 hover:text-business-700"
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Service */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Construction Management"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-business-700 md:text-4xl">Construction Management</h2>
                <p className="mb-4 text-gray-700">
                  Our construction management service provides comprehensive oversight of your project from planning to
                  completion. We coordinate all aspects of the construction process, ensuring that your project is
                  delivered on time, within budget, and to the highest quality standards.
                </p>
                <p className="mb-6 text-gray-700">
                  Our experienced project managers work closely with architects, engineers, contractors, and suppliers
                  to streamline the construction process, mitigate risks, and resolve issues promptly. We maintain clear
                  communication with all stakeholders, providing regular updates and ensuring transparency throughout
                  the project lifecycle.
                </p>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <HardHat className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                    <span>Project scheduling and coordination</span>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                    <span>Budget management and cost control</span>
                  </div>
                  <div className="flex items-start">
                    <Shield className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                    <span>Quality assurance and control</span>
                  </div>
                  <div className="flex items-start">
                    <Lightbulb className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                    <span>Risk management and problem-solving</span>
                  </div>
                </div>
                <Button asChild className="w-fit bg-business-600 hover:bg-business-700">
                  <Link href="/services/construction-management" className="flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">Our Service Process</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                We follow a structured approach to ensure consistent quality and client satisfaction across all our
                services.
              </p>
            </div>
            <div className="relative">
              {/* Process timeline line */}
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-business-200 md:left-[120px] md:translate-x-0"></div>

              {/* Process steps */}
              <div className="space-y-12">
                {[
                  {
                    number: "01",
                    title: "Initial Consultation",
                    description:
                      "We begin with a thorough consultation to understand your needs, objectives, and vision for the project.",
                  },
                  {
                    number: "02",
                    title: "Planning & Design",
                    description:
                      "Our team develops a comprehensive plan and design that aligns with your requirements and budget constraints.",
                  },
                  {
                    number: "03",
                    title: "Proposal & Agreement",
                    description:
                      "We present a detailed proposal outlining scope, timeline, deliverables, and costs for your approval.",
                  },
                  {
                    number: "04",
                    title: "Implementation",
                    description:
                      "Our experienced professionals execute the project according to the agreed plan, maintaining quality standards.",
                  },
                  {
                    number: "05",
                    title: "Monitoring & Control",
                    description:
                      "We continuously monitor progress, manage risks, and implement necessary adjustments to ensure successful delivery.",
                  },
                  {
                    number: "06",
                    title: "Completion & Handover",
                    description:
                      "Upon completion, we conduct thorough quality checks before final handover and provide necessary documentation.",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row">
                    {/* Step number circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-business-600 text-white font-bold md:left-[120px] md:translate-x-0">
                      {step.number}
                    </div>

                    {/* Step content */}
                    <div className="mt-16 md:ml-[180px] md:mt-0">
                      <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">Client Testimonials</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                Hear what our clients have to say about their experience working with BusinessFy.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Abdullah Al-Otaibi",
                  position: "Director, Riyadh Development Authority",
                  testimonial:
                    "BusinessFy delivered our infrastructure project on time and within budget. Their attention to detail and commitment to quality were exceptional.",
                },
                {
                  name: "Sara Al-Ghamdi",
                  position: "CEO, Al-Ghamdi Properties",
                  testimonial:
                    "We've worked with BusinessFy on multiple residential developments. Their expertise and professionalism have made them our trusted partner for all our construction needs.",
                },
                {
                  name: "Khalid Al-Harbi",
                  position: "Project Manager, Ministry of Housing",
                  testimonial:
                    "The engineering consultancy services provided by BusinessFy helped us overcome complex technical challenges and achieve our project objectives.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 text-business-600">
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
        <section className="bg-business-700 py-16 text-white md:py-24">
          <div className="container text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Project?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-business-100">
              Contact us today to discuss how BusinessFy can help bring your vision to life. Our team is ready to
              provide the expertise and support you need.
            </p>
            <Button asChild size="lg" className="bg-white text-business-700 hover:bg-business-100">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
