import React from 'react'
import Hero from '../components/HomeSection/Hero'
import Offerings from '../components/HomeSection/Services'
import WhyChooseUs from '../components/HomeSection/WhyChooseUs'
import InternshipOffers from '../components/HomeSection/InternshipOffers'
import Partners from '../components/HomeSection/Partners'
import SuccessStories from '../components/HomeSection/SuccessStories'
import FAQSection from '../components/HomeSection/FAQSection'
import MostPopularPrograms from '../components/HomeSection/MostPopularPrograms'
import FloatCourse from '../components/HomeSection/FloatCourse'
import JoinNetwork from '../components/HomeSection/JoinNetwork'

function HomePage() {
  return (
    <div>
        <main className="">
        <Hero />
        <WhyChooseUs />
        <Offerings />
        <MostPopularPrograms/>
        <FloatCourse/>
        <InternshipOffers />
        <Partners />
        <SuccessStories />
        <FAQSection/>
        <JoinNetwork/>
      </main>
    </div>
  )
}

export default HomePage