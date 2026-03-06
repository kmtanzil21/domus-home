import CTABanner from "@/components/CTABanner";
import FeaturedHouses from "@/components/FeaturedHouses";
import HowItWorks from "@/components/HowItWorks";
import LuxuryHomeSlider from "@/components/LuxuryHomeSlider";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center">
      <LuxuryHomeSlider></LuxuryHomeSlider>
      <FeaturedHouses></FeaturedHouses>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <CTABanner></CTABanner>
     
    </div>
  );
}
