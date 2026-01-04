import FieldForComplaint from "@/components/FieldForComplaint";
import EmployeeDetails from "@/components/EmployeeDetails";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
   <>
   <Hero/>
   <section  id="FieldForComplaint">
    <FieldForComplaint/>
   </section>
   

   <EmployeeDetails/>

   <Footer/>
   </>
  );
}
