export interface ResumeData {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    phone: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    location: string;
    gpa: string;
    honors: string;
    clubs: string;
    leadership: string;
  }>;
  projects: Array<{
    name: string;
    technologies: string;
    date: string;
    description: string;
  }>;
  additional: {
    hackathons: string;
  };
  skills: {
    technical: string[];
    tools: string[];
  };
}

export const resumeData: ResumeData = {
  personal: {
    name: "Nor Danish Imran Bin Nor Hisham",
    title: "",
    location: "",
    email: "nordanishimran@gmail.com",
    github: "github.com/virtualdann",
    linkedin: "linkedin.com/in/nordanishimran",
    phone: "+1 734-510-0922"
  },
  experience: [
    {
      company: "Desai Accelerator",
      position: "Software Developer Intern",
      duration: "May 2025 – Present",
      location: "Ann Arbor, MI",
      description: [
        "Collaborated closely with 5 founders across multiple industries and cross-functional teams (designers, business) to translate product visions into technical requirements and deliver impactful software solutions.",
        "Architected development of a scalable e-commerce backend using MedusaJS (Node.js) and PostgreSQL, designing distinct REST APIs and live critical custom modules to automate core business logic and support future growth.",
        "Replaced core search system with Algolia Autocomplete, integrating it to deliver high-speed, image-rich product discovery experience for catalog exceeding 100,000 SKUs.",
        "Partnered with design team to implement key recommendations from a design audit, leveraging TypeScript and React to build more intuitive and accessible UI components for homepage, navigation, and query forms."
      ]
    },
    {
      company: "Pantas Climate Solutions",
      position: "Software Engineer Intern",
      duration: "May 2024 – August 2024",
      location: "Kuala Lumpur, Malaysia",
      description: [
        "Collaborated on end-to-end system design and deployment of emission report generation solution, enabling accurate compliance with Partnership for Carbon Accounting Financials (PCAF) standard, and reducing processing time from one week to one hour.",
        "Developed full-stack functionalities using Django, including robust data upload with validation, real-time progress reporting, and dynamic data visualization, helping all clients achieve 100% accuracy.",
        "Implemented automated Python cron jobs for updating 50,000+ critical data records (e.g., PCAF emission factors, environmental data) bi-weekly, ensuring real-time accuracy and data freshness essential for critical decision-making."
      ]
    },
    {
      company: "University of Michigan Medical School",
      position: "Undergraduate Student Researcher at Dr He Lab",
      duration: "October 2023 – April 2024",
      location: "Ann Arbor, MI",
      description: [
        "Built Natural Language Processing-driven data pipeline using National Institutes of Health's (NIH) SemRep to parse and analyze 1,000+ PubMed research abstracts, accelerating extraction of critical vaccine-related knowledge and insights for medical researchers.",
        "Automated data ingestion framework using Python scripts to extend UMLS knowledge base with Vaccine Ontology (3M+ entries), streamlining abstract fetching and SemRep processing to boost workflow efficiency by 75%.",
        "Awarded Blue Ribbon at 2024 Undergraduate Research Opportunity Program (UROP) Spring Symposium for outstanding poster and presentation on Semantic Relation Extraction for Vaccine Analysis."
      ]
    }
  ],
  education: [
    {
      institution: "University of Michigan",
      degree: "Bachelor of Science in Computer Science, Minor in Entrepreneurship",
      year: "Graduating May 2026",
      location: "Ann Arbor, MI",
      gpa: "3.78/4.0",
      honors: "University Honors (Winter 2023, Fall 2023, Winter 2024)",
      clubs: "Michigan Hackers, Michigan Data Science Team, Michigan Malaysian Student Association (MIMSA)",
      leadership: "Head of Sports @ MIMSA (2024-2025), Sophomore Liaison @ MIMSA (2023-2024)"
    }
  ],
  projects: [
    {
      name: "VSee, Startup-Venture Capital Matching Platform",
      technologies: "React, Python, Flask, SQLite, Google Gemini",
      date: "June 2024",
      description: "Engineered a startup-VC matching platform by integrating a React-based front-end with a Flask/SQLite backend via custom APIs, facilitating user authentication, data processing, and dynamic display of AI-generated company matches and conversational insights from Google Gemini."
    },
    {
      name: "Social Media Platform",
      technologies: "React, HTML, CSS, Python, SQLite, AWS",
      date: "January 2024",
      description: "Implemented a social media platform using React for front-end, featuring seamless user profile creation, image post uploads, interactive feeds with liking/commenting, and follow capabilities, all integrated with a SQL database for persistent data storage."
    }
  ],
  additional: {
    hackathons: "MHacks x Google @ University of Michigan (2024); ImagineHack @ Taylor's University (2024)"
  },
  skills: {
    technical: ["Python", "C", "C++", "HTML/CSS", "JavaScript", "TypeScript", "SQL"],
    tools: ["React", "Next.js", "Flask", "Vercel", "Github", "Figma", "Docker", "Django", "Supabase", "AWS", "Bloomberg"]
  }
};