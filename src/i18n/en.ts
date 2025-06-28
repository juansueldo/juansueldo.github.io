export default {
    layout: {
        title: "Juan Sueldo DEV",
        description: "adasdasd",
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
        intro: "I'm a full stack developer with 2 years of experience in web application development. I specialize in developing web applications using technologies like React, Next.js, Tailwind CSS, among others.",
        specialization: "I specialize in developing web applications using technologies like React, Next.js, Tailwind CSS, among others.",
        education: "I graduated from the National Technological University (UTN) in the Programming Technician degree, where I developed my skills in software design, databases, and agile development methodologies.",
        passion: "I'm passionate about building clean, efficient, and user-centered digital solutions.",
        button_initial: "Download",
        button_highlight: "CV",
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
                start: "March 2022",
                end: "June 2023",
                position: "Front End Developer",
                company: "PICCADELY",
                description:"Visual interface development for web applications.",
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