

export default {
    layout: {
        title: "Juan Sueldo DEV",
        description: "Porfolio de Juan Sueldo | Desarrollador web con 2 años de experiencia.",
    },
    nav:{
        about: "Sobre mí", 
        projects: "Proyectos",
        experience: "Experiencia",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
    },
    hero: {
        hello: "Hola,",
        name: "Soy Juan",
        text: "Desarrollador",
        hightlight_text: "WEB"
    },
    about:{
        title: "Sobre mí",
        intro: "Soy un desarrollador web full stack con 2 años de experiencia en el desarrollo de aplicaciones web.",
        specialization: "Me especializo en el desarrollo de aplicaciones web utilizando tecnologías como Laravel, JavaScript, PHP, HTML, CSS entre otras.",
        education: "Me gradué de la Universidad Tecnológica Nacional (UTN) en la carrera de Tecnicatura en Programación, donde desarrollé mis habilidades en diseño de software, bases de datos y metodologías ágiles de desarrollo.",
        passion: "Me apasiona el desarrollo de aplicaciones web y la creación de soluciones digitales eficientes y centradas en el usuario.",
        button_initial: "Descargar",
        button_highlight: "CV",
    },
    experience:{
        title: "Experiencia",
        experience: [
            {
                start: "Agosto 2023",
                end: "Presente",
                position: "Desarrollador Full Stack",
                company: "INTERPLAN S.A.",
                description:"Desarrollo de aplicaciones web y soporte técnico.",
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
                start: "Marzo 2022",
                end: "Junio 2023",
                position: "Desarrollador Front End",
                company: "PICCADELY",
                description:"Desarrollo de interfaces visuales para aplicaciones web.",
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
              title: "DragGrid",
              description:
                "Una librería JavaScript ligera para crear diseños de grillas con elementos arrastrables y redimensionables, perfecta para construir paneles de control, interfaces modulares y otros sistemas de interfaz.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["javascript", "html", "css"]
            },
            {
              title: "Shiftmanager",
              description:"Aplicación que permite registrar usuarios, médicos y pacientes, asignar y gestionar turnos, programar eventos en Google Calendar.",
              image: "/projects/demo-draggrid.png",
              live_url: "https://draggrid.netlify.app",
              url_code: "https://github.com/juansueldo/draggrid",
              technologies: ["laravel", "php", "javascript", "html", "css"]
            }
        ]
    },
    footer:{
        all_rights_reserved: "Todos los derechos reservados",
    }
}
