export type Language = 'en' | 'ta';

export interface AnnouncementItem {
  date: string;
  title: string;
  desc: string;
  tag: string;
}

export interface TranslationContent {
  title: string;
  tagline: string;
  intro: string;
  buttons: {
    announcements: string;
    activities: string;
    donate: string;
  };
  nav: {
    home: string;
    about: string;
    parents: string;
    teachers: string;
    students: string;
    contact: string;
  };
  sections: {
    about: {
      title: string;
      content: string;
      visionTitle: string;
      vision: string;
      missionTitle: string;
      missionPoints: string[];
    };
    parents: {
      title: string;
      intro: string;
      features: { title: string; desc: string }[];
    };
    teachers: {
      title: string;
      intro: string;
      features: { title: string; desc: string }[];
    };
    students: {
      title: string;
      intro: string;
      features: { title: string; desc: string }[];
    };
    announcements: {
      title: string;
      subtitle: string;
      viewAll: string;
      downloadPdf: string;
      items: AnnouncementItem[];
    };
    resources: {
      title: string;
      subtitle: string;
      items: string[];
    };
    family: {
      title: string;
      content: string;
    };
    donate: {
      title: string;
      content: string;
      learnMore: string;
      securePayment: string;
      taxDeductible: string;
      transparent: string;
    };
    contact: {
      title: string;
      address: string;
      email: string;
      helpline: string;
    };
  };
  footer: {
    quickLinks: string;
    resources: string;
    resourceItems: string[];
    madeWith: string;
    forTamilNadu: string;
    copyright: string;
  };
}