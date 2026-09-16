import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/studioData';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="process" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-[1.15] mb-4">
            A simple process from <br />
            <span className="text-gradient-blue">idea to delivery.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminating guesswork with structured milestones. Clear timelines, transparent iterations, and relentless quality control at every stage.
          </p>
        </div>

        {/* Step Progress Bar Track */}
        <div className="relative mb-12">
          {/* Background Track */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-0" />
          
          {/* Active Highlight Line */}
          <div 
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#146BFF] to-[#4DA3FF] -translate-y-1/2 -z-0 transition-all duration-500"
            style={{ width: `${(activeStepIndex / 3) * 100}%` }}
          />

          {/* 4 Step Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex >= idx;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border ${
                    isActive
                      ? 'bg-white border-[#146BFF] shadow-lg shadow-[#146BFF]/15 ring-2 ring-[#146BFF]/20'
                      : isPassed
                      ? 'bg-blue-50/50 border-blue-200/70 text-[#071A41]'
                      : 'bg-slate-50/80 border-slate-200/70 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-black tracking-tighter ${isActive ? 'text-[#146BFF]' : 'text-slate-400'}`}>
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {step.duration}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#071A41]">{step.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card for Active Step */}
        <motion.div
          key={activeStepIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-8 sm:p-12 rounded-[32px] bg-[#F7F9FC] border border-slate-200/80 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#146BFF]">
                  Step {PROCESS_STEPS[activeStepIndex].stepNumber}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#071A41]">
                  • {PROCESS_STEPS[activeStepIndex].title}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-semibold text-[#071A41]/90">
                {PROCESS_STEPS[activeStepIndex].subtitle}
              </h4>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {PROCESS_STEPS[activeStepIndex].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#146BFF] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tangible Milestones</span>
              </div>

              <div className="space-y-2.5">
                {PROCESS_STEPS[activeStepIndex].keyOutputs.map((out, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146BFF] shrink-0 mt-2" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
