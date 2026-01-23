import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose
}) => {
  // EmailJS configuration - Update these with your EmailJS credentials
  // Get these from https://www.emailjs.com/ after creating an account
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';
  const RECIPIENT_EMAIL = 'pouchex@corbettlabs.in';
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    role: '',
    productInterest: '',
    expectedVolume: '',
    projectDetails: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error' | '' ; text: string }>({ type: '', text: '' });
  const [loadTimestamp, setLoadTimestamp] = useState<number>(Date.now());
  // simple honeypot value
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormMessage({ type: '', text: '' });
      setErrors({});
      setIsSubmitting(false);
      setLoadTimestamp(Date.now());
      setWebsite('');
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRe = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/i;
    if (!formData.fullName || formData.fullName.trim().length < 2) newErrors.fullName = 'Please enter your full name (min 2 characters).';
    if (!formData.email || !emailRe.test(formData.email.trim())) newErrors.email = 'Please enter a valid email address.';
    if (!formData.companyName || formData.companyName.trim().length < 2) newErrors.companyName = 'Company name must be at least 2 characters.';
    if (!formData.role) newErrors.role = 'Please select your role.';
    if (!formData.productInterest) newErrors.productInterest = 'Please select a product interest.';
    if (!formData.expectedVolume) newErrors.expectedVolume = 'Please select an expected volume.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
    const newErrors = validate();
    // anti-spam: honeypot and 3s minimum time on form
    const timeOk = Date.now() - loadTimestamp >= 3000;
    if (website) {
      setFormMessage({ type: 'error', text: 'Submission blocked. Please try again.' });
      return;
    }
    if (!timeOk) {
      setFormMessage({ type: 'error', text: 'Please wait a moment and submit again.' });
      return;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      // trim optional field
      const trimmed = {
        ...formData,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        companyName: formData.companyName.trim(),
        projectDetails: (formData.projectDetails || '').trim()
      };
      // Format email content in a structured manner
      const emailContent = `
New Quote Request from Corbett Labs Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name:        ${trimmed.fullName}
Email Address:    ${trimmed.email}
Company Name:     ${trimmed.companyName}
Role:             ${trimmed.role || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Interest: ${trimmed.productInterest || 'Not specified'}
Expected Volume:  ${trimmed.expectedVolume || 'Not specified'}

Project Details:
${trimmed.projectDetails || 'No additional details provided.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Asia/Kolkata',
  dateStyle: 'full',
  timeStyle: 'long'
})}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      // Prepare template parameters for EmailJS
      const templateParams = {
        to_email: RECIPIENT_EMAIL,
        from_name: trimmed.fullName,
        from_email: trimmed.email,
        subject: `New Quote Request from ${trimmed.companyName} - Corbett Labs Website`,
        message: emailContent,
        full_name: trimmed.fullName,
        email: trimmed.email,
        company_name: trimmed.companyName,
        role: trimmed.role || 'Not specified',
        product_interest: trimmed.productInterest || 'Not specified',
        expected_volume: trimmed.expectedVolume || 'Not specified',
        project_details: trimmed.projectDetails || 'No additional details provided.',
        submission_date: new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'long'
        })
      };

      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
        setFormMessage({ type: 'success', text: 'Thanks! Your request was sent successfully. We’ll reach out shortly.' });
        // reset form
        setFormData({ fullName: '', email: '', companyName: '', role: '', productInterest: '', expectedVolume: '', projectDetails: '' });
        if (formRef.current) formRef.current.reset();
        setLoadTimestamp(Date.now());
    } catch (err) {
      setFormMessage({ type: 'error', text: 'We couldn’t send your request. Please try again later or email pouchex@corbettlabs.in.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto bg-base-grey/95 backdrop-blur-lg border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-navy text-center">
            Ready to Partner With Us?
          </DialogTitle>
          <p className="text-cool-grey text-center">
            Get started with a custom quote, sample request, or schedule a virtual factory tour. 
            Our team is ready to bring your nicotine pouch vision to life.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-deep-navy mb-4">Request a Quote</h3>
              <p className="text-cool-grey mb-6">
                Fill out the form below and our team will prepare a detailed proposal within 24 hours.
              </p>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* ARIA live region for success/error messages */}
                <div role="status" aria-live="polite" className={`${formMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : formMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''} rounded-lg px-3 py-2 ${formMessage.text ? 'mb-2' : 'hidden'}`}>
                  {formMessage.text}
                </div>
                {/* Honeypot anti-spam */}
                <div className="hidden">
                  <Label htmlFor="website">Leave this field empty</Label>
                  <Input id="website" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} required />
                    {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)} required />
                    {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="role">Your Role</Label>
                    <Select onValueChange={value => handleInputChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Founder">CEO/Founder</SelectItem>
                        <SelectItem value="Product">Product Manager</SelectItem>
                        <SelectItem value="Procurement">Procurement</SelectItem>
                        <SelectItem value="R&D">R&D</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="role" value={formData.role} />
                    {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productInterest">Product Interest</Label>
                    <Select onValueChange={value => handleInputChange('productInterest', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mint & Menthol">Mint & Menthol</SelectItem>
                        <SelectItem value="Fruit Flavors">Fruit Flavors</SelectItem>
                        <SelectItem value="Tobacco-Free">Tobacco-Free</SelectItem>
                        <SelectItem value="Custom Formulation">Custom Formulation</SelectItem>
                        <SelectItem value="All Products">All Products</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="productInterest" value={formData.productInterest} />
                    {errors.productInterest && <p className="text-red-600 text-sm mt-1">{errors.productInterest}</p>}
                  </div>
                  <div>
                    <Label htmlFor="expectedVolume">Expected Volume</Label>
                    <Select onValueChange={value => handleInputChange('expectedVolume', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select volume range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="< 100k">Less than 100k</SelectItem>
                        <SelectItem value="100k - 500k">100k - 500k</SelectItem>
                        <SelectItem value="500k - 2M">500k - 2M</SelectItem>
                        <SelectItem value="2M+">2M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="expectedVolume" value={formData.expectedVolume} />
                    {errors.expectedVolume && <p className="text-red-600 text-sm mt-1">{errors.expectedVolume}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectDetails">Project Details</Label>
                  <textarea id="projectDetails" name="projectDetails" className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24" placeholder="Tell us about your project, timeline, target markets, and any specific requirements..." value={formData.projectDetails} onChange={e => handleInputChange('projectDetails', e.target.value)} />
                </div>

                <Button type="submit" className="w-full btn-primary transition-transform duration-300 ease-out hover:scale-[1.02]" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Submit Quote Request'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information & Virtual Tour */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-lg font-bold text-deep-navy mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-deep-navy">Headquarters</h4>
                  <p className="text-cool-grey">Uttarakhand, India</p>
                </div>
                <div>
                  <h4 className="font-medium text-deep-navy">Sales Team</h4>
                  <p className="text-cool-grey">pouchex@corbettlabs.in</p>
                </div>
                
              </div>
            </div>

            {/* Virtual Tour */}
            <div className="bg-gradient-to-br from-accent-blue to-sky-glow rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Schedule a Virtual Tour</h3>
              <p className="text-sm mb-4 text-white/90">
                See our state-of-the-art facilities and meet our team through a live virtual tour.
              </p>
              <Button className="w-full bg-white text-accent-blue hover:bg-white/90">
                Email Us
              </Button>
            </div>

            {/* Quick Actions */}
            
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ContactModal;