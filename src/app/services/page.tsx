import type { Metadata } from "next";
import { Services } from "@/components/services/Services";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <Services page />;
}
