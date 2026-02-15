export interface Project {
    _id?: string;
    title: string;
    category: string;
    image: string;
    desc: string;
    stats: Record<string, string>;
}

export interface LabProject {
    _id?: string;
    title: string;
    desc: string;
    tags: string[];
    image: string;
}

export interface Socials {
    linkedin?: string;
    github?: string;
    mail?: string;
}

export interface TeamStats {
    exp: string;
    projects: string;
    awards: string;
}

export interface TeamMember {
    _id?: string;
    name: string;
    role: string;
    roleOrder: number;
    department: string;
    image: string;
    bio: string;
    socials: Socials;
    stats: TeamStats;
}

export interface Event {
    title: string;
    date: string;
    type: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
}

export interface HeroConfig {
    tag: string;
    title: string;
    subTitle: string;
    description: string;
    scrollText: string;
}

export interface HomeConfig {
    hero: HeroConfig;
    sponsors: string[];
    events: Event[];
    testimonials: Testimonial[];
}

export interface SiteConfig {
    _id?: string;
    home: HomeConfig;
    about: any;
    contact: any;
    projects: { hero: HeroConfig };
    team: { hero: HeroConfig };
}
