import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Transition from '../components/Transition';
import Projects from '../components/Projects';
import FeaturedProject from '../components/FeaturedProject';
import Skills from '../components/Skills';
import ToolsMarquee from '../components/ToolsMarquee';
import Process from '../components/Process';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Transition />
      <Projects />
      <FeaturedProject />
      <Skills />
      <ToolsMarquee />
      <Process />
      <Contact />
    </div>
  );
};

export default Home;
