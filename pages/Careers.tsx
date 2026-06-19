import React from 'react';
import { Button, Card, SectionHeader } from '../components/UI';
import { Briefcase, Heart, Zap, Coffee, ArrowRight } from 'lucide-react';

const jobs = [
  { title: "Senior Frontend Engineer", dept: "Technology", loc: "New York, NY (Remote)", type: "Full-time" },
  { title: "Commercial Loan Officer", dept: "Lending", loc: "Chicago, IL", type: "Full-time" },
  { title: "Customer Success Specialist", dept: "Support", loc: "Austin, TX", type: "Full-time" },
  { title: "Cybersecurity Analyst", dept: "Security", loc: "Remote", type: "Full-time" },
  { title: "Product Manager, Mobile", dept: "Product", loc: "San Francisco, CA", type: "Full-time" },
];

export const Careers: React.FC = () => {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Build the future of finance</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Join a team that's redefining banking with technology, empathy, and integrity.
          </p>
          <Button variant="secondary" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
            View Open Positions
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits */}
        <div className="mb-20">
            <SectionHeader title="Why join Lumina?" subtitle="We take care of our people so they can take care of our customers." centered />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Comprehensive Health</h3>
                    <p className="text-slate-600">Top-tier medical, dental, and vision coverage for you and your family.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Growth & Learning</h3>
                    <p className="text-slate-600">$2,000 annual stipend for conferences, courses, and professional development.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Coffee className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Work-Life Balance</h3>
                    <p className="text-slate-600">Flexible remote options, unlimited PTO, and paid parental leave.</p>
                </div>
            </div>
        </div>

        {/* Job Listings */}
        <div id="openings">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Open Positions</h2>
            <div className="grid gap-4">
                {jobs.map((job, i) => (
                    <Card key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow">
                        <div className="mb-4 sm:mb-0">
                            <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                            <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.dept}</span>
                                <span>•</span>
                                <span>{job.loc}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold uppercase bg-gray-100 text-slate-600 px-3 py-1 rounded-full">{job.type}</span>
                            <Button variant="outline" className="group">
                                Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};