export const trackVisit = async () => {
    try {
      await fetch("https://ipinfo-tawny-psi.vercel.app/api/ips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          path: window.location.pathname,
          lang: document.documentElement.lang,
          userAgent: navigator.userAgent,
          referrer: document.referrer || null
        })
      });
    } catch (error) {
      //console.error("Tracking error:", error);
    }
  };