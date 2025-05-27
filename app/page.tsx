export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-xl text-gray-900">BusinessFy</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center justify-center space-x-8">
            <a
              href="/"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-blue-50 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="/about"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-blue-50 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="/services"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-blue-50 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="/projects"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
              <span className="relative z-10">Projects</span>
              <div className="absolute inset-0 bg-blue-50 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
            <a
              href="/contact"
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-blue-50 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[600px] overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Building the Future of Saudi Arabia
            </h1>
            <p className="mb-8 max-w-3xl text-lg md:text-xl">
              BusinessFy is a leading Saudi Arabian company providing innovative solutions and services across multiple
              sectors.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                href="/about"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Learn More
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-blue-700 md:text-4xl">About BusinessFy</h2>
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
                <a
                  href="/about"
                  className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 inline-flex items-center"
                >
                  Read More
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg bg-gray-200">
                <div className="flex items-center justify-center h-full text-gray-500">
                  <svg className="h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0v-5a1 1 0 011-1h4a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-700 md:text-4xl">Our Services</h2>
              <p className="mx-auto max-w-3xl text-gray-700">
                We offer a comprehensive range of services designed to meet the diverse needs of our clients across
                various sectors.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0v-5a1 1 0 011-1h4a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Construction</h3>
                <p className="mb-4 text-gray-700">
                  From residential buildings to commercial complexes, we handle construction projects of all sizes.
                </p>
                <a
                  href="/services/construction"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Engineering</h3>
                <p className="mb-4 text-gray-700">
                  Our team of engineers provides innovative solutions to complex technical challenges.
                </p>
                <a
                  href="/services/engineering"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Project Management</h3>
                <p className="mb-4 text-gray-700">
                  We ensure your projects are completed on time, within budget, and to the highest standards.
                </p>
                <a
                  href="/services/project-management"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn More
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-700 py-16 text-white md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Your Project?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-blue-100">
              Contact us today to discuss how BusinessFy can help bring your vision to life. Our team is ready to
              provide the expertise and support you need.
            </p>
            <a
              href="/contact"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-md font-medium transition-colors duration-200 inline-block"
            >
              Contact Us Now
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">&copy; 2024 BusinessFy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
