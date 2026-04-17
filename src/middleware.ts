import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const langHeader = request.headers.get("accept-language") || "";

    let lang = "en";
    if (langHeader.startsWith("es")) lang = "es";
    console.log(lang);
    return redirect(`/${lang}`);
  }

  return next();
});
