import { getYearsOfExperience } from "../utils/experience";
const yearsOfExperience = getYearsOfExperience();
export default {
    layout: {
        title: "Juan Sueldo DEV",
        description: `Juan Sueldo's Portfolio | Web Developer with ${yearsOfExperience} years of experience`,
    },
    nav:{
        about: "About", 
        projects: "Projects",
        experience: "Experience",
        light: "Light",
        dark: "Dark",
        system: "System",
    },
    hero: {
        hello: "Hello,",
        name: "I'm Juan",
        text: "WEB",
        hightlight_text: "DEVELOPER"
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
    experience:{
        title: "Experience",
        experience: [
            {
                start: "August 2023",
                end: "Present",
                position: "Full Stack Developer",
                company: "INTERPLAN S.A.",
                description:"Web application development and technical support.",
                technologies: [
                    'CodeIgniter',
                    'PHP',
                    'MySQL',
                    'JavaScript',
                    'HTML',
                    'CSS',
                    'Bootstrap',
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
              "image": "/projects/demo-draggrid.png",
              "live_url": "https://landing-saas-mu.vercel.app",
              "url_code": "https://github.com/juansueldo/landing_saas",
              "technologies": ["react"]
            },
            {
              "title": "Gastronomic SaaS Mobile App",
              "description": "Frontend application for managing a gastronomic SaaS system, specifically mobile-oriented. It allows management of key business operations through an intuitive, fast interface adapted for real-world usage. Built with React and Capacitor for a native app experience.",
              "image": "/projects/demo-draggrid.png",
              "live_url": "https://mobile-tomatina.vercel.app",
              "url_code": "https://github.com/juansueldo/mobile-tomatina",
              "technologies": ["react", "capacitor"]
            },
            {
              "title": "Gastronomic Backend API",
              "description": "Backend API for a gastronomic system, responsible for business logic, data management, and database communication. It includes endpoints for managing users, orders, and system operations, ensuring scalability and performance.",
              "image": "/projects/demo-draggrid.png",
              "live_url": "https://backend_gastronomico.onrender.com",
              "url_code": "https://github.com/juansueldo/backend_gastronomico",
              "technologies": ["node", "express", "postgres"]
            },
            {
              title: "DragGrid",
              description:
                "A lightweight JavaScript library for creating grid layouts with draggable and resizable elements, perfect for building dashboards, control panels, and other modular interface systems.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["javascript", "html", "css"]
            },
            {
              title: "Shiftmanager",
              description:"App that allows you to register users, doctors and patients, to assign and manage shifts, scheduling events on Google Calendar.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["laravel", "php", "javascript", "html", "css"]
            }
        ]
    },
    footer:{
        all_rights_reserved: "All rights reserved",
    }
    
}
