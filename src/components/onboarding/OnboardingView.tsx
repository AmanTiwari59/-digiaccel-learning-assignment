import React from 'react';
import { Button } from '../common/Button';

interface IOnboardingViewProps {
  onGetStarted: () => void;
}

/**
 * Screen 1: Onboarding View
 * Matches Figma mockup with purple decorative header, clear value proposition,
 * and prominent "Get Started" CTA button.
 */
export const OnboardingView: React.FC<IOnboardingViewProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#5B36F4] flex flex-col justify-between">
      {/* Top Decorative Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Abstract pattern shapes matching Figma */}
        <div className="w-full max-w-xs space-y-4 opacity-90">
          <div className="flex justify-center space-x-1">
            <svg
              className="w-32 h-16 text-white/40"
              viewBox="0 0 100 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M 5 20 Q 15 5 25 20 T 45 20 T 65 20 T 85 20" />
              <path d="M 5 30 Q 15 15 25 30 T 45 30 T 65 30 T 85 30" />
            </svg>
          </div>
          <div className="flex justify-center space-x-1 pt-6">
            <svg
              className="w-48 h-24 text-white/50"
              viewBox="0 0 120 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <path d="M 5 25 Q 15 10 25 25 T 45 25 T 65 25 T 85 25 T 105 25" />
              <path d="M 5 38 Q 15 23 25 38 T 45 38 T 65 38 T 85 38 T 105 38" />
            </svg>
          </div>
        </div>

        {/* Ambient background circles */}
        <div className="absolute top-10 right-8 w-24 h-24 rounded-full border-4 border-white/10 pointer-events-none" />
        <div className="absolute top-28 right-2 w-12 h-12 rounded-full border-2 border-white/15 pointer-events-none" />
      </div>

      {/* Bottom Content Card */}
      <div className="bg-white rounded-t-[36px] px-8 pt-10 pb-12 shadow-2xl flex flex-col items-center text-center">
        <h1 className="text-3xl font-extrabold text-[#1E1E2F] tracking-tight mb-3">
          Manage What To Do
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
          The best way to manage what you have to do, don&apos;t forget your plans.
        </p>

        <Button
          size="lg"
          fullWidth
          onClick={onGetStarted}
          className="rounded-2xl text-base shadow-lg shadow-[#5B36F4]/30"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default OnboardingView;
