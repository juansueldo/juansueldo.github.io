import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/es") || url.pathname.startsWith("/en")) {
    return next();
  }

  if (url.pathname === "/") {
    const acceptLang = request.headers.get("accept-language") || "";

    let lang = "en";
    if (acceptLang.startsWith("es")) lang = "es";

    return redirect(`/${lang}`);
  }

  return next();
});
