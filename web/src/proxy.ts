import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const PROTECTED_ROUTES = ["/system"];
const locales = ["pt", "en"];
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // 1. Verifica se a URL já tem o idioma (ex: /pt/about ou /en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // 2. Se não tem idioma, fazemos um REDIRECT real para a URL com o idioma detetado
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url,
    );
    // Preserva os query parameters se existirem (ex: ?foo=bar)
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  // 3. Verificação de rotas protegidas (ex: /pt/system ou /en/system)
  // Como a rota já tem o locale, precisamos de validar se começa com o prefixo protegido ignorando o locale ou ajustando a verificação.
  // Uma forma simples é remover o locale do pathname para testar os PROTECTED_ROUTES:
  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${locales.join("|")})`), "") || "/";

  const shouldProtect = PROTECTED_ROUTES.some((prefix) =>
    pathnameWithoutLocale.startsWith(prefix),
  );

  if (shouldProtect) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // Redireciona para o login mantendo o idioma atual, se quiseres
      const currentLocale =
        locales.find((l) => pathname.startsWith(`/${l}`)) || defaultLocale;
      return NextResponse.redirect(
        new URL(`/${currentLocale}/auth/login`, request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
