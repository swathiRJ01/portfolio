// Edit your content here. Replace every "#" link with your real URL.
export interface Project { title: string; subtitle: string; description: string; tech: string[]; category: "React" | "Python" | "PHP"; live: string; github: string; }
export interface SkillGroup { title: string; items: string[]; }
export interface Experience { role: string; company: string; period: string; points: string[]; }

export const profile = {
  name: "Swathi R J",
  roles: ["Full Stack Developer", "React Developer", "Problem Solver"],
  intro: "I build responsive, user-friendly web applications with React, TypeScript and Python.",
  about: "Aspiring Full Stack Developer with a detail-oriented mindset, currently pursuing Full Stack Development training. Passionate about building responsive, user-friendly web applications. Strong problem-solving skills, adaptable, and always eager to learn new technologies.",
  phone: "+91 9482459867",
  email: "swathijayanidhi@gmail.com",
  github: "#", // TODO: your GitHub URL
  linkedin: "#", // TODO: your LinkedIn URL
  resume: "/resume.pdf", // put resume.pdf inside /public
  stats: [{ n: "1", l: "Internship" }, { n: "3+", l: "Projects" }, { n: "4", l: "Languages spoken" }]
};

export const education = { degree: "Bachelor of Engineering in Information Science & Engineering", school: "Sahyadri College of Engineering & Management", period: "2022 – 2026" };

export const experience: Experience[] = [{
  role: "Frontend Development Intern", company: "Volvitech Software Solutions LLP", period: "Jan 2026 – May 2026",
  points: [
    "Developed responsive web interfaces using React.js, TypeScript and CSS with reusable components",
    "Connected the frontend to backend services through REST APIs to fetch and display data",
    "Used Git for version control and organized development work",
    "Learned new technologies independently and applied them during the internship"
  ]
}];

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["Python", "JavaScript", "TypeScript", "PHP", "SQL"] },
  { title: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Flask", "PHP"] },
  { title: "Database", items: ["MySQL", "MongoDB", "SQLite"] },
  { title: "AI & ML", items: ["Generative AI", "LLM Fundamentals", "Prompt Engineering", "AI API Integration"] },
  { title: "Tools", items: ["VS Code", "Git", "GitHub", "Excel", "XAMPP", "Vercel"] },
  { title: "Soft Skills", items: ["Teamwork", "Problem Solving", "Active Listening", "Leadership"] }
];

export const projects: Project[] = [
  { title: "CarConnect", subtitle: "Car Buying & Selling Platform", category: "PHP", live: "#", github: "#",
    description: "Marketplace with Buyer, Seller and Admin modules. Includes OTP verification, password hashing, car listing management, messaging and dashboard statistics.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"] },
  { title: "VoteSecure", subtitle: "Online Voting System", category: "Python", live: "#", github: "#",
    description: "User registration with OTP verification, vote management, password hashing and database integration.",
    tech: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"] },
  { title: "DevFolio", subtitle: "Interactive Personal Portfolio", category: "React", live: "#", github: "#",
    description: "Responsive portfolio with reusable components, glassmorphism UI, gradient colours and hover effects, deployed on Vercel.",
    tech: ["React.js", "Vite", "JavaScript", "HTML", "CSS", "Git", "GitHub", "Vercel"] }
];

export const certifications = ["TCS iON Career Edge – Young Professional Course", "Infosys Springboard – Introduction to Artificial Intelligence"];
export const languages = ["English", "Kannada", "Hindi", "Tulu"];
