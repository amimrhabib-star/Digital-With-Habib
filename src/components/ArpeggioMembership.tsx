import React, { useState } from 'react';
import { Check, ArrowUpRight, Sparkles, PhoneCall, Zap, HelpCircle } from 'lucide-react';
import { ARPEGGIO_MEMBERSHIP_PLANS } from '../data/studioData';
import { MembershipPlan } from '../types';

interface ArpeggioMembershipProps {
  onSelectPlan: (plan: MembershipPlan) => void;
  onBookCall: () => void;
}

export const ArpeggioMembership: React.FC<ArpeggioMembershipProps> = ({
  onSelectPlan,
  onBookCall
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <section id="arpeggio-membership" className="py-24 bg-[#09090b] text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 mb-4">
              <Zap className="w-3.5 h-3.5 text-zinc-300" />
              <span>MEMBERSHIP PLANS // PRICING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Your passport to flexible design revisions
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Get creativity and all premium features in one transparent monthly subscription. Pause or cancel whenever you need.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="mt-10 flex items-center justify-center">
          <div className="p-1 rounded-full bg-white/[0.05] border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Quarterly Sprints</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {ARPEGGIO_MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.quarterlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-white/40 bg-zinc-950/80 shadow-[0_0_50px_rgba(255,255,255,0.06)]'
                    : 'border border-white/10 bg-zinc-950/40 hover:border-white/20'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                      {plan.id === 'pro-plan' ? '2 REQUESTS' : '1 REQUEST'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-8 pb-8 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-sm font-mono text-zinc-400">/ month</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                      {billingCycle === 'quarterly' ? 'Billed quarterly ($' + (price * 3).toLocaleString() + ')' : 'Pause or cancel anytime with zero penalty'}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-8 space-y-4">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      Included in this Membership
                    </div>
                    <ul className="space-y-3.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                          <div className="w-4 h-4 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                          <div>
                            <span className="text-zinc-200 font-medium">{feat.text}</span>
                            {feat.subtext && (
                              <p className="text-[11px] text-zinc-400 mt-0.5">{feat.subtext}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-10 mt-10 border-t border-white/10 space-y-3">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-4 rounded-full text-sm font-bold tracking-tight transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-white text-black hover:bg-zinc-200 shadow-xl'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onBookCall}
                    className="w-full py-2.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Or schedule a 15-min discovery call</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Scope Footnote */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Looking for a single project or custom enterprise engagement?</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            We also offer fixed-fee milestone sprints for bespoke product releases, design system audits, and comprehensive brand overhauls.
          </p>
          <button
            onClick={onBookCall}
            className="mt-4 text-xs font-mono text-white underline underline-offset-4 hover:text-zinc-300"
          >
            Contact our executive director &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
