import React from "react";
import Header from "./components/Header";
import Hero from "./sections/Hero";
import SecondSection from "./sections/SecondSection";
import WhatWeDoSection from "./sections/ServicesTiltCards";
import ProjectsShowcase from "./sections/ProjectsShowcase";
import TeamShowcase from "./sections/TeamShowcase";
import ContactFormSection from "./sections/ContactFormSection";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SecondSection />
      <WhatWeDoSection />
      <ProjectsShowcase />
      <TeamShowcase />
      <ContactFormSection />
    </div>
  );
}
