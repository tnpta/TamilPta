import React from 'react';
import Hero from '../components/Hero';
import { AboutSection, ParentsSection, TeachersSection, StudentsSection } from '../components/InfoSections';
import {
  AnnouncementSection,
  ResourcesSection,
  DonateSection
} from '../components/ActivitySections';
import { TranslationContent } from '../types';

interface PtaHomeProps {
  t: TranslationContent;
}

const PtaHome: React.FC<PtaHomeProps> = ({ t }) => {
  return (
    <>
      <Hero t={t} />

      {/* Info & Core Sections */}
      <AboutSection t={t} />
      <AnnouncementSection t={t} />

      {/* Role Based Information */}
      <ParentsSection t={t} />
      <TeachersSection t={t} />
      <StudentsSection t={t} />

      {/* Family Engagement Section */}
      <section className="py-24 bg-white text-center border-t border-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
              <span className="text-tn-blue font-bold tracking-widest uppercase text-sm mb-2 block">Together We Grow</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t.sections.family.title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">{t.sections.family.content}</p>
          </div>
      </section>

      <ResourcesSection t={t} />
      <DonateSection t={t} />
    </>
  );
};

export default PtaHome;
