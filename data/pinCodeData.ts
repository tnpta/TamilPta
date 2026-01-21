// Tamil Nadu District PIN Code Ranges
// Source: India Post

export interface DistrictPinRange {
  district: string;
  ranges: { start: number; end: number }[];
}

export const districtPinRanges: DistrictPinRange[] = [
  { district: 'Ariyalur', ranges: [{ start: 621701, end: 621799 }, { start: 612601, end: 612699 }] },
  { district: 'Chengalpattu', ranges: [{ start: 603001, end: 603399 }, { start: 600301, end: 600399 }] },
  { district: 'Chennai', ranges: [{ start: 600001, end: 600130 }] },
  { district: 'Coimbatore', ranges: [{ start: 641001, end: 641699 }, { start: 642001, end: 642199 }] },
  { district: 'Cuddalore', ranges: [{ start: 607001, end: 607499 }, { start: 608001, end: 608399 }] },
  { district: 'Dharmapuri', ranges: [{ start: 636001, end: 636499 }] },
  { district: 'Dindigul', ranges: [{ start: 624001, end: 624699 }] },
  { district: 'Erode', ranges: [{ start: 638001, end: 638499 }, { start: 637001, end: 637599 }] },
  { district: 'Kallakurichi', ranges: [{ start: 606201, end: 606299 }, { start: 606101, end: 606199 }] },
  { district: 'Kancheepuram', ranges: [{ start: 631001, end: 631699 }, { start: 602001, end: 602199 }] },
  { district: 'Kanniyakumari', ranges: [{ start: 629001, end: 629899 }] },
  { district: 'Karur', ranges: [{ start: 639001, end: 639199 }] },
  { district: 'Krishnagiri', ranges: [{ start: 635001, end: 635899 }] },
  { district: 'Madurai', ranges: [{ start: 625001, end: 625899 }] },
  { district: 'Mayiladuthurai', ranges: [{ start: 609001, end: 609399 }] },
  { district: 'Nagapattinam', ranges: [{ start: 611001, end: 611199 }, { start: 609401, end: 609599 }] },
  { district: 'Namakkal', ranges: [{ start: 637001, end: 637499 }] },
  { district: 'Nilgiris', ranges: [{ start: 643001, end: 643299 }] },
  { district: 'Perambalur', ranges: [{ start: 621201, end: 621299 }] },
  { district: 'Pudukkottai', ranges: [{ start: 622001, end: 622599 }] },
  { district: 'Ramanathapuram', ranges: [{ start: 623001, end: 623599 }] },
  { district: 'Ranipet', ranges: [{ start: 632401, end: 632599 }, { start: 631501, end: 631599 }] },
  { district: 'Salem', ranges: [{ start: 636001, end: 636999 }] },
  { district: 'Sivagangai', ranges: [{ start: 623501, end: 623899 }, { start: 630001, end: 630399 }] },
  { district: 'Tenkasi', ranges: [{ start: 627801, end: 627899 }, { start: 627101, end: 627199 }] },
  { district: 'Thanjavur', ranges: [{ start: 613001, end: 613799 }, { start: 614001, end: 614299 }] },
  { district: 'Theni', ranges: [{ start: 625501, end: 625599 }, { start: 625201, end: 625299 }] },
  { district: 'Thoothukudi', ranges: [{ start: 628001, end: 628899 }] },
  { district: 'Tiruchirappalli', ranges: [{ start: 620001, end: 620999 }, { start: 621001, end: 621199 }] },
  { district: 'Tirunelveli', ranges: [{ start: 627001, end: 627899 }] },
  { district: 'Tirupathur', ranges: [{ start: 635601, end: 635899 }, { start: 632501, end: 632599 }] },
  { district: 'Tiruppur', ranges: [{ start: 641601, end: 641699 }, { start: 642101, end: 642199 }] },
  { district: 'Tiruvallur', ranges: [{ start: 601001, end: 601299 }, { start: 631201, end: 631299 }] },
  { district: 'Tiruvannamalai', ranges: [{ start: 606601, end: 606999 }, { start: 632301, end: 632399 }] },
  { district: 'Tiruvarur', ranges: [{ start: 610001, end: 610299 }, { start: 612501, end: 612599 }] },
  { district: 'Vellore', ranges: [{ start: 632001, end: 632399 }] },
  { district: 'Viluppuram', ranges: [{ start: 604001, end: 604499 }, { start: 605601, end: 605699 }] },
  { district: 'Virudhunagar', ranges: [{ start: 626001, end: 626299 }, { start: 626101, end: 626199 }] },
];

// Check if a PIN code is valid for Tamil Nadu (starts with 6)
export const isValidTamilNaduPin = (pin: string): boolean => {
  if (pin.length !== 6) return false;
  if (!/^\d{6}$/.test(pin)) return false;
  return pin.startsWith('6');
};

// Get district for a PIN code
export const getDistrictForPin = (pin: string): string | null => {
  if (!isValidTamilNaduPin(pin)) return null;

  const pinNum = parseInt(pin, 10);

  for (const district of districtPinRanges) {
    for (const range of district.ranges) {
      if (pinNum >= range.start && pinNum <= range.end) {
        return district.district;
      }
    }
  }

  return null;
};

// Validate if PIN code matches selected district
export const validatePinForDistrict = (pin: string, district: string): {
  isValid: boolean;
  suggestedDistrict: string | null;
  message: string | null;
} => {
  if (pin.length !== 6) {
    return { isValid: true, suggestedDistrict: null, message: null };
  }

  if (!isValidTamilNaduPin(pin)) {
    return {
      isValid: false,
      suggestedDistrict: null,
      message: 'PIN code must start with 6 for Tamil Nadu'
    };
  }

  const detectedDistrict = getDistrictForPin(pin);

  if (!detectedDistrict) {
    // PIN is valid format but not in our database - allow it
    return { isValid: true, suggestedDistrict: null, message: null };
  }

  if (district && detectedDistrict.toLowerCase() !== district.toLowerCase()) {
    return {
      isValid: false,
      suggestedDistrict: detectedDistrict,
      message: `This PIN code belongs to ${detectedDistrict}`
    };
  }

  return { isValid: true, suggestedDistrict: null, message: null };
};
