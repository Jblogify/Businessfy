"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { event } from "@/lib/analytics"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">BusinessFy</h3>
            <p className="mb-4 text-gray-300">
              BusinessFy is a leading Saudi Arabian company providing innovative solutions and services across multiple
              sectors.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-white hover:text-business-300"
                onClick={() =>
                  event({
                    action: "social_click",
                    category: "engagement",
                    label: "facebook",
                  })
                }
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-business-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-business-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-business-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/construction" className="text-gray-300 hover:text-white">
                  Construction
                </Link>
              </li>
              <li>
                <Link href="/services/engineering" className="text-gray-300 hover:text-white">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/project-management" className="text-gray-300 hover:text-white">
                  Project Management
                </Link>
              </li>
              <li>
                <Link href="/services/consulting" className="text-gray-300 hover:text-white">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-gray-300 hover:text-white">
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-business-300" />
                <span>King Fahd Road, Riyadh, Kingdom of Saudi Arabia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-business-300" />
                <span>+966 12 345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-business-300" />
                <span>info@jalalnasser.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-business-700 bg-business-600 py-6">
        <div className="container text-center text-white">
          <p>&copy; {new Date().getFullYear()} BusinessFy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
