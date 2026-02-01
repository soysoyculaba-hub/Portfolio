import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { certificates } from "../constants";

const CertificateCard = ({ index, title, issuer, date, image }) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
    >
        <div className='relative w-full h-[230px]'>
            <img
                src={image}
                alt={title}
                className='w-full h-full object-cover rounded-2xl'
            />
        </div>

        <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px]'>{title}</h3>
            <p className='mt-2 text-secondary text-[14px]'>{issuer}</p>
            <p className='mt-1 text-secondary text-[12px]'>{date}</p>
        </div>
    </motion.div>
);

const Certificates = () => {
    return (
        <div className={`mt-12 bg-black-100 rounded-[20px]`}>
            <div
                className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
            >
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>My achievements</p>
                    <h2 className={styles.sectionHeadText}>Certificates.</h2>
                </motion.div>
            </div>
            <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
                {certificates.map((certificate, index) => (
                    <CertificateCard key={certificate.title} index={index} {...certificate} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Certificates, "certificates");
