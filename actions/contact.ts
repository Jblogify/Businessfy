"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Define the contact form schema for server-side validation
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData)

    // Create Supabase client
    const supabase = createClient()

    // Check if contact_submissions table exists, if not create it
    const { error: tableCheckError } = await supabase.from("contact_submissions").select("id").limit(1).maybeSingle()

    if (tableCheckError) {
      // Table doesn't exist, create it
      await supabase.rpc("create_contact_submissions_table")
    }

    // Store submission in Supabase
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      subject: validatedData.subject,
      message: validatedData.message,
      status: "new",
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error storing contact submission:", error)
      return { success: false, message: "Failed to submit your message. Please try again." }
    }

    // In a real application, you would also send an email notification here
    // For example, using a service like SendGrid, Mailgun, etc.

    // Revalidate the admin contact page if it exists
    revalidatePath("/admin/contacts")

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Please check your information and try again.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
