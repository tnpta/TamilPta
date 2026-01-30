export type Language = 'en' | 'ta';

export interface AnnouncementItem {
  date: string;
  title: string;
  desc: string;
  tag: string;
}

export interface RegistrationTranslations {
  pageTitle: string;
  pageSubtitle: string;
  formTitle: string;
  selectSchool: {
    district: string;
    block: string;
    school: string;
    selectDistrict: string;
    selectBlock: string;
    selectSchool: string;
    selectedSchool: string;
    proceed: string;
  };
  steps: {
    basicInfo: string;
    trustManagement: string;
    staffStudents: string;
    infrastructure: string;
    feesOthers: string;
  };
  buttons: {
    previous: string;
    next: string;
    submit: string;
  };
  success: {
    title: string;
    message: string;
    referenceLabel: string;
    saveMessage: string;
    backHome: string;
  };
  basicInfo: {
    title: string;
    schoolCode: string;
    schoolName: string;
    address: string;
    taluk: string;
    localBody: string;
    pinCode: string;
    schoolContact: string;
    mobile: string;
    whatsapp: string;
    email: string;
    schoolType: string;
    correspondentDetails: string;
    principalDetails: string;
    title_label: string;
    name: string;
    select: string;
  };
  trustManagement: {
    title: string;
    trustInfo: string;
    trustName: string;
    trustAddress: string;
    orgType: string;
    selectType: string;
    trust: string;
    society: string;
    company: string;
    dateOfReg: string;
    regNumber: string;
    renewalDetails: string;
    chairmanDetails: string;
    secretaryDetails: string;
    establishmentDetails: string;
    yearOfEstablishment: string;
    classesAtEstablishment: string;
    openingOrderNo: string;
    rcNo: string;
    date: string;
    additionalClasses: string;
    latestRenewal: string;
    firstBoardExam10: string;
    firstBoardExam12: string;
    classesFunctioningFrom: string;
    classesFunctioningTo: string;
    ptaDetails: string;
    ptaFormed: string;
    ptaAffiliation: string;
    ptaPresident: string;
    ptaSecretary: string;
    ptaTreasurer: string;
    contactNo: string;
    yes: string;
    no: string;
  };
  staffStudents: {
    title: string;
    teachingStaff: string;
    supportingStaff: string;
    nonTeachingStaff: string;
    classWiseStrength: string;
    emisNote: string;
    pg: string;
    ug: string;
    sgt: string;
    bed: string;
    med: string;
    tetQualifiedBed: string;
    tetQualifiedMed: string;
    tetOnly: string;
    officeStaff: string;
    accountants: string;
    library: string;
    others: string;
    oa: string;
    driverHelper: string;
    watchman: string;
    aaya: string;
    sweepers: string;
    class: string;
    boys: string;
    girls: string;
    rte: string;
  };
  infrastructure: {
    title: string;
    locationLand: string;
    locationType: string;
    selectLocationType: string;
    greaterChennai: string;
    corporation: string;
    districtHQ: string;
    municipality: string;
    townPanchayat: string;
    villagePanchayat: string;
    totalLandSqft: string;
    totalLandGround: string;
    totalLandAcres: string;
    sufficientLand: string;
    ifNoDetails: string;
    landContiguous: string;
    distanceBetween: string;
    htLinesOrCanal: string;
    saveLocation: string;
    landOwnership: string;
    inNameOfTrust: string;
    inNameOfSociety: string;
    inNameOfCompany: string;
    acquiredByLease: string;
    leaseYears: string;
    buildingDetails: string;
    numberOfBuildings: string;
    block: string;
    yearOfConstruction: string;
    numberOfFloors: string;
    floor: string;
    buildingPlanApproved: string;
    approvalDetails: string;
    floorApproved: string;
    floorApprovalDetails: string;
    unapprovedSteps: string;
    feePaid: string;
    dateOfRemittance: string;
    infraFacilities: string;
    adequateClassrooms: string;
    classroomSize: string;
    toiletsBoys: string;
    toiletsGirls: string;
    drinkingWaterTaps: string;
    handWashTaps: string;
    separateToilets: string;
    youtubeLink: string;
    liftOrRamps: string;
    rampAtEntry: string;
    cwsnToilets: string;
    mandatoryCertificates: string;
    buildingStability: string;
    buildingLicense: string;
    fireNoc: string;
    sanitaryCert: string;
    certificateNo: string;
    certificateIssuedBy: string;
    engineerClass: string;
    dateAuthority: string;
    personsAccommodated: string;
  };
  feesOthers: {
    title: string;
    feesFixation: string;
    feesFixationOrder: string;
    ptaConsulted: string;
    ptaConsultationDetails: string;
    schoolVehicles: string;
    numberOfVans: string;
    numberOfBuses: string;
    otherVehicles: string;
    otherDetails: string;
    healthCare: string;
    healthCareDetails: string;
    socialAwareness: string;
    socialAwarenessDetails: string;
    socialServices: string;
    socialServicesDetails: string;
    salaryECS: string;
    declaration: string;
    declarationText: string;
  };
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
    registerSchool: string;
  };
  registration: RegistrationTranslations;
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