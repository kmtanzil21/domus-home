import FeaturedHouses from "@/components/FeaturedHouses";
import HowItWorks from "@/components/HowItWorks";
import LuxuryHomeSlider from "@/components/LuxuryHomeSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center">
      <LuxuryHomeSlider></LuxuryHomeSlider>
      <FeaturedHouses></FeaturedHouses>
      <HowItWorks></HowItWorks>
     
    </div>
  );
}
