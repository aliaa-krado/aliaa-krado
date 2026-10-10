/**
 * Single source of truth for all portfolio content.
 * Everything rendered on the page is pulled from here, so updating
 * your CV details only ever means editing this file.
 */

export type SocialKey = "github" | "linkedin" | "email";

export const profile = {
  name: "Aliaa Krado",
  firstName: "Aliaa",
  initials: "AK",
  role: "Quality Assurance Specialist",
  location: "Damascus, Syria",
  email: "aliakrado@gmail.com",
  yearsOfExperience: 4,
  headline: ["Shipping", "software", "you can", "trust."],
  valueProp:
    "QA Specialist with 4+ years of experience in manual, functional, API, and mobile testing, helping teams deliver reliable products through thoughtful test design and clear defect reporting.",
  socials: {
    // Add your GitHub profile URL here to show the GitHub icon.
    github: "",
    linkedin: "https://www.linkedin.com/in/aliaa-krado-b962a6251",
    email: "mailto:aliakrado@gmail.com",
  } satisfies Record<SocialKey, string>,
  // Optional: drop a PDF into /public and set the path, e.g. "/Aliaa-Krado-CV.pdf"
  resumeUrl: "/Aliaa-Krado-CV.pdf",
};

export const about = {
  heading: "Quality isn’t a phase. It’s a mindset.",
  body: "I’m a Quality Assurance Specialist with over four years of experience helping teams deliver reliable software. I’ve worked on a variety of projects across Syria, the UAE, and Saudi Arabia. I focus on understanding requirements, designing useful test cases, and documenting defects clearly. My experience also includes leading team workflows and maintaining quality standards. Alongside this work, I’m currently learning test automation with Playwright and building on my basic knowledge of TypeScript through personal practice.",
  stats: [
    { value: 4, suffix: "+", label: "Years in quality assurance" },
    { value: 4, suffix: "", label: "Roles across tech & telecom" },
    { value: 4, suffix: "", label: "Organisations served" },
    { value: 2018, suffix: "", label: "Career started", noCount: true },
  ],
};

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  icon: "testing" | "automation" | "tools" | "leadership";
  skills: string[];
};

/** Established strengths get a highlight badge. */
export const topSkills = ["Manual Testing", "API Testing", "Mobile Testing"];

