import React, { useState } from 'react';
import { Mail, Linkedin, FileText, ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const email = 'sadmanz.khan@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${email}?subject=Project Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0A0A0A]">
      <SEOHead
        title="Contact — Sadman Zaman Khan"
        description="Get in touch with Sadman Zaman Khan for product design, design systems, and rapid prototyping."
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex-1 w-full pt-[100px] md:pt-[120px]">
        {/* Header */}
        <section className="py-10 md:py-14 border-b border-[#27272A]">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF]">
              Contact
            </h1>
            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
              Available for enterprise product design, design systems, and functional prototyping.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Email</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#CBD5E1] hover:text-[#FFFFFF] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80] font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${email}`}
                className="group flex items-center justify-between text-base sm:text-lg font-medium text-[#FFFFFF] hover:text-[#00E5FF] transition-colors"
              >
                <span>{email}</span>
                <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00E5FF] transition-colors" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-2">
              <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">LinkedIn</span>
              <a
                href="https://linkedin.com/in/sadmanzamankhan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-base sm:text-lg font-medium text-[#FFFFFF] hover:text-[#00E5FF] transition-colors"
              >
                <span>linkedin.com/in/sadmanzamankhan</span>
                <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00E5FF] transition-colors" />
              </a>
            </div>

            {/* Resume Download Card */}
            <div className="p-6 rounded-xl bg-[#141414] border border-[#27272A] space-y-3">
              <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">Curriculum Vitae</span>
              <a
                href="/Sadman_Zaman_Khan_Resume.pdf"
                download="Sadman_Zaman_Khan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-mono text-xs font-medium uppercase tracking-wider bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#F1F5F9] transition-all shadow-sm font-bold"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 p-8 rounded-xl bg-[#141414] border border-[#27272A] space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">Send a Message</h2>
              <p className="text-xs text-[#CBD5E1]">Reach out directly with project requirements or questions.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#18181B] border border-[#4ADE80]/40 text-[#4ADE80] space-y-2">
                <div className="font-semibold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Opening your email client...</span>
                </div>
                <p className="text-xs text-[#CBD5E1]">
                  If your email client didn't open automatically, you can email me directly at <strong className="text-[#FFFFFF]">{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-[#CBD5E1] uppercase tracking-wider mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Miller"
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-[#FFFFFF] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-[#CBD5E1] uppercase tracking-wider mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-[#FFFFFF] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-[#CBD5E1] uppercase tracking-wider mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share project details, scope, or timeline..."
                    className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-[#FFFFFF] placeholder-[#52525B] text-sm focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-[#00E5FF] text-[#0A0A0A] hover:bg-[#38BDF8] transition-colors font-bold shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
