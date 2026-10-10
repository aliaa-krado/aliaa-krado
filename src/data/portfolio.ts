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
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  tags: string[];
  links: { label: string; href: string }[];
  /** Short illustrative code shown on the card. */
  snippet: string;
};

/**
 * Selected work. These case studies are drafted from the themes on the CV —
 * replace them with your real projects and add repo / demo links.
 * Links with an empty href are hidden automatically.
 */
export const projects: Project[] = [
  {
    title: "Playwright E2E Automation Suite",
    kicker: "Test Automation",
    description:
      "An end-to-end test framework in TypeScript and Playwright that turns critical user journeys into fast, repeatable checks across Chromium, Firefox, and WebKit.",
    highlights: [
      "Reusable page objects and fixtures keep specs short and readable",
      "Cross-browser projects run the same journeys on every engine",
      "Trace viewer and screenshots on failure for instant debugging",
    ],
    tags: ["Playwright", "TypeScript", "VS Code", "E2E"],
    links: [
      { label: "Source", href: "" },
      { label: "Report", href: "" },
    ],
    snippet: `test("checkout applies discount", async ({ page }) => {
  await page.goto("/cart");
  await page.getByLabel("Promo code").fill("SAVE10");
  await expect(page.getByTestId("total")).toHaveText("$90.00");
});`,
  },
  {
    title: "API Test & Contract Checks",
    kicker: "API Testing",
    description:
      "Automated REST API verification covering status codes, payload structure, edge cases, and error handling — so integrations fail in CI, not in production.",
    highlights: [
      "Positive, negative, and boundary cases for every endpoint",
      "Response schema validation to catch breaking changes early",
      "Shared auth and data setup reused by UI tests",
    ],
    tags: ["API Testing", "Playwright", "REST", "JSON"],
    links: [{ label: "Source", href: "" }],
    snippet: `const res = await request.get("/api/users/42");
expect(res.status()).toBe(200);
expect(await res.json()).toMatchObject({
  id: 42, email: expect.any(String),
});`,
  },
  {
    title: "Mobile App Quality Program",
    kicker: "Mobile Testing",
    description:
      "A structured mobile testing approach for iOS and Android releases, combining functional test plans with exploratory sessions on real devices.",
    highlights: [
      "Device and OS coverage matrix for each release",
      "Regression checklists for critical flows",
      "Clear, reproducible bug reports with steps, logs, and media",
    ],
    tags: ["Mobile Testing", "iOS", "Android", "Regression"],
    links: [],
    snippet: `projects: [
  { name: "iPhone 15", use: devices["iPhone 15"] },
  { name: "Pixel 7",   use: devices["Pixel 7"] },
  { name: "iPad",      use: devices["iPad Pro 11"] },
]`,
  },
  {
    title: "AI-Assisted Test Authoring",
    kicker: "AI Workflow",
    description:
      "A workflow that pairs Codex with Playwright to draft, refactor, and extend test scripts faster — keeping the human focused on test design and edge cases.",
    highlights: [
      "Generate first drafts of specs from manual test cases",
      "Refactor flaky or duplicated steps into shared helpers",
      "Spot untested paths to push coverage further",
    ],
    tags: ["Codex", "TypeScript", "Playwright", "AI"],
    links: [],
    snippet: `// codex ▸ draft spec from TC-142 "Reset password"
test("user can reset password", async ({ page }) => {
  await resetFlow.request(page, user.email);
  await expect(page.getByRole("alert")).toBeVisible();
});`,
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