export const skillGroups: SkillGroup[] = [
  {
    id: "testing",
    title: "Software Testing",
    description:
      "The foundation: rigorous, user-centred verification that catches issues before customers ever see them.",
    icon: "testing",
    skills: [
      "Manual Testing",
      "Functional Testing",
      "Performance Testing",
      "API Testing",
      "Mobile Testing",
      "Regression Testing",
      "Exploratory Testing",
      "Test Case Design",
      "Bug Reporting",
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Tools that support my testing and day-to-day QA work.",
    icon: "tools",
    skills: [
      "Jira",
      "Postman",
      "Swagger",
      "JMeter",
      "VS Code",
      "Microsoft Azure",
      "Claude (AI)",
      "Codex (AI)",
      "Cross-browser",
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Methods",
    description:
      "Leading teams, defining standards, and keeping quality a shared responsibility.",
    icon: "leadership",
    skills: [
      "Team Leadership",
      "Quality Standards",
      "Workflow Management",
      "Process Improvement",
      "Customer Focus",
    ],
  },
  {
    id: "automation",
    title: "Currently Learning",
    description:
      "Exploring test automation through personal practice, with no professional automation experience yet.",
    icon: "automation",
    skills: ["Playwright (Learning)", "TypeScript (Basic Knowledge)"],
  },
];

export const marqueeTools = [
  "Manual Testing",
  "Test Case Design",
  "API Testing",
  "Mobile Testing",
  "Microsoft Azure",
  "VS Code",
  "Bug Reporting",
  "Functional Testing",
  "Regression",
  "Quality Standards",
];

export type Role = {
  title: string;
  period: string;
  duration: string;
  points: string[];
};

export type Job = {
  company: string;
  location?: string;
  current?: boolean;
  roles: Role[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "PLAN A Agency",
    location: "Dubai, United Arab Emirates",
    current: true,
    roles: [
      {
        title: "Quality Assurance Specialist",
        period: "May 2023 — Present",
        duration: "3 yrs 5 mos",
        points: [
          "Own end-to-end quality for client products, from requirement review through release sign-off.",
          "Design manual test cases based on requirements and critical user journeys.",
          "Document defects, verify fixes, and communicate testing results to the team.",
          "Run functional, regression, mobile, and API testing with clear, reproducible defect reports.",
        ],
      },
    ],
    tags: ["Manual Testing", "Functional Testing", "API Testing", "Mobile Testing"],
  },
  {
    company: "TechnoWave",
    location: "Damascus, Syria",
    roles: [
      {
        title: "Quality Assurance Specialist",
        period: "May 2022 — May 2023",
        duration: "1 yr",
        points: [
          "Executed manual and functional test cycles across web and mobile releases.",
          "Verified APIs and integrations — validating responses, edge cases, and error handling.",
          "Authored test cases and defect reports, partnering with developers to reach root cause fast.",
        ],
      },
    ],
    tags: ["Manual Testing", "Functional Testing", "API Testing", "Mobile Testing"],
  },
  {
    company: "Syrian Telecom",
    location: "Damascus, Syria",
    roles: [
      {
        title: "Head of e-Citizen Service Centers",
        period: "Feb 2021 — May 2023",
        duration: "2 yrs 4 mos",
        points: [
          "Led team workflows across e-Citizen service centres and set the standards for service quality.",
          "Monitored service performance and streamlined operational processes for citizens.",
          "Coordinated staff, reporting, and escalations between centres and management.",
        ],
      },
    ],
    tags: ["Team Leadership", "Quality Standards", "Operations"],
  },
  {
    company: "Al Boraq Telecom",
    location: "Damascus, Syria",
    roles: [
      {
        title: "Quality Control",
        period: "Apr 2019 — Mar 2020",
        duration: "1 yr",
        points: [
          "Applied QC procedures to telecom services against defined quality standards.",
          "Tracked issues, verified fixes, and documented findings for continuous improvement.",
        ],
      },
      {
        title: "Customer Service Department",
        period: "Sep 2018 — Apr 2019",
        duration: "8 mos",
        points: [
          "Supported customers directly — the root of the user-first mindset I bring to every test.",
        ],
      },
    ],
    tags: ["QC", "Customer Service"],
  },
];

export const education = {
  school: "Damascus University",
  degree: "Electronics & Communication Engineering",
  period: "2015 — 2021",
};

export type Project = {
  id: string;
  title: string;
  category: "Web & Mobile" | "Mobile & VR" | "Mobile" | "Web";
  sector: string;
  description: string;
  features: string[];
  image?: string;
  engagement?: "Freelance";
  internal?: boolean;
  links: { label: "Website" | "App Store" | "Google Play"; href: string }[];
};

/** Selected real projects, ordered by platform breadth and product complexity. */
export const projects: Project[] = [
  {
    id: "sibf",
    title: "Sharjah International Book Fair",
    category: "Web & Mobile",
    sector: "Culture & Events",
    description:
      "A unified website and native mobile apps for visitors, exhibitors, and publishers, bringing the book fair's digital experience together across languages and platforms.",
    features: ["Multilingual experience", "Multiple user audiences", "Website & native apps"],
    image: "/projects/sibf.jpg",
    links: [
      { label: "Website", href: "https://sibf.com/" },
      { label: "App Store", href: "https://apps.apple.com/ae/app/sibf-25/id1585104689" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.sba&hl=en" },
    ],
  },
  {
    id: "fanr",
    title: "FANR Immerse",
    category: "Mobile & VR",
    sector: "Government & Public Awareness",
    description:
      "An immersive experience for the Federal Authority for Nuclear Regulation. Built with Unreal Engine, the bilingual VR and mobile application introduces nuclear regulation and radiation safety through interactive learning.",
    features: ["VR & mobile platforms", "Bilingual content", "Interactive learning"],
    image: "/projects/fanr.jpg",
    links: [
      { label: "App Store", href: "https://apps.apple.com/ae/app/fanr-immerse/id6739451759" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.uae.fanrue&hl=en" },
    ],
  },
  {
    id: "etihad",
    title: "Etihad Rail",
    category: "Mobile",
    sector: "Transport & Operations",
    description:
      "An internal mobile application for staff at the UAE's national railway network, supporting train staff management, daily operations, safety checks, and real-time reporting.",
    features: ["Staff operations", "Safety check workflows", "Real-time reporting"],
    internal: true,
    links: [],
  },
  {
    id: "sorbonne",
    title: "Sorbonne University Abu Dhabi",
    category: "Web",
    sector: "Higher Education",
    description:
      "A unified academic website connecting students, faculty, and administration with programs, events, research, and resources in English, Arabic, and French.",
    features: ["Three languages", "Academic resources", "Multiple user audiences"],
    image: "/projects/sorbonne.jpg",
    links: [{ label: "Website", href: "https://www.sorbonne.ae/" }],
  },
  {
    id: "hatlak",
    title: "HatlakDeals",
    category: "Web & Mobile",
    sector: "Marketplace",
    description:
      "A buying and selling marketplace available on the web, iOS, and Android, designed to make product discovery and trading straightforward and welcoming. A freelance project I worked on.",
    features: ["Buying & selling", "Product discovery", "Website & mobile apps"],
    image: "/projects/hatlak.jpg",
    engagement: "Freelance",
    links: [
      { label: "Website", href: "https://hatlakdeals.com/" },
      { label: "App Store", href: "https://apps.apple.com/us/app/hatlakdeals-%D9%87%D8%A7%D8%AA%D9%84%D9%83-%D8%AF%D9%8A%D9%84%D8%B2/id6753316474" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.arbach.hatlakdeals&hl=en&pli=1" },
    ],
  },
  {
    id: "hatta",
    title: "Hatta Honey",
    category: "Web",
    sector: "E-commerce",
    description:
      "A complete e-commerce relaunch for a UAE honey producer, serving wholesale and retail customers through product browsing, online ordering, and customer engagement.",
    features: ["Retail & wholesale", "Online ordering", "Product catalog"],
    image: "/projects/hatta.jpg",
    links: [{ label: "Website", href: "https://www.hattahoney.ae/" }],
  },
  {
    id: "mirage",
    title: "Mirage Rent A Car",
    category: "Web",
    sector: "Vehicle Rental",
    description:
      "A luxury car rental portal for a UAE brand, allowing customers to explore vehicles and book online through a journey from vehicle selection to checkout.",
    features: ["Vehicle discovery", "Online booking", "Checkout journey"],
    image: "/projects/mirage.jpg",
    links: [{ label: "Website", href: "https://miragerentcar.com/" }],
  },
  {
    id: "rabdan",
    title: "Rabdan Academy",
    category: "Web",
    sector: "Education & Government",
    description:
      "A redesigned website for a government-owned academy specialising in safety, security, defence, and crisis management, improving information access for students, staff, and international applicants.",
    features: ["Information access", "Student & staff audiences", "Academic content"],
    image: "/projects/rabdan.jpg",
    links: [{ label: "Website", href: "https://ra.ac.ae/" }],
  },
  {
    id: "alkabeer",
    title: "Al Kabeer Group",
    category: "Web",
    sector: "Food & B2B",
    description:
      "A product discovery platform for a frozen food manufacturer, combining e-commerce-style browsing with detailed product information, B2B inquiries, and store location.",
    features: ["Product discovery", "B2B inquiries", "Store locator"],
    image: "/projects/alkabeer.jpg",
    links: [{ label: "Website", href: "https://al-kabeer.com/" }],
  },
  {
    id: "mediaworld",
    title: "Media World",
    category: "Web",
    sector: "Advertising",
    description:
      "A distinctive website for a UAE outdoor and digital advertising company, giving visitors an engaging way to explore advertising locations, formats, and services.",
    features: ["Advertising locations", "Format discovery", "Distinctive navigation"],
    image: "/projects/mediaworld.jpg",
    links: [{ label: "Website", href: "https://mediaworld.ae/" }],
  },
  {
    id: "mediaturtles",
    title: "Media Turtles",
    category: "Web",
    sector: "Creative Ventures",
    description:
      "A corporate website for a creative venture builder, showcasing its vision, ventures, and market presence through engaging digital storytelling.",
    features: ["Venture showcase", "Corporate content", "Digital storytelling"],
    image: "/projects/mediaturtles.jpg",
    links: [{ label: "Website", href: "https://mediaturtles.net/" }],
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
