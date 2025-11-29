import React from 'react';
import { TranslationContent } from '../types';
import { Bell, Link2, Heart, Download, ExternalLink, ArrowRight, Calendar, FileText, Trophy, Sparkles, BookOpen, GraduationCap, Users, Award } from 'lucide-react';

interface SectionProps {
  t: TranslationContent;
}

const tagColors: Record<string, string> = {
  'Exam': 'bg-blue-100 text-blue-700',
  'Event': 'bg-green-100 text-green-700',
  'Circular': 'bg-orange-100 text-orange-700',
  'Holiday': 'bg-yellow-100 text-yellow-700',
  'தேர்வு': 'bg-blue-100 text-blue-700',
  'நிகழ்வு': 'bg-green-100 text-green-700',
  'சுற்றறிக்கை': 'bg-orange-100 text-orange-700',
  'விடுமுறை': 'bg-yellow-100 text-yellow-700'
};

const tagIcons: Record<string, React.ElementType> = {
  'Exam': FileText,
  'Event': Trophy,
  'Circular': Users,
  'Holiday': Calendar,
  'தேர்வு': FileText,
  'நிகழ்வு': Trophy,
  'சுற்றறிக்கை': Users,
  'விடுமுறை': Calendar
};

export const AnnouncementSection: React.FC<SectionProps> = ({ t }) => {
  return (
    <section id="announcements" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-tn-orange/10 rounded-full mb-4">
              <Bell size={18} className="text-tn-orange" />
              <span className="text-tn-orange font-semibold text-sm">{t.sections.announcements.title}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sections.announcements.title}</h2>
            <p className="text-gray-500 mt-2 max-w-lg">{t.sections.announcements.subtitle}</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all group">
            {t.sections.announcements.viewAll}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.sections.announcements.items.map((item, idx) => {
            const IconComponent = tagIcons[item.tag] || FileText;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`${tagColors[item.tag] || 'bg-gray-100 text-gray-700'} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}>
                    {item.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">2024</span>
                    <span className="text-sm font-bold text-gray-900">{item.date}</span>
                  </div>
                </div>

                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tn-green group-hover:text-white transition-colors">
                  <IconComponent size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-tn-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {item.desc}
                </p>
                <button className="w-full mt-auto py-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-tn-green hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-tn-green group-hover:text-white">
                  <Download size={16} />
                  {t.sections.announcements.downloadPdf}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const resourceIcons = [GraduationCap, Award, BookOpen, Users, Trophy];
const resourceColors = ['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600', 'from-orange-500 to-orange-600', 'from-red-500 to-red-600'];

export const ResourcesSection: React.FC<SectionProps> = ({ t }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tn-green/10 rounded-full mb-4">
            <Link2 size={18} className="text-tn-green" />
            <span className="text-tn-green font-semibold text-sm">{t.sections.resources.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.sections.resources.title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{t.sections.resources.subtitle}</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {t.sections.resources.items.map((resourceName, i) => {
            const IconComponent = resourceIcons[i % resourceIcons.length];
            const colorClass = resourceColors[i % resourceColors.length];
            return (
              <a
                key={i}
                href="#"
                className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <IconComponent size={28} className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-gray-800 group-hover:text-white transition-colors block mb-2">
                    {resourceName}
                  </span>
                  <ExternalLink size={16} className="mx-auto text-gray-400 group-hover:text-white/80 transition-colors" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const DonateSection: React.FC<SectionProps> = ({ t }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tn-green via-tn-blue to-tn-green"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tn-yellow/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 text-white/10">
        <Heart size={60} />
      </div>
      <div className="absolute bottom-20 right-10 text-white/10">
        <Sparkles size={80} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
            <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Heart size={40} className="text-tn-orange" fill="currentColor" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.sections.donate.title}
          </h2>

          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.sections.donate.content}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 bg-white text-tn-green px-10 py-4 rounded-full font-bold text-lg hover:bg-tn-yellow hover:text-gray-900 transition-all hover:scale-105 shadow-xl">
              <Heart size={22} fill="currentColor" />
              {t.buttons.donate}
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              {t.sections.donate.learnMore}
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              {t.sections.donate.securePayment}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              {t.sections.donate.taxDeductible}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              {t.sections.donate.transparent}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};