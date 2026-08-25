"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Receipt,
  Check,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileCheck,
  Calendar,
  Hotel,
  Info,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CategoryId = "iiti" | "external_student" | "academia" | "industry";
type DurationId = "1day" | "2days";

interface DurationOption {
  id: DurationId;
  label: string;
  sublabel: string;
  amount: number;
}

interface AccommodationOption {
  id: string;
  label: string;
  sublabel?: string;
  amount: number;
  note?: string;
}

interface CategoryTier {
  id: CategoryId;
  name: string;
  badge: string;
  description: string;
  durations: DurationOption[];
  accommodationType: "none" | "checkbox" | "options";
  accommodationOptions?: AccommodationOption[];
}

const CATEGORIES: CategoryTier[] = [
  {
    id: "iiti",
    name: "IIT Indore Student/Researcher/Faculty",
    badge: "IIT Indore",
    description: "Registered students, PhD research scholars, and faculty members of IIT Indore.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to technical sessions & exhibitions", amount: 0 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 200 },
    ],
    accommodationType: "none",
  },
  {
    id: "external_student",
    name: "External Student/PhD Scholar",
    badge: "External Scholar",
    description: "Students, postgraduates, and doctoral researchers from external universities and institutes.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to technical sessions & exhibitions", amount: 200 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 400 },
    ],
    accommodationType: "checkbox",
    accommodationOptions: [
      {
        id: "on_campus_900",
        label: "On-Campus Accommodation",
        sublabel: "Subsidized hostel / guest room on Simrol campus",
        amount: 900,
      },
    ],
  },
  {
    id: "academia",
    name: "Academia/Faculty",
    badge: "Faculty / Academic",
    description: "Professors, scientists, and researchers from universities and national research labs.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to keynote addresses & technical talks", amount: 400 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 1000 },
    ],
    accommodationType: "checkbox",
    accommodationOptions: [
      {
        id: "on_campus_900",
        label: "On-Campus Accommodation",
        sublabel: "IIT Indore campus guest house accommodation",
        amount: 900,
      },
    ],
  },
  {
    id: "industry",
    name: "Industrial Delegate and Others",
    badge: "Industry / Corporate",
    description: "Corporate executives, chemical manufacturers, R&D leaders, and standardisation officials.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day executive dialogue & technical sessions", amount: 1000 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Matchmaking & Masterclasses", amount: 2000 },
    ],
    accommodationType: "options",
    accommodationOptions: [
      {
        id: "none",
        label: "No Accommodation Needed",
        sublabel: "Self-arranged daily commute",
        amount: 0,
      },
      {
        id: "on_campus_1300",
        label: "Accommodation on campus",
        sublabel: "IIT Indore Executive Guest House / VIP Suite",
        amount: 1300,
      },
      {
        id: "outside_sky_imperial",
        label: "Accommodation outside — Sky Imperial",
        sublabel: "Partner hotel (Book on your own / 0 Rs. added)",
        amount: 0,
        note: "Partner booking guidance & contact will be provided upon confirmation.",
      },
    ],
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTier>(CATEGORIES[0]);
  const [selectedDurationId, setSelectedDurationId] = useState<DurationId>("2days");
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string>("none");
  const [isAccommodationChecked, setIsAccommodationChecked] = useState<boolean>(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    category: string;
    duration: string;
    accommodation: string;
    totalAmount: number;
  } | null>(null);

  // Handle Category Change
  const handleCategorySelect = (category: CategoryTier) => {
    setSelectedCategory(category);
    setSelectedDurationId("2days");
    setIsAccommodationChecked(false);
    setSelectedAccommodationId("none");
  };

  // Find active duration option
  const activeDuration =
    selectedCategory.durations.find((d) => d.id === selectedDurationId) ??
    selectedCategory.durations[0];

  // Calculate Accommodation fee
  let accommodationFee = 0;
  let accommodationLabel = "None";

  if (selectedCategory.accommodationType === "checkbox") {
    if (isAccommodationChecked && selectedCategory.accommodationOptions?.[0]) {
      accommodationFee = selectedCategory.accommodationOptions[0].amount;
      accommodationLabel = `${selectedCategory.accommodationOptions[0].label} (₹${accommodationFee})`;
    } else {
      accommodationLabel = "Not Selected (Self-arranged)";
    }
  } else if (selectedCategory.accommodationType === "options") {
    const opt = selectedCategory.accommodationOptions?.find((o) => o.id === selectedAccommodationId);
    if (opt) {
      accommodationFee = opt.amount;
      accommodationLabel = opt.label;
    }
  } else {
    accommodationLabel = "IIT Indore Campus Resident";
  }

  // Calculate Total Sum
  const basePassFee = activeDuration.amount;
  const totalAmount = basePassFee + accommodationFee;

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
      category: `${selectedCategory.name} — ${activeDuration.label}`,
      organization: data.get("organization"),
      designation: data.get("designation"),
      message: data.get("message"),
      totalAmount: totalAmount,
      website: data.get("website"),
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
        duration: activeDuration.label,
        accommodation: accommodationLabel,
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
        subtitle="Reserve your delegate pass for the Malwa Chemical Conclave 2026 at IIT Indore. Select category, participation duration, and accommodation."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        {/* Top summary strip */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div>
            <span className="inline-block rounded bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800">
              IIT Indore &bull; October 11&ndash;12, 2026
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Official Conference Registration Portal
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Department of Chemical Engineering, Indian Institute of Technology Indore
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

        {/* ── Two-Column Layout: Form on Left, Live Receipt on Right ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* ── LEFT COLUMN: Registration Form (7 cols) ── */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="rounded-xl border border-[#E5E7EB] p-6 sm:p-8 bg-white shadow-sm transition-all duration-300 hover:border-navy hover:shadow-lg hover:ring-2 hover:ring-navy/20">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Invisible Honeypot Field for Anti-Bot Protection */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    style={{ display: "none", opacity: 0, position: "absolute", left: "-9999px" }}
                  />

                  {/* Step 1: 4 Categories Selection */}
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                          1
                        </span>
                        <h3 className="text-base font-bold text-navy-950">
                          Select Participant Category
                        </h3>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Step 1 of 3</span>
                    </div>

                    {/* 4 Category Cards (Pure White Background) */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory.id === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat)}
                            className={cn(
                              "cursor-pointer rounded-xl border p-4 transition-all duration-300 text-left flex flex-col justify-between bg-white",
                              isSelected
                                ? "border-navy shadow-sm ring-1 ring-navy"
                                : "border-gray-200 hover:border-navy hover:shadow-xs"
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={cn(
                                    "rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                    isSelected
                                      ? "bg-navy-900 text-white"
                                      : "bg-gray-100 text-gray-700"
                                  )}
                                >
                                  {cat.badge}
                                </span>
                                <span className="text-xs font-semibold text-navy">
                                  {isSelected ? "Selected" : "Select"}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-navy-950 leading-snug">
                                {cat.name}
                              </h4>
                              <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                                {cat.description}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                              <span className="text-gray-500 font-normal">
                                {isSelected ? "Category Selected" : "Click to select"}
                              </span>
                              <div
                                className={cn(
                                  "flex h-4 w-4 items-center justify-center rounded-full border",
                                  isSelected
                                    ? "border-navy bg-navy text-white"
                                    : "border-gray-300 bg-white"
                                )}
                              >
                                {isSelected && <Check size={10} strokeWidth={3} />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ── Dynamic Sub-options Box (Pure White Background) ── */}
                    <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white p-5 space-y-5 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                          <Calendar size={14} className="text-navy" />
                          Participation Duration: <span className="text-navy font-extrabold">{selectedCategory.name}</span>
                        </span>
                      </div>

                      {/* Duration Radio Options with Respective Amount */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selectedCategory.durations.map((duration) => {
                          const isDurationSelected = selectedDurationId === duration.id;
                          return (
                            <div
                              key={duration.id}
                              onClick={() => setSelectedDurationId(duration.id)}
                              className={cn(
                                "cursor-pointer rounded-lg border p-4 transition-all duration-200 text-left flex flex-col justify-between bg-white",
                                isDurationSelected
                                  ? "border-navy shadow-sm ring-1 ring-navy"
                                  : "border-gray-200 hover:border-navy hover:shadow-xs"
                              )}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <h5 className="text-sm font-bold text-navy-950">
                                  {duration.label}
                                </h5>
                                <span className="font-mono text-base font-extrabold text-navy-950">
                                  ₹{duration.amount}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {duration.sublabel}
                              </p>
                              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-navy">
                                <div
                                  className={cn(
                                    "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
                                    isDurationSelected
                                      ? "border-navy bg-navy text-white"
                                      : "border-gray-300 bg-white"
                                  )}
                                >
                                  {isDurationSelected && <Check size={8} strokeWidth={3} />}
                                </div>
                                <span className={isDurationSelected ? "text-navy" : "text-gray-400"}>
                                  {isDurationSelected ? "Selected Option" : "Choose this option"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* ── Dynamic Accommodation Section for Selected Category ── */}
                      {selectedCategory.accommodationType === "checkbox" && selectedCategory.accommodationOptions?.[0] && (
                        <div className="pt-4 border-t border-gray-100">
                          <label
                            onClick={() => setIsAccommodationChecked(!isAccommodationChecked)}
                            className={cn(
                              "cursor-pointer rounded-lg border p-4 transition-all duration-200 flex items-start justify-between gap-4 bg-white",
                              isAccommodationChecked
                                  ? "border-navy shadow-sm ring-1 ring-navy"
                                  : "border-gray-200 hover:border-navy hover:shadow-xs"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isAccommodationChecked}
                                onChange={(e) => setIsAccommodationChecked(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy cursor-pointer"
                              />
                              <div>
                                <span className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
                                  <Hotel size={15} className="text-navy" />
                                  {selectedCategory.accommodationOptions[0].label}
                                </span>
                                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                                  {selectedCategory.accommodationOptions[0].sublabel}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-sm font-extrabold text-navy-950 shrink-0">
                              +₹{selectedCategory.accommodationOptions[0].amount}
                            </span>
                          </label>
                        </div>
                      )}

                      {/* Industry Accommodation Options */}
                      {selectedCategory.accommodationType === "options" && selectedCategory.accommodationOptions && (
                        <div className="pt-4 border-t border-gray-100 space-y-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                            <Hotel size={14} className="text-navy" />
                            Accommodation Preference
                          </span>
                          <div className="space-y-2">
                            {selectedCategory.accommodationOptions.map((opt) => {
                              const isOptSelected = selectedAccommodationId === opt.id;
                              return (
                                <div
                                  key={opt.id}
                                  onClick={() => setSelectedAccommodationId(opt.id)}
                                  className={cn(
                                    "cursor-pointer rounded-lg border p-3.5 transition-all duration-200 flex items-start justify-between gap-3 bg-white",
                                    isOptSelected
                                      ? "border-navy shadow-sm ring-1 ring-navy"
                                      : "border-gray-200 hover:border-navy hover:shadow-xs"
                                  )}
                                >
                                  <div className="flex items-start gap-2.5">
                                    <div
                                      className={cn(
                                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                                        isOptSelected ? "border-navy bg-navy text-white" : "border-gray-300 bg-white"
                                      )}
                                    >
                                      {isOptSelected && <Check size={10} strokeWidth={3} />}
                                    </div>
                                    <div>
                                      <span className="text-xs sm:text-sm font-bold text-navy-950">
                                        {opt.label}
                                      </span>
                                      <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                                        {opt.sublabel}
                                      </p>
                                      {opt.note && (
                                        <p className="mt-1 text-[11px] text-gray-600 italic">
                                          {opt.note}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <span className="font-mono text-xs sm:text-sm font-extrabold text-navy-950 shrink-0">
                                    {opt.amount > 0 ? `+₹${opt.amount}` : "₹0"}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* IIT Indore note */}
                      {selectedCategory.accommodationType === "none" && (
                        <div className="pt-2 text-xs text-gray-500 flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                          <Info size={14} className="text-navy shrink-0" />
                          <span>Campus resident pass — on-campus housing not applicable.</span>
                        </div>
                      )}
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
                            maxLength={100}
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
                              maxLength={100}
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
                              maxLength={25}
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
                              maxLength={150}
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
                            maxLength={100}
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
                          maxLength={1000}
                          className={inputClass}
                          placeholder="Provide paper title, poster presentation topic, or accommodation queries."
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Move to Payment Button with Enhanced Hover Effect */}
                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      showArrow={true}
                      className="w-full text-base py-4 shadow-lg hover:shadow-2xl hover:shadow-navy/25 hover:scale-[1.015] active:scale-[0.99] font-extrabold transition-all duration-300 rounded-lg cursor-pointer bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 hover:from-navy hover:via-navy-800 hover:to-navy-900 tracking-wide text-white border border-navy/30"
                    >
                      {status === "submitting" && <Loader2 size={18} className="animate-spin mr-2" />}
                      {status === "submitting" ? "Processing Registration..." : "Move to Payment"}
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
                          Thank you, <strong>{submittedData?.name}</strong>. Your registration for <strong>{submittedData?.category}</strong> ({submittedData?.duration}) has been logged in the conference database. An official confirmation email with payment instructions has been sent to <strong>{submittedData?.email}</strong>.
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

          {/* ── RIGHT COLUMN: Live Invoice Breakdown & Calculated Sum (5 cols) ── */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <Reveal delay={0.1}>
              <div className="group rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:border-navy hover:shadow-lg hover:ring-2 hover:ring-navy/20">
                {/* Header Band - Clean White Background Theme with smooth hover transition */}
                <div className="bg-white p-5 text-navy-950 border-b border-[#E5E7EB] transition-colors duration-300 group-hover:border-navy/30">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-900 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200 transition-all duration-300 group-hover:border-navy/40 group-hover:bg-navy-50 group-hover:text-navy">
                      <Receipt size={14} className="text-gold-900 group-hover:text-navy transition-colors duration-300" /> Live Assessment
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-mono font-bold text-gray-700 border border-gray-200 transition-colors group-hover:border-navy/30 group-hover:text-navy-950">
                      MCC-2026-REG
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-navy-950 tracking-tight transition-colors duration-300 group-hover:text-navy">
                    Registration Summary
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Indian Institute of Technology Indore
                  </p>
                </div>

                {/* Body with Dynamic Calculations */}
                <div className="p-6 space-y-5 bg-white">
                  {/* Selected Tier Banner (Clean White Background) */}
                  <div className="rounded-lg bg-white p-4 border border-[#E5E7EB] flex items-start justify-between transition-all duration-300 hover:border-navy hover:shadow-xs hover:ring-1 hover:ring-navy/15">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                        Selected Participant Tier
                      </span>
                      <h4 className="text-sm font-bold text-navy-950">
                        {selectedCategory.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {activeDuration.label}
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-navy-950">
                      ₹{basePassFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Itemized Line Items */}
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                      Fee Breakdown &amp; Options
                    </span>

                    {/* Participation Pass */}
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        <span>Conference Pass ({activeDuration.label})</span>
                      </span>
                      <span className="font-mono font-bold text-gray-900">
                        ₹{basePassFee.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Accommodation Option */}
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Hotel size={14} className="text-navy shrink-0" />
                        <span className="truncate max-w-[200px]" title={accommodationLabel}>
                          {accommodationLabel}
                        </span>
                      </span>
                      <span className="font-mono font-bold text-gray-900">
                        ₹{accommodationFee.toLocaleString("en-IN")}
                      </span>
                    </div>


                  </div>

                  {/* Grand Total Amount Sum (Clean Card) */}
                  <div className="rounded-lg bg-white p-4 text-navy-950 flex items-center justify-between border-2 border-navy shadow-xs transition-all duration-300 hover:border-navy-600 hover:shadow-md hover:ring-2 hover:ring-navy/20">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-navy-900 block">
                        Total Sum Payable
                      </span>
                      <span className="text-xs text-gray-500">
                        Pass Fee + Accommodation
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
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
                      <span>• Official Conference Portal</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Support box */}
            <div className="rounded-xl border border-[#E5E7EB] p-4 bg-gray-50/70 text-xs text-gray-600 flex items-center gap-3 transition-all duration-300 hover:border-navy hover:ring-1 hover:ring-navy/20 hover:shadow-md hover:bg-white">
              <HelpCircle size={20} className="text-navy shrink-0" />
              <div>
                <span className="font-bold text-navy-950 block">Need assistance or group registration?</span>
                <p className="mt-0.5">
                  Contact the Secretariat at{" "}
                  <a href="mailto:chemenggoffice@iiti.ac.in" className="text-navy font-semibold hover:underline">
                    chemenggoffice@iiti.ac.in
                  </a>
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
