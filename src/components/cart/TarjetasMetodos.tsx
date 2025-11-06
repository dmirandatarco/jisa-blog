"use client";

import DinnersIcon from "@/assets/icons/DinnersIcon";
import MasterCardIcon from "@/assets/icons/MasterCardIcon";
import VisaIcon from "@/assets/icons/VisaIcon";
import PaypalIcon from "@/assets/icons/PaypalIcon";
import AmericanIcon from "@/assets/icons/AmericanIcon";

export default function TarjetasMetodos() {
  return (
    <div className="flex gap-2 py-4 justify-center">
      <div className="w-12"><DinnersIcon /></div>
      <div className="w-12"><MasterCardIcon /></div>
      <div className="w-12"><VisaIcon /></div>
      <div className="w-12"><PaypalIcon /></div>
      <div className="w-12"><AmericanIcon /></div>
    </div>
  );
}
