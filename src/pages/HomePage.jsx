import React from 'react'
import Hero from '../components/HomeSection/Hero'
import Offerings from '../components/HomeSection/Services'
import WhyChooseUs from '../components/HomeSection/WhyChooseUs'
import InternshipOffers from '../components/HomeSection/InternshipOffers'
import Partners from '../components/HomeSection/Partners'
import SuccessStories from '../components/HomeSection/SuccessStories'

function HomePage() {
  return (
    <div>
        <main className="">
        <Hero />
        <WhyChooseUs />
        <Offerings />
        <InternshipOffers />
        <Partners />
        <SuccessStories />
      </main>
    </div>
  )
}

export default HomePage