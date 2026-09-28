import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import SmartFeatures from '../components/SmartFeatures'
import Roles from '../components/Roles'
import Modules from '../components/Modules'
import Cta from '../components/Cta'
import Workflow from '../components/Workflow'
import Features from '../components/Features'
import OfflineReady from '../components/OfflineReady'
import StatsStrip from '../components/StatsStrip'
import UseCases from '../components/UseCases'
import PricingPlans from '../components/PricingPlans'
import UpcomingModules from '../components/UpcomingModules'

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
    <OfflineReady />
    <StatsStrip />
    <UseCases />
    <PricingPlans />
    <UpcomingModules />
    <Cta />
  </>
)

export default Home
