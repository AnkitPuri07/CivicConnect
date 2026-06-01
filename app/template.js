"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { ToastContainer } from "@/components/ui/Toast";

export default function Template({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ToastContainer />
    </AuthProvider>
  );
}
