export const onRequest = ({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const langHeader = request.headers.get("accept-language") || "";

    const lang = langHeader.startsWith("es") ? "es" : "en";

    return redirect(`/${lang}`);
  }

  return next();
};
