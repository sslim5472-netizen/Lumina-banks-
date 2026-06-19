import React from 'react';
import { Button, Input, SectionHeader, Card } from '../components/UI';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Contact Support" subtitle="We are here to help you 24/7. Choose the method that works best for you." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="p-6 flex items-center gap-4">
             <div className="bg-emerald-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-emerald-600" />
             </div>
             <div>
                <h4 className="font-bold text-slate-900">Call Us</h4>
                <p className="text-slate-600 text-sm">1-800-LUMINA-BK</p>
             </div>
           </Card>
           <Card className="p-6 flex items-center gap-4">
             <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
             </div>
             <div>
                <h4 className="font-bold text-slate-900">Email Us</h4>
                <p className="text-slate-600 text-sm">support@lumina.com</p>
             </div>
           </Card>
           <Card className="p-6 flex items-center gap-4">
             <div className="bg-purple-100 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-purple-600" />
             </div>
             <div>
                <h4 className="font-bold text-slate-900">Live Chat</h4>
                <p className="text-slate-600 text-sm">Available 24/7 in app</p>
             </div>
           </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
           <Card className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a secure message</h3>
              <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" placeholder="John" />
                    <Input label="Last Name" placeholder="Doe" />
                 </div>
                 <Input label="Email Address" type="email" placeholder="john@example.com" />
                 <Input label="Subject" placeholder="Regarding my account..." />
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea 
                        rows={4} 
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                        placeholder="How can we help you today?"
                    ></textarea>
                 </div>
                 <Button type="button">Send Message</Button>
              </form>
           </Card>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16">
         <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                "How do I reset my password?",
                "What are the wire transfer fees?",
                "How do I report a lost card?",
                "Is there a daily ATM withdrawal limit?"
            ].map((q, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-slate-900 mb-2">{q}</h4>
                    <p className="text-slate-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
