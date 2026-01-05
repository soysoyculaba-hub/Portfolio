import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { automationTools, webTechStack } from "../constants";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const MarqueeRow = ({ items, duration }) => {
  return (
    <div className='relative flex overflow-hidden py-10 group'>
      <motion.div
        className='flex gap-8 whitespace-nowrap'
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((tech, index) => (
          <div
            key={`tech-${index}`}
            className='flex items-center gap-6 px-8 py-4 bg-[#1d1836] rounded-xl min-w-max border border-white/10 shadow-md hover:border-[#915EFF] transition-colors'
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className='w-8 h-8 object-contain'
            />
            <p className='text-white text-[16px] font-medium tracking-wide'>
              {tech.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Tech = () => {
  return (
    <div className='flex flex-col gap-10 overflow-hidden'>
      <motion.div variants={textVariant()} className="text-center mb-4">
        <h2 className={styles.sectionHeadText}>Tools & Tech Stack</h2>
        <p className={`${styles.sectionSubText} max-w-3xl mx-auto`}>
          The tools and technologies I use to build automations and websites.
        </p>
      </motion.div>

      <div className='flex flex-col gap-2'>
        {/* Row 1: Automation & Productivity - Normal Speed */}
        <div>
          <p className="text-[#915EFF] font-bold text-[18px] tracking-wider text-center mb-2 uppercase">
            AUTOMATION & PRODUCTIVITY TOOLS
          </p>
          <MarqueeRow items={automationTools} duration={30} />
        </div>

        {/* Row 2: Web Development - Slower Speed */}
        <div>
          <p className="text-[#915EFF] font-bold text-[18px] tracking-wider text-center mb-2 uppercase">
            WEB DEVELOPMENT TECH STACK
          </p>
          <MarqueeRow items={webTechStack} duration={45} />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
