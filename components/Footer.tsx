import React from 'react';
import { Link } from 'react-router-dom';
import { TranslationContent } from '../types';
import { Mail, MapPin, Phone, Facebook, Youtube, Twitter, Instagram, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  t: TranslationContent;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const language = t.nav.home === 'Home' ? 'en' : 'ta';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: language === 'en' ? 'Home' : 'முகப்பு', href: '/' },
    { name: language === 'en' ? 'Register School' : 'பள்ளி பதிவு', href: '/' },
    { name: language === 'en' ? 'About Us' : 'எங்களை பற்றி', href: '/pta-home#about' },
    { name: language === 'en' ? 'Contact' : 'தொடர்பு', href: '/pta-home#contact' },
  ];

  const importantLinks = [
    { name: language === 'en' ? 'Tamil Nadu Government' : 'தமிழ்நாடு அரசு', href: 'https://www.tn.gov.in/' },
    { name: language === 'en' ? 'School Education Department' : 'பள்ளிக் கல்வித் துறை', href: 'https://www.tnschools.gov.in/' },
    { name: language === 'en' ? 'EMIS Portal' : 'EMIS போர்டல்', href: 'https://emis.tnschools.gov.in/' },
    { name: language === 'en' ? 'TNPSC' : 'TNPSC', href: 'https://www.tnpsc.gov.in/' },
    { name: language === 'en' ? 'Right to Education' : 'கல்வி உரிமை', href: 'https://dsel.education.gov.in/rte' },
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
                alt="Department of School Education Logo"
                className="h-16 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-tight">
                  {language === 'en' ? 'Department of School Education' : 'பள்ளிக் கல்வித் துறை'}
                </span>
                <span className="text-xs text-gray-400">
                  {language === 'en' ? 'Government of Tamil Nadu' : 'தமிழ்நாடு அரசு'}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {language === 'en'
                ? 'Committed to providing quality education to all children in Tamil Nadu. Building a brighter future through inclusive and accessible education.'
                : 'தமிழ்நாட்டில் அனைத்து குழந்தைகளுக்கும் தரமான கல்வியை வழங்குவதில் அர்ப்பணிப்புடன் செயல்படுகிறோம். உள்ளடக்கிய மற்றும் அணுகக்கூடிய கல்வி மூலம் ஒளிமயமான எதிர்காலத்தை உருவாக்குகிறோம்.'}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/TNaborSchoolEducation" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 group">
                <Facebook size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/@schoolabortn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 group">
                <Youtube size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://twitter.com/aboraborTN" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-all hover:scale-110 group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white" />
              </a>
              <a href="https://www.instagram.com/aborabortn/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 transition-all hover:scale-110 group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-green"></span>
              {language === 'en' ? 'Quick Links' : 'விரைவு இணைப்புகள்'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-gray-400 hover:text-tn-green transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-tn-green transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-orange"></span>
              {language === 'en' ? 'Important Links' : 'முக்கிய இணைப்புகள்'}
            </h3>
            <ul className="space-y-3">
              {importantLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-tn-orange transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-tn-orange transition-all"></span>
                    {link.name}
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-tn-blue"></span>
              {language === 'en' ? 'Contact Us' : 'தொடர்பு கொள்ளவும்'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <MapPin size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <span className="text-gray-400 text-sm">
                  {language === 'en'
                    ? 'DPI Campus, College Road, Chennai - 600006'
                    : 'DPI வளாகம், கல்லூரி சாலை, சென்னை - 600006'}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <Phone size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">14417</span>
                  <span className="text-gray-500 text-xs">
                    {language === 'en' ? 'Education Helpline' : 'கல்வி உதவி எண்'}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-tn-green transition-colors">
                  <Mail size={18} className="text-tn-green group-hover:text-white" />
                </div>
                <span className="text-gray-400 text-sm">tnsedpta2025@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} {language === 'en'
              ? 'Department of School Education, Government of Tamil Nadu. All rights reserved.'
              : 'பள்ளிக் கல்வித் துறை, தமிழ்நாடு அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400">{language === 'en' ? 'Privacy Policy' : 'தனியுரிமை கொள்கை'}</a>
            <a href="#" className="hover:text-gray-400">{language === 'en' ? 'Terms of Use' : 'பயன்பாட்டு விதிமுறைகள்'}</a>
            <a href="#" className="hover:text-gray-400">{language === 'en' ? 'Disclaimer' : 'மறுப்பு'}</a>
          </div>
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
