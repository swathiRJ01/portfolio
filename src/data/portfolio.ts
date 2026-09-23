import {
  Code2, Database, Wrench, Users, Globe, Server,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Skill = { name: string; desc: string };
export type SkillCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'HTML5', desc: 'Semantic markup & modern page structure' },
      { name: 'CSS3', desc: 'Responsive layouts, flexbox & grid systems' },
      { name: 'JavaScript', desc: 'Interactive, dynamic client-side logic' },
      { name: 'Next.js', desc: 'React framework for SSR & routing' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    skills: [
      { name: 'Python', desc: 'Scripting, scraping & backend services' },
      { name: 'Node.js', desc: 'JavaScript runtime for server-side APIs' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    skills: [
      { name: 'MySQL', desc: 'Relational database design & queries' },
      { name: 'MongoDB', desc: 'NoSQL document-based storage' },
      { name: 'SQLite', desc: 'Lightweight embedded relational DB' },
      { name: 'XAMPP', desc: 'Local Apache + MySQL dev environment' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', desc: 'Version control & branch workflows' },
      { name: 'GitHub', desc: 'Remote repos, PRs & collaboration' },
      { name: 'VS Code', desc: 'Primary editor & debugging workflow' },
      { name: 'Excel', desc: 'Data analysis, formulas & pivot tables' },
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: Users,
    skills: [
      { name: 'Teamwork', desc: 'Collaborating effectively across teams' },
      { name: 'Problem Solving', desc: 'Breaking down & resolving challenges' },
      { name: 'Active Listening', desc: 'Understanding before responding' },
      { name: 'Leadership', desc: 'Guiding initiatives & coordinating people' },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  tags: string[];
  problem: string;
  solution: string;
  features: string[];
  learning: string;
  links: { demo: string; github: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'cartcortex',
    title: 'CartCortex',
    badge: 'FEATURED PROJECT',
    tagline: 'Smart product price comparison across e-commerce platforms.',
    description:
      'CartCortex is a web-based smart product price comparison system that allows users to paste e-commerce product links and compare prices across platforms.',
    tags: ['Python', 'Web Scraping', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    problem:
      'Finding the best price for a product across multiple e-commerce sites is time-consuming and manual.',
    solution:
      'A web app that extracts product information from a pasted URL, scrapes prices across platforms, and presents a sorted comparison with the lowest price highlighted.',
    features: [
      'Product URL input',
      'Product information extraction',
      'Price comparison across platforms',
      'Sorting by price',
      'Lowest-price highlighting',
      'Dynamic results',
    ],
    learning:
      'Through CartCortex, I gained practical experience in Python backend development, web scraping, SQLite data handling and creating dynamic user-friendly web applications.',
    links: { demo: '#', github: '#' },
    featured: true,
  },
  {
    id: 'flat-rental',
    title: 'Flat Rental Management System',
    badge: 'PROJECT',
    tagline: 'Organize flat rentals — property, tenant & payment details.',
    description:
      'A web application designed to manage flat rental property information including flat details, tenant information and payment details, helping property owners organize rental management.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Database'],
    problem:
      'Property owners struggle to keep track of multiple flats, tenants and payment records in one place.',
    solution:
      'A rental management dashboard that centralizes property details, tenant information and payment status into an organized, easy-to-use interface.',
    features: [
      'Property cards with flat details',
      'Tenant information management',
      'Payment status tracking',
      'Rental dashboard overview',
    ],
    learning:
      'Built a full CRUD-style management UI and learned how to model real-world rental data and relationships between properties, tenants and payments.',
    links: { demo: '#', github: '#' },
  },
];

export type EducationItem = {
  period: string;
  title: string;
  institution: string;
  metric: string;
};

export const education: EducationItem[] = [
  {
    period: '2022 – 2026',
    title: 'Bachelor of Engineering',
    institution: 'Information Science & Engineering — Sahyadri College of Engineering & Management',
    metric: 'CGPA: 6.2',
  },
  {
    period: '2020 – 2022',
    title: 'Pre-University Course',
    institution: 'Sharada Pre-University College, Kodialbail',
    metric: 'Percentage: 60.4%',
  },
  {
    period: '2019 – 2020',
    title: 'SSLC',
    institution: 'Carmel School, Mangalore',
    metric: 'Percentage: 52.4%',
  },
];

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    period: '2024 – 2025',
    role: 'Cultural Coordinator',
    org: 'Student Association, ISE — Sahyadri College of Engineering & Management',
    description:
      'Organized events, coordinated student initiatives, and served as a liaison between students and faculty.',
  },
];

export type Certification = {
  provider: string;
  title: string;
};

export const certifications: Certification[] = [
  { provider: 'TCS iON', title: 'Career Edge – Young Professional Course' },
  { provider: 'Infosys Springboard', title: 'Introduction to Artificial Intelligence' },
];

export const languages = ['English', 'Hindi', 'Kannada', 'Tulu'];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const contactInfo = {
  email: 'swathijayanidhi@gmail.com',
  linkedin: '#',
  github: '#',
};

export const stats = [
  { value: '2026', label: 'Graduate' },
  { value: '2+', label: 'Projects' },
  { value: 'Full-Stack', label: 'Focus' },
  { value: 'Data', label: 'Analytics' },
];

export const heroBadges = ['React', 'JavaScript', 'Python', 'Node.js'];

export type IconRenderer = LucideIcon;
export { Globe };
