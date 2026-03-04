import React from 'react'
import ScrollRevealParagraph from '../components/ScrollRevealLetterParagraph'
import CircleLoopSlider from '../components/CircleLoopSlider'
import HoverFeatureMarquee from '../components/HoverFeatureMarquee'

const SecondSection = () => {
  return (
    <div className=" mt-0 md:-mt-20 xl:mt-0">
    <CircleLoopSlider />
    <ScrollRevealParagraph />
    <HoverFeatureMarquee />
  </div>  )
}

export default SecondSection