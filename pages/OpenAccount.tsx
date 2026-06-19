import React, { useState } from 'react';
import { Button, Input, Card, SectionHeader, Select } from '../components/UI';
import { CheckCircle, Briefcase, User, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { AccountType } from '../types';

export const OpenAccount: React.FC = () => {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [formData, setFormData] = useState({
    // Personal Fields
    firstName: '', lastName: '', email: '', phone: '', address: '', ssn: '', dob: '',
    // Business Fields
    businessName: '', ein: '', businessPhone: '', businessAddress: '', industry: '', annualRevenue: '', 
    legalStructure: 'llc', dateEstablished: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  // Helper to format inputs
  const formatInput = (name: string, value: string) => {
    // Basic numeric masking
    if (name === 'ssn') {
       // XXX-XX-XXXX
       const nums = value.replace(/\D/g, '').slice(0, 9);
       if (nums.length > 5) return `${nums.slice(0,3)}-${nums.slice(3,5)}-${nums.slice(5)}`;
       if (nums.length > 3) return `${nums.slice(0,3)}-${nums.slice(3)}`;
       return nums;
    }
    if (name === 'ein') {
        // XX-XXXXXXX
        const nums = value.replace(/\D/g, '').slice(0, 9);
        if (nums.length > 2) return `${nums.slice(0,2)}-${nums.slice(2)}`;
        return nums;
    }
    if (name === 'phone' || name === 'businessPhone') {
        // (XXX) XXX-XXXX
        const nums = value.replace(/\D/g, '').slice(0, 10);
        if (nums.length > 6) return `(${nums.slice(0,3)}) ${nums.slice(3,6)}-${nums.slice(6)}`;
        if (nums.length > 3) return `(${nums.slice(0,3)}) ${nums.slice(3)}`;
        return nums;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const formattedValue = formatInput(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: formattedValue });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
        <p className="text-slate-600 mb-8">
          Thank you for choosing Lumina Financial. We have received your application for a <strong>{accountType} Account</strong> and will process it shortly. 
          Check your email for next steps.
        </p>
        <Button onClick={() => window.location.href = '/'}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      <div className="mb-8">
         <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            <span className={step >= 1 ? 'text-emerald-600' : ''}>Account Type</span>
            <span className={step >= 2 ? 'text-emerald-600' : ''}>Info</span>
            <span className={step >= 3 ? 'text-emerald-600' : ''}>Verification</span>
            <span className={step >= 4 ? 'text-emerald-600' : ''}>Review</span>
         </div>
         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
         </div>
      </div>

      <Card className="p-8">
        {step === 1 && (
          <div className="animate-fadeIn">
            <SectionHeader title="Choose Account Type" subtitle="Select the type of account you wish to open today." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setAccountType(AccountType.PERSONAL)}
                className={`cursor-pointer p-6 border-2 rounded-xl flex flex-col items-center text-center transition-all ${accountType === AccountType.PERSONAL ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}
              >
                <User className={`w-12 h-12 mb-4 ${accountType === AccountType.PERSONAL ? 'text-emerald-600' : 'text-slate-400'}`} />
                <h3 className="font-bold text-lg text-slate-900">Personal</h3>
                <p className="text-sm text-slate-500 mt-2">Checking, Savings, CDs for individuals.</p>
              </div>
              <div 
                onClick={() => setAccountType(AccountType.BUSINESS)}
                className={`cursor-pointer p-6 border-2 rounded-xl flex flex-col items-center text-center transition-all ${accountType === AccountType.BUSINESS ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}
              >
                <Briefcase className={`w-12 h-12 mb-4 ${accountType === AccountType.BUSINESS ? 'text-emerald-600' : 'text-slate-400'}`} />
                <h3 className="font-bold text-lg text-slate-900">Business</h3>
                <p className="text-sm text-slate-500 mt-2">Growth solutions for LLCs and Corps.</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext} disabled={!accountType}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn">
             <SectionHeader 
                title={accountType === AccountType.BUSINESS ? "Business & Owner Information" : "Personal Information"} 
                subtitle="We need a few details to verify your identity." 
             />
             
             {accountType === AccountType.BUSINESS ? (
                <div className="space-y-8">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Business Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <Input name="businessName" label="Legal Business Name" value={formData.businessName} onChange={handleChange} />
                            </div>
                            <Select 
                                name="legalStructure" 
                                label="Legal Structure" 
                                value={formData.legalStructure} 
                                onChange={handleChange}
                                options={[
                                    { value: 'llc', label: 'Limited Liability Company (LLC)' },
                                    { value: 'corp', label: 'Corporation (C-Corp / S-Corp)' },
                                    { value: 'sp', label: 'Sole Proprietorship' },
                                    { value: 'partnership', label: 'Partnership' }
                                ]}
                            />
                            <Input name="ein" label="EIN (Tax ID)" placeholder="XX-XXXXXXX" value={formData.ein} onChange={handleChange} maxLength={10} />
                            <Input name="industry" label="Industry / Business Type" placeholder="e.g. Retail, Tech" value={formData.industry} onChange={handleChange} />
                            <Input name="dateEstablished" label="Date Established" type="date" value={formData.dateEstablished} onChange={handleChange} />
                            <Input name="annualRevenue" label="Annual Revenue (Est.)" placeholder="$0.00" value={formData.annualRevenue} onChange={handleChange} />
                            <Input name="businessPhone" label="Business Phone" type="tel" value={formData.businessPhone} onChange={handleChange} placeholder="(555) 555-5555" />
                             <div className="md:col-span-2">
                               <Input name="businessAddress" label="Business Address" value={formData.businessAddress} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">Authorized Signer / Owner</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                            <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                            <Input name="email" label="Work Email" type="email" value={formData.email} onChange={handleChange} />
                            <Input name="ssn" label="Social Security Number" type="text" placeholder="XXX-XX-XXXX" value={formData.ssn} onChange={handleChange} maxLength={11} />
                        </div>
                    </div>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                    <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                    <Input name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} />
                    <Input name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 555-5555" />
                    <Input name="dob" label="Date of Birth" type="date" value={formData.dob} onChange={handleChange} />
                    <Input name="ssn" label="Social Security Number" type="text" placeholder="XXX-XX-XXXX" value={formData.ssn} onChange={handleChange} maxLength={11} />
                    <div className="md:col-span-2">
                        <Input name="address" label="Home Address" value={formData.address} onChange={handleChange} />
                    </div>
                </div>
             )}

             <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                <Button onClick={handleNext}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn">
             <SectionHeader 
                title={accountType === AccountType.BUSINESS ? "Business Verification" : "Identity Verification"}
                subtitle={accountType === AccountType.BUSINESS ? "Please upload articles of organization and owner ID." : "Please upload a photo of your government-issued ID."}
             />
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-700 font-medium">Click to upload documents</p>
                <p className="text-slate-500 text-sm mt-2">PDF, PNG, JPG up to 5MB</p>
                <input type="file" className="hidden" />
             </div>
             <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
                Note: This is a secure portal. Your data is encrypted.
             </div>
             <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                <Button onClick={handleNext}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn">
             <SectionHeader title="Review & Submit" subtitle="Please verify your information below." />
             <div className="bg-gray-50 p-6 rounded-xl space-y-4 mb-8 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-slate-500">Account Type</span>
                   <span className="font-medium text-slate-900">{accountType}</span>
                </div>
                
                {accountType === AccountType.BUSINESS ? (
                    <>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">Business Name</span>
                           <span className="font-medium text-slate-900">{formData.businessName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">Structure</span>
                           <span className="font-medium text-slate-900 uppercase">{formData.legalStructure}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">EIN</span>
                           <span className="font-medium text-slate-900">{formData.ein}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">Authorized Signer</span>
                           <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">Name</span>
                           <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                           <span className="text-slate-500">Address</span>
                           <span className="font-medium text-slate-900">{formData.address}</span>
                        </div>
                    </>
                )}

                <div className="flex justify-between border-b border-gray-200 pb-2">
                   <span className="text-slate-500">Email</span>
                   <span className="font-medium text-slate-900">{formData.email}</span>
                </div>
             </div>
             <label className="flex items-start gap-3 mb-8">
                <input type="checkbox" className="mt-1 h-4 w-4 text-emerald-600 rounded border-gray-300" />
                <span className="text-sm text-slate-600">
                   I certify that the information provided is true and correct. I agree to the <a href="#" className="text-emerald-600 underline">Terms and Conditions</a> and <a href="#" className="text-emerald-600 underline">Electronic Disclosure</a>.
                </span>
             </label>
             <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={isSubmitting}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                <Button onClick={handleSubmit} isLoading={isSubmitting} className="w-40">Submit Application</Button>
             </div>
          </div>
        )}
      </Card>
    </div>
  );
};