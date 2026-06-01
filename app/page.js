"use client";

import FieldForComplaint from "@/components/FieldForComplaint";
import EmployeeDetails from "@/components/EmployeeDetails";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="FieldForComplaint"><FieldForComplaint /></section>
      <EmployeeDetails />
    </>
  );
}
