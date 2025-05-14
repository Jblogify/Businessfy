import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Building, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="About BusinessFy"
            width={1920}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">About BusinessFy</h1>
            <p className="mb-8 max-w-3xl text-lg md:text-xl">
              Learn about our company, our mission, and the team behind our success
            </p>
          </div>
        </section>

        {/* Company Overview Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-business-700 md:text-4xl">Our Company</h2>
                <p className="mb-4 text-gray-700">
                  Founded in 1995, BusinessFy has established itself as a leading provider of innovative solutions in
                  Saudi Arabia. With headquarters in Riyadh and offices across the Kingdom, we serve clients in various
                  sectors including construction, engineering, and infrastructure development.
                </p>
                <p className="mb-6 text-gray-700">
                  Over the past three decades, we have successfully completed more than 500 projects, ranging from
                  residential complexes to commercial towers and infrastructure developments. Our commitment to
                  excellence and innovation has earned us a reputation as a trusted partner for businesses and
                  government entities alike.
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-business-600">28+</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-business-600">500+</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-business-600">150+</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-business-600">12</div>
                    <div className="text-sm text-gray-600">Industry Awards</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="BusinessFy Headquarters"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">Our Mission & Vision</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                Guided by our core values, we strive to make a positive impact on the communities we serve.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-business-100 text-business-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold">Our Mission</h3>
                  <p className="mb-4 text-gray-700">
                    To deliver exceptional value to our clients through innovative solutions, quality workmanship, and
                    unwavering commitment to excellence. We aim to contribute to the development of Saudi Arabia by
                    creating sustainable infrastructure that improves the quality of life for its citizens.
                  </p>
                  <p className="text-gray-700">We are committed to:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Delivering projects on time and within budget</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Maintaining the highest standards of quality and safety</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Fostering innovation and continuous improvement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Building long-term relationships with our clients and partners</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-business-100 text-business-600">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold">Our Vision</h3>
                  <p className="mb-4 text-gray-700">
                    To be the leading provider of innovative solutions in Saudi Arabia, recognized for our excellence,
                    integrity, and commitment to sustainable development. We aspire to play a pivotal role in the
                    Kingdom's Vision 2030 by contributing to its economic diversification and infrastructure
                    development.
                  </p>
                  <p className="text-gray-700">Our strategic goals include:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Expanding our presence across the Middle East and beyond</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Investing in cutting-edge technologies and sustainable practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Developing local talent and creating employment opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-business-600 flex-shrink-0 mt-0.5" />
                      <span>Setting new standards of excellence in our industry</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">Our Leadership Team</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                Meet the experienced professionals who guide our company's strategic direction and operations.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Ahmed Al-Saud",
                  position: "Chief Executive Officer",
                  bio: "With over 25 years of experience in the industry, Ahmed leads our company with vision and integrity.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Fatima Al-Rashid",
                  position: "Chief Operations Officer",
                  bio: "Fatima oversees our day-to-day operations, ensuring efficiency and excellence in all our projects.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Mohammed Al-Qahtani",
                  position: "Chief Financial Officer",
                  bio: "Mohammed manages our financial strategy, driving sustainable growth and value creation.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Layla Al-Otaibi",
                  position: "Chief Technology Officer",
                  bio: "Layla leads our technology initiatives, implementing innovative solutions for our clients.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-[300px]">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                    <p className="mb-3 text-sm text-business-600 font-medium">{member.position}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild className="bg-business-600 hover:bg-business-700">
                <Link href="/team">View Full Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-business-700 md:text-4xl">Our Core Values</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                These principles guide our decisions, actions, and interactions with clients, partners, and communities.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Excellence",
                  description:
                    "We strive for excellence in everything we do, setting high standards and continuously improving our processes and services.",
                  icon: Award,
                },
                {
                  title: "Integrity",
                  description:
                    "We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.",
                  icon: CheckCircle,
                },
                {
                  title: "Innovation",
                  description:
                    "We embrace innovation and creative thinking to develop solutions that address complex challenges and drive progress.",
                  icon: Building,
                },
                {
                  title: "Collaboration",
                  description:
                    "We believe in the power of teamwork and collaboration, working closely with our clients and partners to achieve shared goals.",
                  icon: Users,
                },
                {
                  title: "Sustainability",
                  description:
                    "We are committed to sustainable practices that minimize environmental impact and contribute to long-term social and economic development.",
                  icon: Building,
                },
                {
                  title: "Community",
                  description:
                    "We are dedicated to making a positive impact on the communities we serve, supporting local initiatives and creating opportunities.",
                  icon: Users,
                },
              ].map((value, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-business-100 text-business-600">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-business-700 py-16 text-white md:py-24">
          <div className="container text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Work With Us?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-business-100">
              Contact us today to discuss how BusinessFy can help bring your vision to life. Our team is ready to
              provide the expertise and support you need.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
              <Button asChild size="lg" className="bg-white text-business-700 hover:bg-business-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
