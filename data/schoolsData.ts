// Schools data extracted from schools.pdf
// Structure: District -> Blocks -> Schools

export interface School {
  id: number;
  name: string;
}

export interface Block {
  name: string;
  schools: School[];
}

export interface District {
  name: string;
  blocks: Block[];
}

export const schoolsData: District[] = [
  {
    name: "ARIYALUR",
    blocks: [
      { name: "Andimadam", schools: [{ id: 1, name: "GHSS VILANDAI ANDIMADAM" }] },
      { name: "Ariyalur", schools: [{ id: 2, name: "GHSS ARIYALUR" }] },
      { name: "Jayankondam", schools: [{ id: 3, name: "GMHSS JAYANKONDAM" }] },
      { name: "T.Palur", schools: [{ id: 4, name: "GHSS T.PALUR" }] }
    ]
  },
  {
    name: "CHENGALPATTU",
    blocks: [
      { name: "Kattankolathur", schools: [
        { id: 5, name: "GGHSS, CHENGALPATTU" },
        { id: 6, name: "GBHSS NANDHIVARAM" }
      ]},
      { name: "Lathur", schools: [
        { id: 7, name: "GGHSS CHEYYUR" },
        { id: 8, name: "GHSS KOOVZTHUR" }
      ]},
      { name: "Madurantagam", schools: [
        { id: 9, name: "H.S.S.G.G.H.S.S.Madhuranthakam" },
        { id: 10, name: "GHSS KARUNKUZHI" }
      ]},
      { name: "St.Thomas Mount", schools: [{ id: 11, name: "MMA GHSS PALLAVARAM" }] },
      { name: "Thiruporur", schools: [
        { id: 12, name: "GBHSS THIRUPORUR" },
        { id: 13, name: "GHSS KELAMBAKKAM" }
      ]}
    ]
  },
  {
    name: "CHENNAI (EXT. GCC)",
    blocks: [
      { name: "Adyar", schools: [{ id: 14, name: "GHSS PERUNGUDI" }] },
      { name: "Anna Nagar", schools: [{ id: 15, name: "GOVERNMENT MODEL HIGHER SECONDARY SCHOOL" }] },
      { name: "Kodambakkam", schools: [{ id: 16, name: "GHSS MGR NAGAR" }] },
      { name: "Royapuram South", schools: [{ id: 17, name: "Govt. Muslim Higher Secondary School" }] },
      { name: "Teynampet", schools: [{ id: 18, name: "GMHSS, TRIPLICANE CHENNAI-05" }] },
      { name: "Thiru Vi Ka Nagar", schools: [{ id: 19, name: "GMHSS GKM COLONY" }] },
      { name: "Thiruvotriyur", schools: [{ id: 20, name: "JGGGHSS THIRUVOTRIYUR (JEYAGOPAL GARODIYA)" }] },
      { name: "Tondiarpet", schools: [{ id: 21, name: "GHSS MKB NAGAR" }] }
    ]
  },
  {
    name: "COIMBATORE",
    blocks: [
      { name: "Coimbatore city", schools: [
        { id: 22, name: "CCMA GGHSS RAJA STREET COIMBATORE" },
        { id: 23, name: "CHSS RS Puram" }
      ]},
      { name: "Karamadai", schools: [{ id: 24, name: "GHSS METTUPALAYAM" }] },
      { name: "Kinathukkadavu", schools: [{ id: 25, name: "GHSS KINATHUKADAVU" }] },
      { name: "Periyanaickan Palayam", schools: [{ id: 26, name: "GHSS(MODEL) ASOKAPURAM" }] },
      { name: "Pollachi south", schools: [
        { id: 27, name: "MUNICIPAL (B)HSS POLLACHI" },
        { id: 28, name: "MPL Girls HSS" }
      ]},
      { name: "Sarkar Samakkulam", schools: [{ id: 29, name: "GHSS SS KULAM" }] },
      { name: "Sulur", schools: [
        { id: 30, name: "GGHSS SULUR" },
        { id: 31, name: "GBHSS Sulur" }
      ]},
      { name: "Thondamuthur", schools: [
        { id: 32, name: "GBHSS THONDAMUTHUR" },
        { id: 33, name: "GGHSS Thondamuthur" }
      ]},
      { name: "Valparai", schools: [{ id: 34, name: "GHSS VALPARAI" }] }
    ]
  },
  {
    name: "CUDDALORE",
    blocks: [
      { name: "Bhuvanagiri", schools: [
        { id: 35, name: "GBHSS BHUVANAGIRI" },
        { id: 36, name: "GMGHSS, Bhuvanagiri" }
      ]},
      { name: "Cuddalore", schools: [{ id: 37, name: "GHSS VANDIPALAYAM" }] },
      { name: "Kattumannarkoil", schools: [
        { id: 38, name: "GBHSS KATTUMANARKOIL" },
        { id: 39, name: "GGHSS, Kattumannarkoil" }
      ]},
      { name: "Kumaratchi", schools: [
        { id: 40, name: "GGHSS CHIDAMBARAM" },
        { id: 41, name: "ADW Nanthanar Boys School, Chidambaram" }
      ]},
      { name: "Kurinjipadi", schools: [
        { id: 42, name: "GHSS, Kullanchavadi" },
        { id: 43, name: "GGHSS KURINJIPADI" }
      ]},
      { name: "Mangalore", schools: [{ id: 44, name: "GMHSS, M. Podaiyur" }] },
      { name: "Panruti", schools: [{ id: 45, name: "GHSS PANRUTI" }] },
      { name: "Virudhachalam", schools: [
        { id: 46, name: "GMGHSS, Virudhachalam" },
        { id: 47, name: "GBHSS VIRUDHACHALAM" }
      ]}
    ]
  },
  {
    name: "DHARMAPURI",
    blocks: [
      { name: "Dharmapuri", schools: [
        { id: 48, name: "AVVAIYAR GGHSS DHARMAPURI" },
        { id: 49, name: "Adhiyaman GBHSS, Dharmapuri" }
      ]},
      { name: "Harur", schools: [
        { id: 50, name: "GBHSS HARUR" },
        { id: 51, name: "GGHSS, Harur" }
      ]},
      { name: "Palacode", schools: [
        { id: 52, name: "GBHSS PALACODU" },
        { id: 53, name: "GGHSS, Palacode" }
      ]},
      { name: "Pappireddipatti", schools: [
        { id: 54, name: "GBHSS PAPPIREDDYPATTI" },
        { id: 55, name: "GGHSS, Pappireddipatti" }
      ]},
      { name: "Pennagaram", schools: [
        { id: 56, name: "GGHSS PENNAGARAM" },
        { id: 57, name: "GBHSS, Pennagaram" }
      ]}
    ]
  },
  {
    name: "DINDIGUL",
    blocks: [
      { name: "Athoor", schools: [{ id: 58, name: "GHSS, N.PANJAMPATTI" }] },
      { name: "DINDIGUL", schools: [{ id: 59, name: "GHSS PALANI ROAD - DINDIGUL" }] },
      { name: "Natham", schools: [
        { id: 60, name: "Duraikamalam GMHSS Naththam" },
        { id: 61, name: "GGHSS, Natham" }
      ]},
      { name: "Nilakottai", schools: [{ id: 62, name: "GHSS Nilakkottai" }] },
      { name: "Oddanchathram", schools: [{ id: 63, name: "KRGMHSS Oddanchatram" }] },
      { name: "Palani - Rural", schools: [
        { id: 64, name: "Municipal Boys HSS, Palani" },
        { id: 67, name: "GGHSS Palani" }
      ]},
      { name: "Vedasandur", schools: [
        { id: 65, name: "GBHSS VEDASANDUR" },
        { id: 66, name: "GGHSS, Vedasandur" }
      ]}
    ]
  },
  {
    name: "ERODE",
    blocks: [
      { name: "Anthiyur", schools: [
        { id: 68, name: "GGHSS ANTHIYUR" },
        { id: 69, name: "GBHSS, ANTHIYUR" }
      ]},
      { name: "Bhavani", schools: [
        { id: 70, name: "GGHSS BHAVANI CENTRE 1" },
        { id: 71, name: "GBHSS, BHAVANI" }
      ]},
      { name: "Bhavani sagar", schools: [
        { id: 72, name: "KOM GGHSS P.PULIYAMPATTI" },
        { id: 73, name: "KVK GBHSS, P.PULIAMPATTI" }
      ]},
      { name: "Erode", schools: [
        { id: 74, name: "GHSS (MODEL) ERODE(GTS)" },
        { id: 75, name: "CHSS, RAILWAY COLONY" }
      ]},
      { name: "Gobi", schools: [
        { id: 76, name: "MUNICIPAL BOYS HSS GOBICHETTIPALAYAM" },
        { id: 77, name: "MGHSS, GOBI" }
      ]},
      { name: "Modakurichi", schools: [
        { id: 78, name: "GBHSS, MODAKKURICHI" },
        { id: 79, name: "GGHSS MODAKKURICHI CENTRE 1" }
      ]},
      { name: "Nambiyur", schools: [
        { id: 80, name: "GBHSS NAMBIYUR" },
        { id: 81, name: "GGHSS, NAMBIYUR" }
      ]},
      { name: "Perundurai", schools: [
        { id: 82, name: "GBHSS PERUNDURAI" },
        { id: 83, name: "GGHSS, PERUNDURAI" }
      ]}
    ]
  },
  {
    name: "KALLAKURICHI",
    blocks: [
      { name: "Kallakurichi", schools: [
        { id: 84, name: "GMGHSS KALLAKURICHI" },
        { id: 85, name: "GBHSS KALLAKURICHI" }
      ]},
      { name: "Rishivanthiyam", schools: [{ id: 86, name: "GHSS ARIYALUR" }] },
      { name: "Sankarapuram", schools: [
        { id: 87, name: "GBHSS SANKARAPURAM" },
        { id: 88, name: "GGHSS - DEVAPANDALAM" }
      ]},
      { name: "Thirukoilur", schools: [
        { id: 89, name: "GGHSS THIRUKOILUR" },
        { id: 90, name: "GBHSS THIRUKOILUR" }
      ]},
      { name: "Ulundurpet", schools: [
        { id: 91, name: "GGHSS ULUNTHURPET" },
        { id: 92, name: "GBHSS ULUNTHURPET" }
      ]}
    ]
  },
  {
    name: "KANCHEEPURAM",
    blocks: [
      { name: "Kancheepuram", schools: [
        { id: 93, name: "GHSS(GIRLS) BIG KANCHIPURAM" },
        { id: 94, name: "GOVT CMS BOYS HR SEC SCHOOL,KANCHEEPURAM" }
      ]},
      { name: "Kundrathur", schools: [
        { id: 95, name: "GGHSS KUNDRATHUR" },
        { id: 96, name: "GOVT BOYS HR SEC SCHOOL,KUNDRATHUR" }
      ]},
      { name: "Sriperumbudur", schools: [
        { id: 97, name: "GGHSS SRIPERUMPUDUR" },
        { id: 98, name: "J J GOVT BOYS HR SEC SCHOOL, SRIPERUMBUDUR" }
      ]},
      { name: "Uthiramerur", schools: [{ id: 99, name: "GHSS THIRUPULIVANAM" }] },
      { name: "Walajabad", schools: [
        { id: 100, name: "GGHSS WALAJABAD" },
        { id: 101, name: "GOVT BOYS HR SEC SCHOOL, VALAJABAD" }
      ]}
    ]
  },
  {
    name: "KANNIYAKUMARI",
    blocks: [
      { name: "Agastheeswaram", schools: [{ id: 102, name: "SLB GHSS NAGARKOIL" }] },
      { name: "Killiyoor", schools: [{ id: 103, name: "GHSS KARUNGAL" }] },
      { name: "Kurunthancode", schools: [{ id: 104, name: "GHSS AMMANDIVILAI" }] },
      { name: "Melpuram", schools: [{ id: 105, name: "GBHSS MARTHANDAM" }] },
      { name: "Thuckalay", schools: [{ id: 106, name: "GMHSS THUCKALAY" }] }
    ]
  },
  {
    name: "KARUR",
    blocks: [
      { name: "Aravakurichi", schools: [{ id: 107, name: "GHSS MALAIKOILUR" }] },
      { name: "Karur", schools: [
        { id: 108, name: "MUNICIPAL(B) HSS KARUR" },
        { id: 109, name: "PMGHSS - Karur" }
      ]},
      { name: "Krishnarayapuram", schools: [{ id: 110, name: "GHSS KRISHNARAYAPURAM" }] },
      { name: "Kulithalai", schools: [
        { id: 111, name: "GGHSS KULITHALAI" },
        { id: 112, name: "GBHSS-Kulithalai" }
      ]}
    ]
  },
  {
    name: "KRISHNAGIRI",
    blocks: [
      { name: "Bargur", schools: [
        { id: 113, name: "GGHSS BARGUR" },
        { id: 114, name: "GBHHS Bargur" }
      ]},
      { name: "Hosur", schools: [
        { id: 115, name: "GGHSS HOSUR" },
        { id: 116, name: "RV Boys GHSS" }
      ]},
      { name: "Krishnagiri", schools: [
        { id: 117, name: "GGHSS KRISHNAGIRI" },
        { id: 118, name: "GBHSS KRISHNAGIRI" }
      ]},
      { name: "THALLY", schools: [{ id: 119, name: "GHSS ANCHETTY" }] },
      { name: "Kelamangalam", schools: [
        { id: 120, name: "GGHSS DENKANIKOTTAI" },
        { id: 121, name: "GBHSS DENKANIKOTTAI" }
      ]},
      { name: "Uthangarai", schools: [
        { id: 122, name: "GGHSS UTHANGARAI" },
        { id: 123, name: "GBHSS UTHANGARAI" }
      ]},
      { name: "Veppanapalli", schools: [
        { id: 124, name: "GGHSS, Veppanapalli" },
        { id: 125, name: "GBHSS, Veppanapalli" }
      ]}
    ]
  },
  {
    name: "MADURAI",
    blocks: [
      { name: "Madurai East", schools: [{ id: 126, name: "GMGHSS Y OTHAKADAI" }] },
      { name: "Madurai North", schools: [{ id: 127, name: "GGHSS,MAHABOOBPALAYAM, MDU-16" }] },
      { name: "Madurai South", schools: [{ id: 128, name: "CORP EVRN GIRLS HSS, SOUTH VELI STREET" }] },
      { name: "Madurai West", schools: [{ id: 129, name: "Corporation Pandiyan Nedunchelian HSS" }] },
      { name: "Melur", schools: [
        { id: 130, name: "G(G)HSS, MELUR" },
        { id: 131, name: "Government Higher Secondary School,Thiruvathavur" }
      ]},
      { name: "T.vadipatti", schools: [
        { id: 132, name: "GOVT BOYS HR SEC SCHOOL, T.VADIPATTI" },
        { id: 133, name: "Government Girls Higher Secondary School,Sholavandan" }
      ]},
      { name: "Thirumangalam", schools: [{ id: 134, name: "GHSS THIRUMANGALAM" }] },
      { name: "Usilampatti", schools: [{ id: 135, name: "GHSS USILAMPATTI" }] },
      { name: "Thiruparamkundram", schools: [{ id: 136, name: "NAVALAR SOMASUNDRA BHARATHIYAR CGHSS PAZHANGANATHAM" }] }
    ]
  },
  {
    name: "MAYILADUTHURAI",
    blocks: [
      { name: "Mayiladudurai", schools: [{ id: 137, name: "KITTAPPA MUNICIPAL HSS" }] },
      { name: "Sembanarkoil", schools: [{ id: 138, name: "GHSS, Akkur" }] },
      { name: "Sirkali", schools: [{ id: 139, name: "GHSS VAITHEESHWARANKOIL" }] },
      { name: "Kuttalam", schools: [{ id: 140, name: "GOVT MODEL HR. SEC. SCHOOL, KUTTALAM" }] }
    ]
  },
  {
    name: "NAGAPATTINAM",
    blocks: [
      { name: "Kelvelur", schools: [{ id: 141, name: "GHSS KURUKATHI" }] },
      { name: "Nagapattinam", schools: [
        { id: 142, name: "MGHSS NAGAPATTINAM" },
        { id: 143, name: "GHSS-SIKKAL" }
      ]},
      { name: "Thalainayar", schools: [{ id: 144, name: "VGHSS MANAKKUDI" }] },
      { name: "Vedaranyam", schools: [
        { id: 145, name: "GGHSS AYAKKARANPULAM - 3" },
        { id: 146, name: "SKS GHSS VEDARANYAM" }
      ]},
      { name: "Thirumarugal", schools: [{ id: 147, name: "GHSS THIRUMARUGAL" }] }
    ]
  },
  {
    name: "NAMAKKAL",
    blocks: [
      { name: "Namakkal", schools: [
        { id: 148, name: "GGHSS NAMAKKAL" },
        { id: 149, name: "GHSS NAMAKKAL south" }
      ]},
      { name: "Pallipalayam", schools: [
        { id: 150, name: "GBHSS KUMARAPALAYAM" },
        { id: 151, name: "GGHSS Kumarapalayam" }
      ]},
      { name: "Paramathi", schools: [
        { id: 152, name: "GBHSS PARAMATHI" },
        { id: 153, name: "GGHSS Paramathi" }
      ]},
      { name: "Rasipuram", schools: [{ id: 154, name: "GHSS ANNASALAI RASIPURAM" }] },
      { name: "Sendamangalam", schools: [
        { id: 155, name: "GGHSS SENDAMANGALAM" },
        { id: 156, name: "GBHSS Sendamangalam" }
      ]},
      { name: "Tiruchengode", schools: [
        { id: 157, name: "GGHSS TIRUCHENGODE" },
        { id: 158, name: "GBHSS Tiruchengode" }
      ]}
    ]
  },
  {
    name: "PERAMBALUR",
    blocks: [
      { name: "Alathur", schools: [{ id: 159, name: "GHSS MODEL PADALUR" }] },
      { name: "Perambalur", schools: [{ id: 160, name: "GHSS PERAMBALUR" }] },
      { name: "Veppanthattai", schools: [{ id: 161, name: "GHSS, Veppanthattai" }] },
      { name: "Veppur", schools: [
        { id: 162, name: "GGHSS, KUNNAM" },
        { id: 163, name: "GHSS, Veppur" }
      ]}
    ]
  },
  {
    name: "PUDUKKOTTAI",
    blocks: [
      { name: "Aranthangi", schools: [
        { id: 164, name: "GGHSS, ARANTHANGI" },
        { id: 165, name: "GOVERNMENT MODEL HIGHER SECONDARY SCHOOL, ARANTHANGI" }
      ]},
      { name: "Gandarvakkottai", schools: [
        { id: 166, name: "GBHSS GANDARAVAKOTTAI" },
        { id: 167, name: "GOVERNMENT GIRLS HR SEC SCHOOL, GANDARVAKKOTTAI" }
      ]},
      { name: "Pudukkottai", schools: [
        { id: 168, name: "Ranees GGHSS, Pudukkottai" },
        { id: 169, name: "SRI BRAGATHANBAL GOVT HR SEC SCHOOL, PUDUKKOTTAI" }
      ]},
      { name: "Thirumayam", schools: [
        { id: 170, name: "GBHSS,THIRUMAYAM" },
        { id: 171, name: "GOVT.GIRLS.HR.SEC.SCHOOL, THIRUMAYAM" }
      ]},
      { name: "Thiruvarankulam", schools: [
        { id: 172, name: "GBHSS ALANGUDI" },
        { id: 173, name: "GGHSS ALANGUDI" }
      ]},
      { name: "Viralimalai", schools: [
        { id: 174, name: "GBHSS-VIRALIMALAI" },
        { id: 175, name: "GOVERNMENT GIRLS HIGHER SECONDARY SCHOOL, VIRALIMALAI" }
      ]}
    ]
  },
  {
    name: "RAMANATHAPURAM",
    blocks: [
      { name: "Kadaladi", schools: [
        { id: 176, name: "GBHSS SAYALKUDI" },
        { id: 177, name: "GGHSS SAYALKUDI" }
      ]},
      { name: "Mandapam", schools: [{ id: 178, name: "GHSS, MANDAPAM CAMP" }] },
      { name: "Mudukulathur", schools: [{ id: 179, name: "GHSS MUDUKULATHUR" }] },
      { name: "Paramakudi", schools: [{ id: 180, name: "R.S GBHSS PARAMAKUDI (COMBINED)" }] },
      { name: "Ramanathapuram", schools: [{ id: 181, name: "Municipal (G)HSS, Ramanathapuram" }] },
      { name: "Thiruvadanai", schools: [
        { id: 182, name: "GGHSS, THIRUVADANAI" },
        { id: 183, name: "GBHSS Thiruvadanai" }
      ]}
    ]
  },
  {
    name: "RANIPET",
    blocks: [
      { name: "Arakkonam", schools: [
        { id: 184, name: "GBHSS ARAKKONAM" },
        { id: 185, name: "GGHSS Arakkonam" }
      ]},
      { name: "Arcot", schools: [{ id: 186, name: "GGHSS ARCOT" }] },
      { name: "Sholingar", schools: [
        { id: 187, name: "TEM GMHSS SHOLINGUR" },
        { id: 188, name: "GBHSS SHOLINGAR" }
      ]},
      { name: "Walaja East", schools: [
        { id: 189, name: "GGHSS WALAJAPET" },
        { id: 190, name: "GBHSS VANNIVEDU WALAJA" }
      ]},
      { name: "Walaja West", schools: [{ id: 191, name: "GHSS, Ammur" }] }
    ]
  },
  {
    name: "SALEM",
    blocks: [
      { name: "Attur", schools: [
        { id: 192, name: "GBHSS ATTUR" },
        { id: 193, name: "GHSS Thandavarayapuram" }
      ]},
      { name: "Edappadi", schools: [
        { id: 194, name: "GBHSS Edappadi" },
        { id: 195, name: "GGHSS. Eddapaddy" }
      ]},
      { name: "Gangavalli", schools: [
        { id: 196, name: "GBHSS Gangavalli" },
        { id: 197, name: "GGHSS GANGAVALLI" }
      ]},
      { name: "Kolathur", schools: [{ id: 198, name: "GHSS METTUR DAM" }] },
      { name: "Omalur", schools: [{ id: 199, name: "GHSS KARUPPUR" }] },
      { name: "Salem-Urban", schools: [
        { id: 200, name: "MBHSS FORT" },
        { id: 201, name: "GGHSS SALEM 1" }
      ]},
      { name: "Sankari", schools: [
        { id: 202, name: "GGHSS SANKARI" },
        { id: 203, name: "GBHSS. SANKAGIRI" }
      ]},
      { name: "Tharamangalam", schools: [
        { id: 204, name: "GGHSS THARAMANGALAM" },
        { id: 205, name: "Government Model Higher Secondary School, Thuttampatti" }
      ]},
      { name: "Veerapandi", schools: [{ id: 206, name: "MODEL SCHOOL VEERAPANDI" }] },
      { name: "Yercaud", schools: [{ id: 207, name: "GHSS YERCAUD" }] },
      { name: "Salem-Rural", schools: [{ id: 208, name: "GHSS MANIYANOOR" }] }
    ]
  },
  {
    name: "SIVAGANGAI",
    blocks: [
      { name: "Manamadurai", schools: [
        { id: 209, name: "GGHSS, MANAMADURAI" },
        { id: 210, name: "GOVT HR SEC SCHOOL IDAIKATTUR" }
      ]},
      { name: "Sakkottai", schools: [{ id: 211, name: "MV GHSS, KARAIKUDI" }] },
      { name: "Singampunari", schools: [
        { id: 212, name: "GBHSS SINGAMPUNARI" },
        { id: 213, name: "RM RM GOVT GIRLS HR SEC SCHOOL SINGAMPUNARI" }
      ]},
      { name: "Sivagangai", schools: [{ id: 214, name: "GOVT HSS MARUTHUPANDIYAR NAGAR" }] },
      { name: "Thirupatur", schools: [
        { id: 215, name: "A.P.GOVT.(B)HR.SEC.SCHOOL THIRUPPATHUR" },
        { id: 216, name: "NM G(G)HSS.Thiruppathur" }
      ]},
      { name: "Thiruppuvanam", schools: [
        { id: 217, name: "GGHSS THIRUPPUVANAM" },
        { id: 218, name: "GOVT BOYS HSS THIRUPPUVANAM" }
      ]}
    ]
  },
  {
    name: "TENKASI",
    blocks: [
      { name: "Alangulam", schools: [{ id: 219, name: "GHSS, Alangulam" }] },
      { name: "Kadayanallur", schools: [
        { id: 220, name: "GOVT (G) HR SEC SCHOOL, KADAYANALLUR" },
        { id: 221, name: "GBHSS, KADAYANALLUR" }
      ]},
      { name: "Sankarankovil", schools: [
        { id: 222, name: "GGHSS SANKARANKOVIL" },
        { id: 223, name: "GOMATHI AMBAL GBHSS, SANKARANKOVIL" }
      ]},
      { name: "Tenkasi", schools: [
        { id: 224, name: "TMT.MANJAMMAL GGHSS TENKASI" },
        { id: 225, name: "ICI GBHSS, TENKASI" }
      ]},
      { name: "Vasudevanallur", schools: [{ id: 226, name: "GHSS VASUDEVANALLUR" }] }
    ]
  },
  {
    name: "THANJAVUR",
    blocks: [
      { name: "Kumbakonam", schools: [{ id: 227, name: "VAIGOVINDASAMY NINAIVU GHSS THARASURAM" }] },
      { name: "Orathanadu", schools: [
        { id: 228, name: "GGHSS ORATHANADU" },
        { id: 229, name: "GBHSS ORATHANADU" }
      ]},
      { name: "Papanasam", schools: [{ id: 230, name: "GHSS - AYYAMPETTAI" }] },
      { name: "Pattukkottai", schools: [{ id: 231, name: "GOVERNMENT MODEL HIGHER SEC SCHOOL - PATTUKOTTAI" }] },
      { name: "Peravurani", schools: [
        { id: 232, name: "GGHSS PERAVURANI (COMBINED)" },
        { id: 233, name: "GBHSS PERAVURANI" }
      ]},
      { name: "Thiruvaiyar", schools: [
        { id: 234, name: "GGHSS THIRUVAIYARU" },
        { id: 235, name: "GHSS - MELATHIRUPPANTHURITHI" }
      ]},
      { name: "Thiruvidaimarudhur", schools: [
        { id: 236, name: "GGHSS NACHIYARKOIL THIRUVIDAIMARUTHUR THANJAVUR" },
        { id: 237, name: "GBHSS - NACHIYARKOVIL" }
      ]},
      { name: "Thanjavur(Urban)", schools: [{ id: 238, name: "GGHSS ARANMANAIVALAGAM THANJAVUR" }] }
    ]
  },
  {
    name: "THE NILGIRIS",
    blocks: [
      { name: "Coonoor", schools: [{ id: 239, name: "ARINGAR ANNA GHSS" }] },
      { name: "Gudalur", schools: [{ id: 240, name: "GHSS GUDALUR CENTER I" }] },
      { name: "Udhagamandalam", schools: [{ id: 241, name: "GHSS OOTY" }] }
    ]
  },
  {
    name: "THENI",
    blocks: [
      { name: "Aundipatty", schools: [
        { id: 242, name: "GBHSS AUNDIPATTI" },
        { id: 243, name: "Government Girls Higher secondary school" }
      ]},
      { name: "Bodinayakanur", schools: [{ id: 244, name: "SEVENTHWARD GHSS BODI" }] },
      { name: "Cumbum", schools: [
        { id: 245, name: "AR Girls HSS,Cumbum" },
        { id: 246, name: "GHSS, KK patty" }
      ]},
      { name: "Periyakulam", schools: [
        { id: 247, name: "V.M.BOYS GHSS, PERIYAKULAM" },
        { id: 248, name: "GHSS Lakshmipuram,Periyakulam" }
      ]}
    ]
  },
  {
    name: "THOOTHUKKUDI",
    blocks: [
      { name: "Kovilpatti", schools: [
        { id: 249, name: "GGHSS KOVILPATTI" },
        { id: 250, name: "VOC GHSS, KOVILPATTI" }
      ]},
      { name: "Ottapidaram", schools: [{ id: 251, name: "VOC GHSS OTTAPIDARAM" }] },
      { name: "Srivaikundam", schools: [
        { id: 252, name: "AKS GIRLS HSS SRIVAIKUNDAM" },
        { id: 253, name: "GHSS Mukkani" }
      ]},
      { name: "Thiruchenthur", schools: [
        { id: 254, name: "SMG GHSS THIRUCHENDUR" },
        { id: 255, name: "ASA GOVT BOYS HSS, TIRUCHENDUR" }
      ]},
      { name: "Thoothukudi Rural", schools: [{ id: 256, name: "GHSS M.THANGAMMALPURAM" }] },
      { name: "Thoothukudi Urban", schools: [{ id: 257, name: "SEENA VANA GHSS THOOTHUKUDI" }] },
      { name: "Vilathikulam", schools: [{ id: 258, name: "GHSS VILATHIKULAM" }] },
      { name: "Kayathar", schools: [{ id: 259, name: "GHSS KAYATHAR" }] }
    ]
  },
  {
    name: "TIRUCHIRAPPALLI",
    blocks: [
      { name: "Lalgudi", schools: [{ id: 260, name: "GHSS, LALGUDI" }] },
      { name: "Andhanallur", schools: [{ id: 261, name: "GHSS,AYILAPETTAI,TRICHY" }] },
      { name: "Manapparai", schools: [
        { id: 262, name: "GBHSS MANAPARAI" },
        { id: 263, name: "GGHSS,Manapparai" }
      ]},
      { name: "Mannachanallur", schools: [
        { id: 264, name: "GMGHSS MANNACHANALLUR" },
        { id: 265, name: "GOVT.BOYS HSC, MANNACHANALLUR" }
      ]},
      { name: "Musiri", schools: [
        { id: 266, name: "GGHSS MUSIRI" },
        { id: 267, name: "GBHSS,Musiri" }
      ]},
      { name: "Thiruverumbur", schools: [{ id: 268, name: "GOVT ADW GIRLS HSS KATTUR" }] },
      { name: "Thuraiyur", schools: [
        { id: 269, name: "GGHSS THURAIYUR" },
        { id: 270, name: "GOVT ADW HSC SCHOOL, THURAIYUR" }
      ]},
      { name: "Trichy-Urban", schools: [{ id: 271, name: "Govt Syed Murdusha Model HSS Trichy (Combined)" }] }
    ]
  },
  {
    name: "TIRUNELVELI",
    blocks: [
      { name: "Ambasamudram", schools: [
        { id: 272, name: "A V RM V GOVT GIRLS HR SEC SCHOOL AMBASAMUDRAM" },
        { id: 273, name: "GOVT HR SEC SCHOOL VELLANGULI" }
      ]},
      { name: "Nanguneri", schools: [
        { id: 274, name: "SANKARA REDDIYAR GBHSS NANGUNERI" },
        { id: 275, name: "GOVERNMENT GIRLS HR SEC SCHOOL NANGUNERI" }
      ]},
      { name: "Palay-Rural", schools: [{ id: 276, name: "KRGHSS REDDIYARPATTI, THIRUNELVELI" }] },
      { name: "Palay-Urban", schools: [{ id: 277, name: "QUIDEMILLETH CHSS,MELAPALAYAM, THIRUNELVELI" }] },
      { name: "Radhapuram", schools: [{ id: 278, name: "NVC GHSS RADHAPURAM" }] },
      { name: "Tirunelveli Urban", schools: [{ id: 279, name: "GHSS TIRUNELVELI" }] }
    ]
  },
  {
    name: "TIRUPATHUR",
    blocks: [
      { name: "Jolarpet", schools: [{ id: 280, name: "GHSS VAKKANAMPATTI" }] },
      { name: "Madhanur", schools: [{ id: 281, name: "GHSS DEVALAPURAM" }] },
      { name: "Nattrampalli", schools: [{ id: 282, name: "GMHSS VANIYAMBADI" }] },
      { name: "Thirupattur", schools: [
        { id: 283, name: "GBHSS THIRUPATUR" },
        { id: 284, name: "GGHSS, Madavalam" }
      ]}
    ]
  },
  {
    name: "TIRUPPUR",
    blocks: [
      { name: "Palladam", schools: [
        { id: 285, name: "GGHSS PALLADAM" },
        { id: 292, name: "GBHSS, Palladam" }
      ]},
      { name: "Avinashi", schools: [
        { id: 286, name: "GGHSS.AVINASHI" },
        { id: 287, name: "GBHSS AVINASHI" }
      ]},
      { name: "Dharapuram", schools: [
        { id: 288, name: "NCP MUNICIPAL BOYS HIGHER SECONDARY SCHOOL DHARAPURAM" },
        { id: 289, name: "GHSS DHARAPURAM" }
      ]},
      { name: "Gangayam", schools: [{ id: 290, name: "GHSS KANGAYAM" }] },
      { name: "Madathukulam", schools: [{ id: 291, name: "GHSS MADATHUKULAM" }] },
      { name: "Tiruppur North", schools: [{ id: 293, name: "GHSS KUMAR NAGAR" }] },
      { name: "Tiruppur South", schools: [
        { id: 294, name: "PALANIAMMAL MPL GHSS, TIRUPUR" },
        { id: 295, name: "KSC BHSS, Tiruppur" }
      ]},
      { name: "Udumalaipattai", schools: [{ id: 296, name: "BCGGHSS UDUMALPET" }] }
    ]
  },
  {
    name: "TIRUVALLUR",
    blocks: [
      { name: "Gummidipoondi", schools: [
        { id: 297, name: "GBHSS GUMMIDIPOONDI" },
        { id: 298, name: "GGHSS, GUMMIDIPOONDI" }
      ]},
      { name: "Minjur", schools: [
        { id: 299, name: "GGHSS PONNERI" },
        { id: 300, name: "GBHSS, PONNERI" }
      ]},
      { name: "Poonamallee", schools: [
        { id: 301, name: "GGHSS KAMARAJ NAGAR, AVADI" },
        { id: 302, name: "GBHSS, KAMARAJ NAGAR" }
      ]},
      { name: "R.K.Pet", schools: [
        { id: 303, name: "GBHSS RK PET" },
        { id: 304, name: "GOVT (G) HSS, R.K.PET" }
      ]},
      { name: "Thiruvallur", schools: [
        { id: 305, name: "RMJ GGHSS TIRUVALLUR" },
        { id: 306, name: "KMN BRO MPL HSS THIRUVALLUR" }
      ]},
      { name: "Tiruttani", schools: [
        { id: 307, name: "GBHSS THIRUTTANI" },
        { id: 308, name: "GGHSS THIRUTTANI" }
      ]},
      { name: "Villivakkam", schools: [{ id: 309, name: "GHSS SM NAGAR AVADI" }] }
    ]
  },
  {
    name: "TIRUVANNAMALAI",
    blocks: [
      { name: "Arni", schools: [
        { id: 310, name: "GGMHSS ARNI" },
        { id: 311, name: "GBHSS, Arni" }
      ]},
      { name: "Chetpet", schools: [{ id: 312, name: "GHSS - PAZHAMPET" }] },
      { name: "Kalasapakkam", schools: [
        { id: 313, name: "GGHSS - KALASAPAKKAM" },
        { id: 314, name: "GMBHSS, Kalasapakkam" }
      ]},
      { name: "Chengam", schools: [
        { id: 315, name: "GBHSS CHENGAM" },
        { id: 316, name: "GGHSS Chengam" }
      ]},
      { name: "Cheyyar", schools: [
        { id: 317, name: "GBHSS CHEYYAR" },
        { id: 318, name: "GMGHSS, Cheyyar" }
      ]},
      { name: "Kilpennathur", schools: [
        { id: 319, name: "GGHSS, KILPENNATHUR" },
        { id: 320, name: "GBHSS, Kilpennathur" }
      ]},
      { name: "Polur", schools: [
        { id: 321, name: "GGHSS - POLUR" },
        { id: 322, name: "GBHSS, Polur" }
      ]},
      { name: "Tiruvannamalai", schools: [
        { id: 323, name: "Municipal MGGHSS (Model), Tiruvannamalai" },
        { id: 324, name: "TNAP GHSS, Tiruvannamalai" }
      ]},
      { name: "Vandavasi", schools: [
        { id: 325, name: "GBHSS VANDAVASI" },
        { id: 326, name: "GGHSS, Vandavasi" }
      ]},
      { name: "Vembakkam", schools: [
        { id: 327, name: "GBHSS VEMBAKKAM" },
        { id: 328, name: "GGHSS, Vembakkam" }
      ]}
    ]
  },
  {
    name: "TIRUVARUR",
    blocks: [
      { name: "Mannargudi", schools: [
        { id: 329, name: "GGHSS MODEL MANNARGUDI" },
        { id: 330, name: "MHSS, Co operative urban School, Mannargudi" }
      ]},
      { name: "Nannilam", schools: [
        { id: 331, name: "GGHSS NANNILAM" },
        { id: 332, name: "GBHSS, Nannilam" }
      ]},
      { name: "Thiruthuraipoondi", schools: [
        { id: 333, name: "GBHSS THIRUTHURAIPOONDI" },
        { id: 334, name: "GGHSS, Thiruthuraipoondi" }
      ]},
      { name: "Thiruvarur", schools: [{ id: 335, name: "GHSS PULIVALAM" }] },
      { name: "Valangaiman", schools: [
        { id: 336, name: "GBHSS VALANGAIMAN" },
        { id: 337, name: "GGHSS, Valangaiman" }
      ]}
    ]
  },
  {
    name: "VELLORE",
    blocks: [
      { name: "Anaicut", schools: [
        { id: 338, name: "GBHSS POIGAI" },
        { id: 339, name: "GGHSS, Poigai" }
      ]},
      { name: "Gudiyatham", schools: [
        { id: 340, name: "GGHSS NADUPET GUDIYATHAM" },
        { id: 341, name: "GBHSS, Nellorepet" }
      ]},
      { name: "K.V.Kuppam", schools: [
        { id: 342, name: "GBHSS K.V.KUPPAM" },
        { id: 343, name: "GGHSS, K.V.Kuppam" }
      ]},
      { name: "Katpadi", schools: [
        { id: 344, name: "GBHSS KATPADI" },
        { id: 345, name: "GGHSS, Katpadi" }
      ]},
      { name: "Vellore Urban", schools: [{ id: 346, name: "GOVT MUSLIM HSS VELLORE" }] }
    ]
  },
  {
    name: "VILLUPURAM",
    blocks: [
      { name: "Koliyanur", schools: [
        { id: 347, name: "GOVT MODEL GIRLS HR SEC SCHOOL, VILLUPURAM" },
        { id: 348, name: "Thiru Kamaraj Municipal Hr. Sec. School, Villupuram" }
      ]},
      { name: "Thiruvennainallur", schools: [
        { id: 349, name: "GGHSS THIRUVENNAINALLUR" },
        { id: 350, name: "GOVERNMENT MODEL HIGHER SECONDARY SCHOOL EMAPPUR" }
      ]},
      { name: "Gingee", schools: [
        { id: 351, name: "RDGBHSS GINGEE" },
        { id: 352, name: "GOVERNMENT GIRLS HIGHER SECONDARY SCHOOL GINGEE" }
      ]},
      { name: "Mailam", schools: [{ id: 353, name: "GOVT HR SEC SCHOOL, THAZHUTHALI" }] },
      { name: "Olakkur", schools: [{ id: 354, name: "MPL HSS, KAVERIPAKKAM, DINDIVANAM" }] },
      { name: "Vaanur", schools: [{ id: 355, name: "GHSS, Kiliyanur" }] },
      { name: "Vikaravandi", schools: [{ id: 356, name: "GHSS VIKIRAVANDI" }] }
    ]
  },
  {
    name: "VIRUDHUNAGAR",
    blocks: [
      { name: "Aruppukottai", schools: [{ id: 357, name: "GHSS PALAVANATHAM" }] },
      { name: "Rajapalayam", schools: [
        { id: 358, name: "SSG(B)HSS" },
        { id: 359, name: "SSG(G)HSS,RAJAPALAYAM" }
      ]},
      { name: "Sivakasi", schools: [{ id: 360, name: "A U MUNICIPAL HIGHER SECONDARY SCHOOL - SIVAKASI" }] },
      { name: "Srivilliputhur", schools: [{ id: 361, name: "MPL TVK HSS, Srivilliputhur" }] },
      { name: "Sattur", schools: [{ id: 362, name: "GHSS Padanthal" }] },
      { name: "Thiruchuli", schools: [{ id: 363, name: "GHSS, M.REDDIAPATTI(MODEL)" }] },
      { name: "Virudhunagar", schools: [{ id: 364, name: "TPNM GIRLS HR SEC SCHOOL VIRUDHUNAGAR - CENTRE 1" }] }
    ]
  }
];

// Helper function to get all districts
export const getDistricts = (): string[] => {
  return schoolsData.map(d => d.name);
};

// Helper function to get blocks for a district
export const getBlocksForDistrict = (districtName: string): string[] => {
  const district = schoolsData.find(d => d.name === districtName);
  return district ? district.blocks.map(b => b.name) : [];
};

// Helper function to get schools for a block in a district
export const getSchoolsForBlock = (districtName: string, blockName: string): School[] => {
  const district = schoolsData.find(d => d.name === districtName);
  if (!district) return [];
  const block = district.blocks.find(b => b.name === blockName);
  return block ? block.schools : [];
};
