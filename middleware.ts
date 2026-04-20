import { NextRequest, NextResponse } from 'next/server'

const COUNTRY_LANG_MAP: Record<string, string> = {
  IR: 'fa',
  US: 'en',
  AE: 'ar',
  GB: 'en',
  SA: 'ar',
}

const LOCAL_IPS = ['127.0.0.1', '::1', 'localhost']
const DEV_DEFAULT_COUNTRY = 'IR' // ← set your country here for local dev

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  let country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry')

  if (!country) {
    // if local IP, skip API and use dev default
    if (LOCAL_IPS.includes(ip)) {
      country = DEV_DEFAULT_COUNTRY
    } else {
      // real IP but no platform header → call API
      try {
        const res = await fetch(`https://ipapi.co/${ip}/country/`)
        country = (await res.text()).trim()
      } catch {
        country = DEV_DEFAULT_COUNTRY
      }
    }
  }

  const lang = COUNTRY_LANG_MAP[country] ?? 'en'

  const hasLocale = /^\/(fa-IR|en-US|ar-AE|fa|en|ar)/.test(pathname)
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
