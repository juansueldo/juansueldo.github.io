import { getYearsOfExperience } from "../utils/experience";
const yearsOfExperience = getYearsOfExperience();
export default {
    layout: {
        title: "Juan Sueldo DEV",
        description: `Juan Sueldo's Portfolio | Web Developer with ${yearsOfExperience} years of experience`,
    },
    nav:{
        about: "About", 
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
        light: "Light",
        dark: "Dark",
        system: "System",
    },
    hero: {
        hello: "Hello,",
        name: "I'm Juan",
        role: "Web",
        hightlight_text: "Developer",
        description: "I build modern, fast and scalable web applications using current technologies and best practices.",
        projectsLabel: "View projects",
        projectsUrl: "#projects",
        cvLabel: "Download CV",
        cvUrl: "/files/en/Juan_Sueldo_CV.pdf",
        githubLabel: "GitHub",
        githubUrl: "https://github.com/juansueldo",
        linkedinLabel: "LinkedIn",
        linkedinUrl: "https://ar.linkedin.com/in/juan-sueldo"
    },
    about:{
        title: "About",
        intro: `I'm a full stack developer with ${yearsOfExperience}  years of experience in web application development.`,
        specialization: "I specialize in developing web applications using technologies like Laravel, JavaScript, PHP, HTML, CSS among others.",
        education: "I graduated from the National Technological University (UTN) in the Programming Technician degree, where I developed my skills in software design, databases, and agile development methodologies.",
        passion: "I'm passionate about building clean, efficient, and user-centered digital solutions.",
        button_initial: "Download",
        button_highlight: "CV",
        skills: "Skills",
        url: "/files/en/Juan_Sueldo_CV.pdf",
    },
    skills: {
        title: "Skills",
        groups: [
            {
                title: "Frontend",
                icon: "frontend",
                technologies: ["HTML", "CSS", "JavaScript", "React", "Astro", "Tailwind CSS", "Bootstrap"],
            },
            {
                title: "Backend",
                icon: "backend",
                technologies: ["PHP", "Laravel", "CodeIgniter", "Node", "Express"],
            },
            {
                title: "Databases",
                icon: "database",
                technologies: ["MySQL", "PostgreSQL"],
            },
            {
                title: "Tools and platforms",
                icon: "tools",
                technologies: ["Git", "Docker", "Capacitor"],
            },
        ],
    },
    experience:{
        title: "Experience",
        experience: [
            {
                start: "August 2023",
                end: "Present",
                position: "Full Stack Developer",
                company: "INTERPLAN S.A.",
                description:"Web application development and maintenance. I participate in the development of a omnichannel SaaS that integrates communication channels like WhatsApp, Facebook Messenger, Instagram, among others, to provide a fluid and efficient customer service experience.",
                technologies: [
                    'CodeIgniter',
                    'PHP',
                    'MySQL',
                    'JavaScript',
                    'HTML',
                    'CSS',
                    'Bootstrap',
                    'React',
                    'Git'
                ],
            },
            {
                start: "November 2013",
                end: "June 2023",
                position: "Logistics and Customer Service Manager / Front-End Developer",
                company: "PICCADELY",
                description:"For 8 years, I held various roles within the company, including customer service, staff management, logistics, and production. In my most recent period there, I was involved in the development of internal web applications, collaborating on the creation of interfaces and tools aimed at optimizing operational processes.",
                technologies: [
                    'HTML',
                    'CSS',
                    'JavaScript',
                    'Tailwind CSS',
                ],
            }
        ]
    },
    projects:{
        title: "Projects",
        projects: [
            {
              "title": "Gastronomic SaaS Landing Page",
              "description": "Landing page for a gastronomic SaaS, designed to showcase services clearly. The project features reusable components and a fully responsive design.",
              "image": "/projects/landing_gastronomico.png",
              "live_url": "https://comiio-landing.vercel.app/",
              "url_code": "https://github.com/juansueldo/comiio_landing",
              "technologies": ["React"]
            },
            {
              "title": "Gastronomic SaaS Mobile App",
              "description": "Frontend application for managing a gastronomic SaaS system, specifically mobile-oriented. It allows management of key business operations through an intuitive, fast interface adapted for real-world usage. Built with React and Capacitor for a native app experience.",
              "image": "/projects/front_gastronomico.png",
              "live_url": "https://front-gastronomico.vercel.app/demo",
              "url_code": "https://github.com/juansueldo/front_gastronomico",
              "technologies": ["React", "Capacitor"]
            },
            {
              "title": "Gastronomic Backend API",
              "description": "Backend API for a gastronomic system, responsible for business logic, data management, and database communication. It includes endpoints for managing users, orders, and system operations, ensuring scalability and performance.",
              "image": "/projects/backend_gastronomico.png",
              "live_url": "https://backend-gastronomico.onrender.com",
              "url_code": "https://github.com/juansueldo/backend_gastronomico",
              "technologies": ["Node", "Express", "Postgres"]
            },
            {
                title: "IP API",
                description: "API that provides detailed geolocation and network information based on an IP address.",
                image: "/projects/IPInfoAPI.png",
                live_url: "https://demo-ip-api.vercel.app",
                url_code: "https://github.com/juansueldo/ipinfo-js",
                technologies: ["Node", "Express", "JavaScript", "Docker"]
            },
            {
              title: "DragGrid",
              description:
                "A lightweight JavaScript library for creating grid layouts with draggable and resizable elements, perfect for building dashboards, control panels, and other modular interface systems.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["JavaScript", "HTML", "CSS"]
            },
            /*{
              title: "Shiftmanager",
              description:"App that allows you to register users, doctors and patients, to assign and manage shifts, scheduling events on Google Calendar.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["Laravel", "PHP", "JavaScript", "HTML", "CSS"]
            }*/
        ]
    },
    contact:{
        title: "Contact",
        intro_title: "Have a project in mind?",
        intro_description: "I'm available for new projects and collaborations.",
        intro_cta: "Let's talk!",
        email: "hola@juansueldo.dev",
        location: "Argentina",
        response: "Quick response",
        name_placeholder: "Your name",
        mail_placeholder: "Your email",
        message_placeholder: "Your message",
        button_initial: "Send",
        button_highlight: "message",
        sending: "Sending...",
        success: "Message sent!",
        error: "Error sending message",
        errName: "Please enter your name (at least 2 characters).",
        errEmail: "Please enter a valid email address.",
        errMessage: "Please enter a message.",
    },
    footer:{
        all_rights_reserved: "All rights reserved",
    }
    
}
