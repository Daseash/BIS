"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GlassSection, GlassCard } from "@/components/GlassSection";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

const CATEGORIES = ["Student", "Faculty", "Industry Professional", "Other"];

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      category: data.get("category"),
      organization: data.get("organization"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <PageHero
        title="Registration"
        subtitle="Reserve your spot at Malwa Chemical Conclave 2026. Fee details to be announced."
      />

      <GlassSection className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="name" required>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </Field>

                <Field label="Email" htmlFor="email" required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                </Field>

                <Field label="Phone" htmlFor="phone" required>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </Field>

                <Field label="Category" htmlFor="category" required>
                  <select id="category" name="category" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Organization / Institution" htmlFor="organization">
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className={inputClass}
                  placeholder="IIT Indore"
                />
              </Field>

              <Field label="Message (optional)" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={inputClass}
                  placeholder="Anything you'd like the organizers to know"
                />
              </Field>

              <Button
                type="submit"
                disabled={status === "submitting"}
                showArrow={false}
                className="w-full"
              >
                {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
                {status === "submitting" ? "Submitting..." : "Submit Registration"}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-sm bg-green-50 px-4 py-3 text-sm text-green-700"
                  >
                    <CheckCircle2 size={18} />
                    Registration submitted successfully. We&apos;ll be in touch.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle size={18} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>
        </Reveal>
      </GlassSection>
    </>
  );
}

const inputClass =
  "w-full rounded-sm border border-white/30 bg-white/50 px-3 py-2.5 text-sm text-gray-800 outline-none backdrop-blur-sm transition-colors focus:border-gold focus:ring-1 focus:ring-gold";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={cn("mb-1.5 block text-sm font-medium text-navy-900")}>
        {label} {required && <span className="text-navy">*</span>}
      </label>
      {children}
    </div>
  );
}
