import FieldForComplaint from "@/components/FieldForComplaint";
import EmployeeDetails from "@/components/EmployeeDetails";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
   <>
   {/*The css color definetly needs some changes so that is also main priority. We will continue when we get break from professional classes
   Now I am just committing to maintain strak*/}
   <Hero/>
   <section  id="FieldForComplaint">
    <FieldForComplaint/>
   </section>
   

   <EmployeeDetails/>

   <Footer/>
   </>
  );
}
