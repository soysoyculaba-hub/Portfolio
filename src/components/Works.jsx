import React, { useState } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { portfolioProjects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  title,
  label,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[360px]"
    >
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 450,
        }}
        className='bg-[#151030] p-3 rounded-2xl w-full border border-white/5 h-full flex flex-col'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt={title}
            className='w-full h-full object-cover rounded-xl'
          />
        </div>

        <div className='mt-3 flex-grow'>
          <h3 className='text-white font-bold text-[18px]'>{title}</h3>

          <div className="flex items-center gap-2 mt-2 mb-2">
            <span className="text-secondary text-[12px]">
              {label}
            </span>
          </div>

          <p className='text-secondary text-[12px] leading-[20px]'>
            {description}
          </p>
        </div>

        <div className='mt-3 flex flex-wrap gap-2 mb-3'>
          {tags
            .filter((tag) => tag.name !== "Portfolio")
            .map((tag) => (
              <p
                key={`${title}-${tag.name}`}
                className={`text-[12px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
        </div>

        <button
          onClick={() => window.open(source_code_link, "_blank")}
          className='w-full bg-[#915EFF] py-3 rounded-lg hover:bg-[#9f6eff] transition-colors flex items-center justify-center gap-2 text-white font-bold'
        >
          View Project <span>&rarr;</span>
        </button>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [activeTab, setActiveTab] = useState("zapier");

  // Find the active tab data
  const activeProjects = portfolioProjects.find(cat => cat.id === activeTab)?.projects || [];

  return (
    <>
      <div className="w-full flex justify-center mb-6">
        <h2 className={`${styles.sectionHeadText} text-center uppercase tracking-wider`}>
          Project Sample
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="mt-10 w-full flex flex-wrap justify-center gap-4 mb-10">
        {portfolioProjects.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-6 py-3 rounded-full text-[14px] font-bold tracking-wide transition-all ${activeTab === category.id
              ? "bg-[#915EFF] text-white shadow-lg scale-105"
              : "bg-tertiary text-secondary hover:text-white hover:bg-[#1d1836]"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className='flex flex-wrap gap-7'
      >
        <AnimatePresence mode='wait'>
          {activeProjects.map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              index={index}
              {...project}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
