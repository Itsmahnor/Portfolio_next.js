"use client";

import React, { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactEmail } from "@/app/actions/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const { register, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <section id="contact" className="py-space-9 px-space-4 sm:px-space-6 lg:px-space-8 bg-surface border-t border-border-custom/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-h2 tracking-tight text-primary text-center mb-space-7">Get in Touch</h2>

        <form action={formAction} className="flex flex-col gap-space-4">
          <div className="flex flex-col gap-1">
            <label className="text-small font-semibold text-primary">Name</label>
            <input {...register("name")} name="name" className="p-space-3 rounded-md border border-border-custom focus:ring-1 focus:ring-accent outline-none" />
            {errors.name && <p className="text-error text-tiny">{errors.name.message}</p>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-small font-semibold text-primary">Email</label>
            <input {...register("email")} name="email" className="p-space-3 rounded-md border border-border-custom focus:ring-1 focus:ring-accent outline-none" />
            {errors.email && <p className="text-error text-tiny">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-small font-semibold text-primary">Message</label>
            <textarea {...register("message")} name="message" rows={4} className="p-space-3 rounded-md border border-border-custom focus:ring-1 focus:ring-accent outline-none" />
            {errors.message && <p className="text-error text-tiny">{errors.message.message}</p>}
          </div>

          <button type="submit" disabled={isPending} className="bg-accent text-surface py-space-3 rounded-md font-semibold hover:bg-primary transition-colors">
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {state?.success && <p className="text-success text-center mt-space-4">{state.message}</p>}
        {state?.success === false && <p className="text-error text-center mt-space-4">Failed to send message.</p>}
      </div>
    </section>
  );
}
