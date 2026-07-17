import { getYearsOfExperience } from "../utils/experience";
const yearsOfExperience = getYearsOfExperience();
export default {
    layout: {
        title: "Juan Sueldo DEV",
        description: `Porfolio de Juan Sueldo | Desarrollador web con ${yearsOfExperience} años de experiencia.`,
    },
    nav:{
        about: "Sobre mí", 
        skills: "Habilidades",
        experience: "Experiencia",
        projects: "Proyectos",
        contact: "Contacto",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
    },
    hero: {
        hello: "Hola,",
        name: "Soy Juan",
        role: "Desarrollador",
        hightlight_text: "Web",
        description: "Creo aplicaciones web modernas, rápidas y escalables con tecnologías actuales y buenas prácticas.",
        projectsLabel: "Ver proyectos",
        projectsUrl: "#projects",
        cvLabel: "Descargar CV",
        cvUrl: "/files/es/Juan_Sueldo_CV.pdf",
        githubLabel: "GitHub",
        githubUrl: "https://github.com/juansueldo",
        linkedinLabel: "LinkedIn",
        linkedinUrl: "https://ar.linkedin.com/in/juan-sueldo"
    },
    about:{
        title: "Sobre mí",
        intro: `Soy un desarrollador web full stack con ${yearsOfExperience} años de experiencia en el desarrollo de aplicaciones web.`,
        specialization: "Me especializo en el desarrollo de aplicaciones web utilizando tecnologías como Laravel, JavaScript, PHP, HTML, CSS entre otras.",
        education: "Me gradué de la Universidad Tecnológica Nacional (UTN) en la carrera de Tecnicatura en Programación, donde desarrollé mis habilidades en diseño de software, bases de datos y metodologías ágiles de desarrollo.",
        passion: "Me apasiona el desarrollo de aplicaciones web y la creación de soluciones digitales eficientes y centradas en el usuario.",
        button_initial: "Descargar",
        button_highlight: "CV",
        skills: "Habilidades",
        url: "/files/es/Juan_Sueldo_CV.pdf",
    },
    skills: {
        title: "Habilidades",
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
                title: "Bases de datos",
                icon: "database",
                technologies: ["MySQL", "PostgreSQL"],
            },
            {
                title: "Herramientas y plataformas",
                icon: "tools",
                technologies: ["Git", "Docker", "Capacitor"],
            },
        ],
    },
    experience:{
        title: "Experiencia",
        experience: [
            {
                start: "Agosto 2023",
                end: "Presente",
                position: "Desarrollador Full Stack",
                company: "INTERPLAN S.A.",
                description:"Desarrollo de aplicaciones web y mantenimiento de aplicaciones. Participo en el desarrollo de un SAAS omincanal que integra canales de comunicación como WhatsApp, Facebook Messenger, Instagram, entre otros, para brindar una experiencia de atención al cliente fluida y eficiente.",
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
                start: "Noviembre 2013",
                end: "Junio 2023",
                position: "Encargado de Logística y Atención al Cliente/Desarrollador Front End",
                company: "PICCADELY",
                description:"Durante 8 años desempeñé distintos roles en la empresa, abarcando atención al cliente, gestión de personal, logística y producción. En el último período, participé en el desarrollo de aplicaciones web internas, colaborando en la creación de interfaces y herramientas para optimizar procesos operativos.",
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
        title: "Proyectos",
        projects: [
            {
              title: "Landing Saas Gastronómico",
              description:
                "Landing page para un SaaS gastronómico, diseñada para presentar servicios de forma clara. El proyecto cuenta con componentes reutilizables y diseño responsive.",
              image: "/projects/landing_gastronomico.png",
              live_url: "https://comiio-landing.vercel.app/",
              url_code: "https://github.com/juansueldo/comiio_landing",
              technologies: ["Astro"]
            },
            {
              title: "Saas Gastronómico",
              description:
                "Aplicación frontend para la gestión de un sistema SaaS gastronómico, orientada a dispositivos móviles. Permite administrar operaciones clave del negocio mediante una interfaz intuitiva, rápida y adaptada a entornos reales de uso. Construida con React y Capacitor para una experiencia tipo app nativa.",
              image: "/projects/front_gastronomico.png",
              live_url: "https://front-gastronomico.vercel.app/demo",
              url_code: "https://github.com/juansueldo/front_gastronomico",
              technologies: ["React", "Capacitor"]
            },
            {
              title: "Backend Gastronómico",
              description:
                "API backend para un sistema gastronómico, encargada de la lógica de negocio, gestión de datos y comunicación con la base de datos. Incluye endpoints para manejar usuarios, pedidos y operaciones del sistema, asegurando escalabilidad y rendimiento.",
              image: "/projects/backend_gastronomico.png",
              live_url: "https://backend-gastronomico.onrender.com",
              url_code: "https://github.com/juansueldo/backend_gastronomico",
              technologies: ["Node", "Express", "PostgreSQL"]
            },
            {
                title: "IPInfo API",
                description: "API que proporciona información detallada de geolocalización y red a partir de una dirección IP.",
                image: "/projects/IPInfoAPI.png",
                live_url: "https://demo-ip-api.vercel.app",
                url_code: "https://github.com/juansueldo/ipinfo-js",
                technologies: ["Node", "Express", "JavaScript", "Docker"]
            },
            {
              title: "DragGrid",
              description:
                "Una librería JavaScript ligera para crear diseños de grillas con elementos arrastrables y redimensionables, perfecta para construir paneles de control, interfaces modulares y otros sistemas de interfaz.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["JavaScript", "HTML", "CSS"]
            },
            /*{
              title: "Shiftmanager",
              description:"Aplicación que permite registrar usuarios, médicos y pacientes, asignar y gestionar turnos, programar eventos en Google Calendar.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["Laravel", "PHP", "JavaScript", "HTML", "CSS"]
            }*/
        ]
    },
    contact:{
        title: "Contacto",
        intro_title: "¿Tienes un proyecto en mente?",
        intro_description: "Estoy disponible para nuevos proyectos y colaboraciones.",
        intro_cta: "¡Hablemos!",
        email: "hola@juansueldo.dev",
        location: "Argentina",
        response: "Respuesta rápida",
        name_placeholder: "Tu nombre",
        mail_placeholder: "Tu email",
        message_placeholder: "Tu mensaje",
        button_initial: "Enviar",
        button_highlight: "mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado!",
        error: "Error al enviar el mensaje",
        errName: "Por favor ingresa tu nombre (al menos 2 caracteres).",
        errEmail: "Por favor ingresa una dirección de email válida.",
        errMessage: "Por favor ingresa un mensaje.",
    },
    footer:{
        all_rights_reserved: "Todos los derechos reservados",
    }
}
