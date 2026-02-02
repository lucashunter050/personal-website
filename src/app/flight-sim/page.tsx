'use client';

import dynamic from 'next/dynamic';

const InstrumentPanel = dynamic(() => import('./InstrumentPanel'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-[#BFFF00] font-sans text-sm tracking-wider">
        INITIALIZING INSTRUMENTS...
      </div>
    </div>
  ),
});

export default function FlightSimPage() {
  return <InstrumentPanel />;
}
