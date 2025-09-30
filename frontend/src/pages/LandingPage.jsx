import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutUs from '../components/AboutUs'
import Categories from '../components/Categories'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <section id="home">
        <HeroSection />
      </section>

      <section id="menu">
        <Categories />
      </section>

      <section id="about">
        <AboutUs />
      </section>
    </>
  )
}
