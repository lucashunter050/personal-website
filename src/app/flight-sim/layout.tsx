import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Sim — Lucas Hunter",
  description: "Browser flight simulator over an endless cloudscape. WASD to fly.",
};

export default function FlightSimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
