import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import SmartFeatures from '../components/SmartFeatures'
import Roles from '../components/Roles'
import Modules from '../components/Modules'
import Cta from '../components/Cta'
import Workflow from '../components/Workflow'
import Features from '../components/Features'
import StatsStrip from '../components/StatsStrip'
import UseCases from '../components/UseCases'
import PricingPlans from '../components/PricingPlans'

const Home = () => (
  <>
    <Hero />
    <HowItWorks />
    <SmartFeatures />
    <Roles />
    <Modules />
    <Cta isMiddleCTA id="demo" />
    <Workflow />
    <Features />
    <StatsStrip />
    <UseCases />
    <PricingPlans />
    <Cta />
  </>
)

export default Home
