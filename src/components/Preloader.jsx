import React, { useEffect, useState } from "react";
import { rwLogo } from "../assets";

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Wait a bit before unmounting
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // 20ms * 100 = 2000ms total duration approx

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full max-w-md px-6">
                {/* Logo Box */}
                <div className="w-24 h-24 mb-6 p-1 border-2 border-[#915EFF] flex items-center justify-center">
                    <img src={rwLogo} alt="logo" className="w-full h-full object-contain" />
                </div>

                {/* Name */}
                <h1 className="text-white text-4xl font-bold mb-2 font-['Montserrat'] tracking-wider text-center">
                    Raphael Wayne Culaba
                </h1>

                {/* Subtitle */}
                <p className="text-secondary text-sm mb-16 tracking-[0.2em] uppercase text-center">
                    AI Automation & Web Development
                </p>

                {/* Progress Bar Container */}
                <div className="w-64 h-[2px] bg-[#1d1836] relative overflow-hidden rounded-full mb-2">
                    {/* Progress Fill */}
                    <div
                        className="h-full bg-[#915EFF] shadow-[0_0_10px_#915EFF]"
                        style={{ width: `${progress}%`, transition: 'width 0.05s ease-out' }}
                    />
                </div>

                {/* Loading Text & Percentage */}
                <div className="w-64 flex justify-between text-xs text-secondary font-mono">
                    <span>Loading</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
