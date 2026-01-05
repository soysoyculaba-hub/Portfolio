import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>

      {/* 2-Column Grid for Desktop */}
      <div className={`absolute inset-0 sm:top-[120px] top-[30px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start pointer-events-none`}>

        {/* Left Column (Text) */}
        <div className="flex-1 flex flex-col lg:justify-center justify-start z-10 pointer-events-auto h-full">

          <div className="flex items-center gap-4 mb-2">
            <div className='w-8 h-1 bg-[#915EFF] rounded-full' />
            <p className="text-[#dfd9ff] font-medium text-[14px] uppercase tracking-wider">
              TIRED OF MANUAL BUSYWORK?
            </p>
          </div>

          <h1 className="font-black text-white lg:text-[60px] sm:text-[40px] xs:text-[30px] text-[26px] leading-tight">
            Technical Virtual <br />
            <span className="text-[#915EFF]">Assistant</span>
          </h1>

          <p className="mt-2 text-secondary font-mono tracking-widest text-[16px] lg:text-[18px] mb-6 uppercase">
            GOHIGHLEVEL • ZAPIER • WEB DEVELOPMENT
          </p>

          <div className="flex gap-4 mb-8 relative">
            <div className='w-1 h-20 hidden sm:block violet-gradient absolute left-[-20px]' />
            <p className="text-white-100 text-[15px] max-w-lg leading-relaxed border-l-4 border-[#915EFF] pl-6 sm:border-none sm:pl-0">
              I build automations and websites that handle repetitive tasks in the background, so you can focus on growing your business.
              <br />
              <br />
              <span className="text-secondary italic text-[13px]">
                No fluff. I'll tell you honestly what works best for your case.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-1">
            <a href="#contact" className="bg-[#915EFF] hover:bg-[#804dee] text-white py-3 px-6 rounded shadow-[0_4px_14px_0_rgba(145,94,255,0.39)] transition-all font-bold tracking-wide flex items-center gap-2 text-[14px]">
              Book a Free Discovery Call <span>&rarr;</span>
            </a>
            <a href="#works" className="border border-white/20 hover:bg-white/10 text-white py-3 px-6 rounded font-medium transition-all flex items-center gap-2 backdrop-blur-sm text-[14px]">
              <span>&#9654;</span> View My Work
            </a>
          </div>

        </div>

        {/* Right Column Spacer (Desktop only) */}
        <div className="flex-1 hidden lg:block"></div>
      </div>

      {/* 3D Model Container - Absolute Right */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 lg:translate-y-0 lg:translate-x-0">
        <ComputersCanvas />
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 w-full flex justify-center items-center z-10 pointer-events-none'>
        <a href='#about' className="pointer-events-auto">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;