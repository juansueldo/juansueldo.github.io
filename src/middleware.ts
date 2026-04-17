import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/es") || url.pathname.startsWith("/en")) {
    return next();
  }

  if (url.pathname === "/") {
    const acceptLang = request.headers.get("accept-language") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);

    let lang = "en";
    if (acceptLang.startsWith("es")) lang = "es";

    if (isBot) {
      return redirect(`/${lang}`);
    }

    const newUrl = new URL(`/${lang}`, request.url);
    return next(new Request(newUrl, request));
  }

  return next();
});
