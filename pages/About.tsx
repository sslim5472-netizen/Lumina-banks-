import React from 'react';
import { SectionHeader } from '../components/UI';

export const About: React.FC = () => {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="About Lumina Financial" subtitle="Building a legacy of trust, innovation, and community service since 1985." />

      <div className="prose prose-lg text-slate-600 max-w-4xl mx-auto mb-16">
        <p>
          Lumina Financial was founded with a simple mission: to bring transparency and humanity back to banking. 
          Starting as a small community lender, we have grown into a digital-first financial institution serving 
          millions of customers, yet we have never lost sight of our core values.
        </p>
        <p>
          We believe that technology should empower people, not complicate their lives. That is why we invest heavily 
          in secure, intuitive digital platforms while maintaining a dedicated team of human support specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
         <div>
            <div className="text-6xl font-bold text-slate-200 mb-4">01</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Integrity</h3>
            <p className="text-slate-600">We act with honesty and transparency in every transaction.</p>
         </div>
         <div>
            <div className="text-6xl font-bold text-slate-200 mb-4">02</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Innovation</h3>
            <p className="text-slate-600">Constantly evolving to meet the modern needs of our clients.</p>
         </div>
         <div>
            <div className="text-6xl font-bold text-slate-200 mb-4">03</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Community</h3>
            <p className="text-slate-600">Reinvesting in the neighborhoods where we live and work.</p>
         </div>
      </div>

      <div className="bg-slate-100 rounded-2xl p-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Leadership</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="text-center">
                <div className="w-32 h-32 bg-slate-300 rounded-full mx-auto mb-4 overflow-hidden">
                   <img src={`https://picsum.photos/200?random=${i}`} alt="Team member" className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-slate-900">Executive Name</div>
                <div className="text-sm text-slate-500">Senior Position</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
