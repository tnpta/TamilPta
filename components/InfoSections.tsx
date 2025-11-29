import React from 'react';
import { TranslationContent } from '../types';
import { Users, GraduationCap, School, CheckCircle, Target, Eye, Rocket, BookOpen, Award, MessageCircle, Calendar, TrendingUp, Shield } from 'lucide-react';

interface InfoProps {
  t: TranslationContent;
}

export const AboutSection: React.FC<InfoProps> = ({ t }) => {
  return (
    <section id="about" className="py-12 md:py-20 lg:py-28 bg-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] hidden md:block">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007236' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-4 py-2 bg-tn-green/10 text-tn-green rounded-full font-semibold text-sm mb-4">
            {t.nav.about}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            {t.sections.about.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.sections.about.content}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-tn-green to-tn-blue p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Eye size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{t.sections.about.visionTitle}</h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                "{t.sections.about.vision}"
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-tn-orange/10 rounded-xl md:rounded-2xl flex items-center justify-center">
                <Rocket size={24} className="text-tn-orange md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t.sections.about.missionTitle}</h3>
            </div>
            <ul className="space-y-3 md:space-y-4">
              {t.sections.about.missionPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="w-5 h-5 md:w-6 md:h-6 bg-tn-green/10 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-tn-green group-hover:text-white transition-colors">
                    <CheckCircle size={12} className="text-tn-green group-hover:text-white md:w-3.5 md:h-3.5" />
                  </span>
                  <span className="text-sm md:text-base text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

interface RoleSectionProps {
  id: string;
  title: string;
  intro: string;
  features: { title: string; desc: string }[];
  color: 'blue' | 'green' | 'orange';
  icon: React.ElementType;
  imageUrl: string;
}

const featureIcons = [BookOpen, Award, MessageCircle, Calendar, TrendingUp, Shield];

const RoleSection: React.FC<RoleSectionProps> = ({ id, title, intro, features, color, icon: Icon, imageUrl }) => {
  const themes = {
    blue: {
      gradient: 'from-tn-blue to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-tn-blue',
      border: 'border-blue-200',
      light: 'bg-blue-100',
      sectionBg: 'bg-gradient-to-b from-blue-50/50 to-white'
    },
    green: {
      gradient: 'from-tn-green to-green-600',
      bg: 'bg-green-50',
      text: 'text-tn-green',
      border: 'border-green-200',
      light: 'bg-green-100',
      sectionBg: 'bg-gradient-to-b from-green-50/50 to-white'
    },
    orange: {
      gradient: 'from-tn-orange to-orange-600',
      bg: 'bg-orange-50',
      text: 'text-tn-orange',
      border: 'border-orange-200',
      light: 'bg-orange-100',
      sectionBg: 'bg-gradient-to-b from-orange-50/50 to-white'
    }
  };

  const theme = themes[color];

  return (
    <section id={id} className={`py-12 md:py-20 lg:py-28 ${theme.sectionBg}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Content Side */}
          <div className={id === 'teachers' ? 'lg:order-2' : ''}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme.bg} rounded-full mb-4 md:mb-6`}>
              <Icon size={18} className={`${theme.text} md:w-5 md:h-5`} />
              <span className={`font-semibold text-sm ${theme.text}`}>{title}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {title}
            </h2>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-10 leading-relaxed">
              {intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, idx) => {
                const FeatureIcon = featureIcons[idx % featureIcons.length];
                return (
                  <div
                    key={idx}
                    className="bg-white p-4 md:p-5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-transparent transition-all duration-300 group"
                  >
                    <div className={`w-9 h-9 md:w-10 md:h-10 ${theme.light} rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                      <FeatureIcon size={18} className={theme.text} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Side */}
          <div className={`relative mt-8 lg:mt-0 ${id === 'teachers' ? 'lg:order-1' : ''}`}>
            <div className={`absolute -inset-4 bg-gradient-to-r ${theme.gradient} rounded-3xl opacity-20 blur-2xl hidden md:block`}></div>
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl"
              />
              {/* Floating Stats Card */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100">
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${theme.gradient} rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3`}>
                  <Icon size={20} className="text-white md:w-6 md:h-6" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {id === 'parents' ? '1M+' : id === 'teachers' ? '50K+' : '2M+'}
                </p>
                <p className="text-xs md:text-sm text-gray-500">{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ParentsSection: React.FC<InfoProps> = ({ t }) => (
  <RoleSection
    id="parents"
    title={t.sections.parents.title}
    intro={t.sections.parents.intro}
    features={t.sections.parents.features}
    color="blue"
    icon={Users}
    imageUrl="/assets/images/parents.jpg"
  />
);

export const TeachersSection: React.FC<InfoProps> = ({ t }) => (
  <RoleSection
    id="teachers"
    title={t.sections.teachers.title}
    intro={t.sections.teachers.intro}
    features={t.sections.teachers.features}
    color="green"
    icon={GraduationCap}
    imageUrl="/assets/images/teacher.avif"
  />
);

export const StudentsSection: React.FC<InfoProps> = ({ t }) => (
  <RoleSection
    id="students"
    title={t.sections.students.title}
    intro={t.sections.students.intro}
    features={t.sections.students.features}
    color="orange"
    icon={School}
    imageUrl="/assets/images/01.jpg"
  />
);