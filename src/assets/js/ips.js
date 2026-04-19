export const trackVisit = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      await fetch("https://ipinfo-tawny-psi.vercel.app/api/ips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          path: window.location.pathname,
          lang: document.documentElement.lang,
          userAgent: navigator.userAgent,
          referrer: document.referrer || null,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          utm_term: params.get('utm_term'),
          utm_content: params.get('utm_content')
        })
      });
    } catch (error) {
      //console.error("Tracking error:", error);
    }
  };

 export const pingBackend = async ()=> {
    const apiUrl = "https://backend-gastronomico.onrender.com";
    try {
  
      const res = await fetch(apiUrl);
  
  
      const data = await res.text(); // o json()
  
    } catch (err) {
      //console.error("Error en fetch:", err);
    }
  };

import ScrollReveal from "scrollreveal";

ScrollReveal().reveal('.reveal', {
  distance: '40px',
  duration: 800,
  easing: 'ease',
  origin: 'bottom',
  interval: 100,
  reset: false // Cambia a true si quieres que se repita al hacer scroll
});