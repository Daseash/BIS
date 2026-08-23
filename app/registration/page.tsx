"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Receipt,
  Award,
  Check,
  Sparkles,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

interface CategoryOption {
  id: string;
  name: string;
  badge: string;
  amount: number;
  description: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: "student",
    name: "Student / Research Scholar",
    badge: "Academic",
    amount: 1500,
    description: "Full 2-day conclave access, workshop sessions, delegate kit & certificate.",
  },
  {
    id: "faculty",
    name: "Academic Faculty",
    badge: "Faculty",
    amount: 3500,
    description: "Plenary sessions, technical talks, paper presentation & networking dinner.",
  },
  {
    id: "industry",
    name: "Industry Delegate / Corporate Executive",
    badge: "Industry",
    amount: 6500,
    description: "Executive matchmaking, exhibition booth entry, panel dialogue & outlook copy.",
  },
  {
    id: "bis_official",
    name: "Bureau of Indian Standards Official",
    badge: "Regulatory",
    amount: 2500,
    description: "Standardisation forum access, policy panel & institutional memento.",
  },
  {
    id: "other",
    name: "Other Participant / General Attendee",
    badge: "Standard",
    amount: 4000,
    description: "General session entry, keynote attendance & digital participation kit.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(CATEGORY_OPTIONS[0]);
  const [includeWorkshop, setIncludeWorkshop] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    category: string;
    totalAmount: number;
  } | null>(null);

  // Fee Calculations
  const baseFee = selectedCategory.amount;
  const workshopFee = 0; // Included complimentary
  const delegateKitFee = 0; // Included
  const gstAmount = Math.round(baseFee * 0.18);
  const totalAmount = baseFee; // Transparent fee

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
      category: selectedCategory.name,
      organization: data.get("organization"),
      designation: data.get("designation"),
      message: data.get("message"),
      totalAmount: totalAmount,
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

      setSubmittedData({
        name: String(payload.name || ""),
        email: String(payload.email || ""),
        category: selectedCategory.name,
        totalAmount: totalAmount,
      });
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
        subtitle="Reserve your delegate pass for the Malwa Chemical Conclave 2026 at IIT Indore. Complete your profile and review fee calculation."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        {/* Intro strip */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
              IIT Indore &bull; October 12&ndash;13, 2026
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Official Conference Registration Portal
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Department of Chemical Engineering in association with the Bureau of Indian Standards
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold text-green-800 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Registrations Active</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
              <ShieldCheck size={16} className="text-navy" />
              <span>Verified Portal</span>
            </div>
          </div>
        </div>

        {/* ── Two-Column Layout: Form on Left, Classic Invoice Receipt on Right ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* ── LEFT COLUMN: Registration Form (7 cols) ── */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="institutional-card p-6 sm:p-8 bg-white border border-[#E5E7EB]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Delegate Category */}
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                          1
                        </span>
                        <h3 className="text-base font-bold text-navy-950">
                          Select Participation Category
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Step 1 of 3</span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const isSelected = selectedCategory.id === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                              "cursor-pointer rounded-lg border p-4 transition-all duration-200 text-left flex flex-col justify-between",
                              isSelected
                                ? "border-navy bg-navy-50/60 shadow-sm ring-1 ring-navy"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className={cn(
                                  "rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                  isSelected ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-700"
                                )}>
                                  {cat.badge}
                                </span>
                                <span className="font-mono text-sm font-bold text-navy-950">
                                  ₹{cat.amount.toLocaleString("en-IN")}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-navy-950 leading-snug">
                                {cat.name}
                              </h4>
                              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                {cat.description}
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
                              <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-full border",
                                isSelected ? "border-navy bg-navy text-white" : "border-gray-300 bg-white"
                              )}>
                                {isSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                              <span className={isSelected ? "text-navy" : "text-gray-400"}>
                                {isSelected ? "Selected" : "Select Tier"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Personal & Contact Information */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                          2
                        </span>
                        <h3 className="text-base font-bold text-navy-950">
                          Delegate Personal &amp; Contact Details
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Step 2 of 3</span>
                    </div>

                    <div className="space-y-4">
                      <Field label="Full Name (with Title)" htmlFor="name" required>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-3 text-gray-400" />
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className={cn(inputClass, "pl-10")}
                            placeholder="Prof. / Dr. / Mr. / Ms. First & Last Name"
                          />
                        </div>
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email Address" htmlFor="email" required>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-3 text-gray-400" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              className={cn(inputClass, "pl-10")}
                              placeholder="official.email@organization.edu"
                            />
                          </div>
                        </Field>

                        <Field label="Phone / WhatsApp Number" htmlFor="phone" required>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-3 text-gray-400" />
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              className={cn(inputClass, "pl-10")}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Affiliation & Notes */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                          3
                        </span>
                        <h3 className="text-base font-bold text-navy-950">
                          Institutional Affiliation &amp; Notes
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Step 3 of 3</span>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Organization / University" htmlFor="organization" required>
                          <div className="relative">
                            <Building size={16} className="absolute left-3.5 top-3 text-gray-400" />
                            <input
                              id="organization"
                              name="organization"
                              type="text"
                              required
                              className={cn(inputClass, "pl-10")}
                              placeholder="e.g. IIT Indore, RIL, IOCL, CSIR"
                            />
                          </div>
                        </Field>

                        <Field label="Designation / Department" htmlFor="designation">
                          <input
                            id="designation"
                            name="designation"
                            type="text"
                            className={inputClass}
                            placeholder="e.g. Associate Professor, M.Tech Scholar"
                          />
                        </Field>
                      </div>

                      <Field label="Special Requests / Paper Submission Title (Optional)" htmlFor="message">
                        <textarea
                          id="message"
                          name="message"
                          rows={2}
                          className={inputClass}
                          placeholder="Provide paper title, poster presentation topic, or accommodation queries."
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      showArrow={false}
                      className="w-full text-base py-3.5 shadow-md hover:shadow-lg font-bold"
                    >
                      {status === "submitting" && <Loader2 size={18} className="animate-spin mr-2" />}
                      {status === "submitting" ? "Processing Registration..." : `Submit Registration — ₹${totalAmount.toLocaleString("en-IN")}`}
                    </Button>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900 space-y-2"
                      >
                        <div className="flex items-center gap-2 font-bold text-green-800">
                          <CheckCircle2 size={20} className="shrink-0 text-green-600" />
                          <span>Registration Successfully Received!</span>
                        </div>
                        <p className="text-xs text-green-700 leading-relaxed">
                          Thank you, <strong>{submittedData?.name}</strong>. Your registration for <strong>{submittedData?.category}</strong> has been logged in the conference database. An official confirmation email with payment instructions has been sent to <strong>{submittedData?.email}</strong>.
                        </p>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
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

          {/* ── RIGHT COLUMN: Classic Fee Summary & Total Amount Receipt Card (5 cols) ── */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-[#D1D5DB] bg-white shadow-xl overflow-hidden">
                {/* Classic Header Band */}
                <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-5 text-white border-b-2 border-gold">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                      <Receipt size={15} /> Fee Assessment
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono font-bold text-white/80 border border-white/15">
                      MCC-2026-INV
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-white tracking-tight">
                    Registration Summary
                  </h3>
                  <p className="mt-0.5 text-xs text-white/70">
                    Indian Institute of Technology Indore
                  </p>
                </div>

                {/* Classic Invoice Body */}
                <div className="p-6 space-y-5 bg-white">
                  {/* Selected Tier Banner */}
                  <div className="rounded-lg bg-navy-50 p-4 border border-navy-100 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900 block mb-0.5">
                        Selected Delegate Tier
                      </span>
                      <h4 className="text-sm font-bold text-navy-950">
                        {selectedCategory.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500">
                        2-Day Full Conclave Access Pass
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-navy">
                      ₹{baseFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Included Items Breakdown */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                      Inclusions &amp; Entitlements
                    </span>

                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        Keynote Sessions &amp; BIS Panel Access
                      </span>
                      <span className="font-mono text-gray-500 font-medium">Included</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        Day 1 Hands-on Workshop Entry
                      </span>
                      <span className="font-mono text-gray-500 font-medium">Included</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        Delegate Kit, Badge &amp; Conference Bag
                      </span>
                      <span className="font-mono text-gray-500 font-medium">Included</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        Networking Lunch &amp; High-Tea
                      </span>
                      <span className="font-mono text-gray-500 font-medium">Included</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        IIT Indore &amp; BIS Certificate
                      </span>
                      <span className="font-mono text-gray-500 font-medium">Included</span>
                    </div>
                  </div>

                  {/* Subtotal & Taxes */}
                  <div className="space-y-2 pt-3 border-t border-dashed border-gray-200">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Base Registration Fee:</span>
                      <span className="font-mono font-medium text-gray-900">₹{baseFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Institutional Taxes &amp; GST (18%):</span>
                      <span className="font-mono font-medium text-green-700">Inclusive</span>
                    </div>
                  </div>

                  {/* ── Grand Total Amount Highlight ── */}
                  <div className="rounded-lg bg-navy-950 p-4 text-white flex items-center justify-between border-2 border-gold shadow-md">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 block">
                        Total Amount Payable
                      </span>
                      <span className="text-xs text-white/70">
                        Net Conference Fee (INR)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Payment Verification & Note */}
                  <div className="space-y-3 pt-2 text-xs text-gray-500">
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded border border-gray-100">
                      <FileCheck size={16} className="text-navy shrink-0 mt-0.5" />
                      <span>
                        Official receipts and tax invoices will be issued under the Department of Chemical Engineering, IIT Indore.
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span>• Safe &amp; Direct Bank Transfer</span>
                      <span>• Official BIS Chapter Portal</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Support box */}
            <div className="institutional-card p-4 bg-gray-50/70 text-xs text-gray-600 flex items-center gap-3">
              <HelpCircle size={20} className="text-navy shrink-0" />
              <div>
                <span className="font-bold text-navy-950 block">Need assistance or group registration?</span>
                <p className="mt-0.5">
                  Contact the Secretariat at <a href="mailto:chemenggoffice@iiti.ac.in" className="text-navy font-semibold hover:underline">chemenggoffice@iiti.ac.in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
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
