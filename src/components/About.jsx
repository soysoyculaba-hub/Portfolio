import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, description, icon }) => {
  const isCRM = title === "CRM & Lead Management";
  return (
    <Tilt className='w-full md:w-[23%]'>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card h-full'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-10 px-6 min-h-[400px] flex justify-start items-center flex-col h-full'
        >
          <img
            src={icon}
            alt={title}
            className={`${isCRM ? 'w-48 h-auto' : 'w-16 h-16'} object-contain mb-6`}
          />

          <h3 className='text-white text-[18px] font-bold text-center mb-4'>
            {title}
          </h3>

          <p className="text-secondary text-[13px] text-center leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <h2 className={styles.sectionHeadText}>What I Do.</h2>
        <p className={`${styles.sectionSubText} max-w-3xl mx-auto`}>From automation to full websites — I build systems that save you time and help your business grow.</p>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-5 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a href="#contact" className="bg-[#915EFF] hover:bg-[#804dee] text-white py-3 px-8 rounded-full shadow-[0_4px_14px_0_rgba(145,94,255,0.39)] transition-all font-bold tracking-wide flex items-center gap-2 text-[16px]">
          Let's Build Something Together <span>&rarr;</span>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");