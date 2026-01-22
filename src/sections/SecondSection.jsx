import React from 'react'
import ScrollRevealParagraph from '../components/ScrollRevealLetterParagraph'
import CircleLoopSlider from '../components/CircleLoopSlider'
import HoverFeatureMarquee from '../components/HoverFeatureMarquee'

const SecondSection = () => {
  return (
    <div className="min-h-screen">
    <CircleLoopSlider />
    <ScrollRevealParagraph />
    <HoverFeatureMarquee />
  </div>  )
}

export default SecondSection