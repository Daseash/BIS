"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  "Student / Research Scholar",
  "Academic Faculty",
  "Industry Delegate / Corporate Executive",
  "Bureau of Indian Standards Official",
  "Other Participant",
];

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
        title="Delegate Registration"
        subtitle="Submit your details to receive registration confirmation, schedule updates, and delegate kit information for MCC 2026."
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="institutional-card p-6 sm:p-10 bg-white">
            <div className="mb-6 border-b border-[#E5E7EB] pb-5">
              <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                Official Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-950">
                Conference Registration Form
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Please complete the required details below. Official registration fee slabs will be announced closer to the event.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="name" required>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Prof. / Dr. / Mr. / Ms. Full Name"
                  />
                </Field>

                <Field label="Email Address" htmlFor="email" required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="official.email@institution.edu"
                  />
                </Field>

                <Field label="Mobile / WhatsApp Number" htmlFor="phone" required>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </Field>

                <Field label="Participation Category" htmlFor="category" required>
                  <select id="category" name="category" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Select your category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Organization / Institution / University" htmlFor="organization" required>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="e.g. IIT Indore, RIL, IOCL, etc."
                />
              </Field>

              <Field label="Special Requirements or Message (optional)" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={inputClass}
                  placeholder="Paper presentation title, accommodation request, or message to organizing committee."
                />
              </Field>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  showArrow={false}
                  className="w-full text-base py-3.5"
                >
                  {status === "submitting" && <Loader2 size={18} className="animate-spin mr-2" />}
                  {status === "submitting" ? "Processing Registration..." : "Submit Registration Details"}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 rounded-md border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-800"
                  >
                    <CheckCircle2 size={20} className="shrink-0 text-green-600" />
                    <span>Registration details submitted successfully! The secretariat will contact you with further instructions.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 rounded-md border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-800"
                  >
                    <AlertCircle size={20} className="shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>
      </div>
    </>
  );
}

const inputClass =
  "w-full rounded-md border border-[#D1D5DB] bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-2xs outline-none transition-all placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20";

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
      <label htmlFor={htmlFor} className={cn("mb-1.5 block text-xs sm:text-sm font-semibold text-navy-950")}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}

