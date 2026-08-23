import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delegate Registration",
  description: "Register for Malwa Chemical Conclave 2026 at IIT Indore.",
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
