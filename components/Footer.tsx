import React from 'react';
import { TranslationContent } from '../types';
import { Mail, MapPin, Phone, Facebook, Youtube, Twitter, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  t: TranslationContent;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.parents, href: '#parents' },
    { name: t.nav.teachers, href: '#teachers' },
    { name: t.nav.students, href: '#students' },
    { name: t.sections.announcements.title, href: '#announcements' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tn-green via-tn-blue to-tn-orange"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Tamil PTA Logo"
                className="h-16 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">Tamil PTA</span>
                <span className="text-xs text-gray-400">Parent Teachers Association</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.sections.about.content.substring(0, 150)}...
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 group">
                <Facebook size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 group">
                <Youtube size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-all hover:scale-110 group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all hover:scale-110 group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-green"></span>
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 hover:text-tn-green transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-tn-green transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-orange"></span>
              {t.footer.resources}
            </h3>
            <ul className="space-y-3">
              {t.footer.resourceItems.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-tn-orange transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-tn-orange transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-blue"></span>
              {t.sections.contact.title}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <MapPin size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <span className="text-gray-400 text-sm">{t.sections.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <Phone size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">+91-44-2827 8068</span>
                  <span className="text-gray-500 text-xs">{t.sections.contact.helpline}</span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <Mail size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <span className="text-gray-400 text-sm">{t.sections.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex justify-center items-center">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-tn-green text-white rounded-full shadow-lg flex items-center justify-center hover:bg-tn-blue transition-all hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;