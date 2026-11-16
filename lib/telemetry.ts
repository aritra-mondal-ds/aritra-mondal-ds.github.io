// Client-side, privacy-first, zero-cookie telemetry and recruiter analytics engine.
// 100% CNIL and GDPR compliant: no personal IP addresses, no tracking cookies, ephemeral session storage.

export type TelemetryEventName =
  | "page_view"
  | "cv_download"
  | "recruiter_modal_open"
  | "pipeline_modal_open"
  | "contact_copy"
  | "contact_click"
  | "schedule_call_click"
  | "terminal_command"
  | "company_greeting_click"
  | "scroll_depth"
  | "language_switch";

export interface TelemetryEvent {
  id: string;
  name: TelemetryEventName;
  timestamp: string;
  properties?: Record<string, unknown>;
}

export interface TelemetrySession {
  sessionId: string;
  sessionStartTime: string;
  deviceType: "Mobile" | "Tablet" | "Desktop";
  locale: "en" | "fr";
  referrer: string;
  companyDetected: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  eventsCount: number;
  events: TelemetryEvent[];
  scrollDepthReached: number;
}

const SESSION_STORAGE_KEY = "am_telemetry_session";
const DISMISSED_COMPANY_BANNER_KEY = "am_company_banner_dismissed";

function generateSessionId(): string {
  return "sess_" + Math.random().toString(36).substring(2, 10);
}

function detectDevice(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const width = window.innerWidth;
  if (width < 640) return "Mobile";
  if (width < 1024) return "Tablet";
  return "Desktop";
}

export function getCompanyFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const company = params.get("company") || params.get("ref") || params.get("client") || params.get("org");
  if (!company) return null;
  // Sanitize: alphanumeric, spaces, dashes, periods only, max 40 chars
  return company.replace(/[^a-zA-Z0-9\s._-]/g, "").trim().substring(0, 40);
}

export function isCompanyBannerDismissed(company: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const dismissed = sessionStorage.getItem(`${DISMISSED_COMPANY_BANNER_KEY}_${company.toLowerCase()}`);
    return dismissed === "true";
  } catch {
    return false;
  }
}

export function dismissCompanyBanner(company: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${DISMISSED_COMPANY_BANNER_KEY}_${company.toLowerCase()}`, "true");
  } catch {
    // Non-fatal
  }
}

export function getOrCreateSession(locale: "en" | "fr" = "en"): TelemetrySession {
  if (typeof window === "undefined") {
    return {
      sessionId: "server_render",
      sessionStartTime: new Date().toISOString(),
      deviceType: "Desktop",
      locale,
      referrer: "direct",
      companyDetected: null,
      utmSource: null,
      utmCampaign: null,
      eventsCount: 0,
      events: [],
      scrollDepthReached: 0,
    };
  }

  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TelemetrySession;
      parsed.locale = locale;
      return parsed;
    }
  } catch {
    // Fallback to fresh session
  }

  const params = new URLSearchParams(window.location.search);
  const detectedCompany = getCompanyFromUrl();

  const newSession: TelemetrySession = {
    sessionId: generateSessionId(),
    sessionStartTime: new Date().toISOString(),
    deviceType: detectDevice(),
    locale,
    referrer: document.referrer ? new URL(document.referrer, window.location.href).hostname : "Direct / Application Link",
    companyDetected: detectedCompany,
    utmSource: params.get("utm_source"),
    utmCampaign: params.get("utm_campaign"),
    eventsCount: 0,
    events: [],
    scrollDepthReached: 0,
  };

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
  } catch {
    // SessionStorage quota exceeded or disabled
  }

  return newSession;
}

export function trackEvent(name: TelemetryEventName, properties?: Record<string, unknown>, locale: "en" | "fr" = "en"): void {
  if (typeof window === "undefined") return;

  const session = getOrCreateSession(locale);
  const event: TelemetryEvent = {
    id: "evt_" + Math.random().toString(36).substring(2, 9),
    name,
    timestamp: new Date().toISOString(),
    properties,
  };

  session.eventsCount += 1;
  session.events.push(event);

  // Keep last 40 events to conserve memory
  if (session.events.length > 40) {
    session.events = session.events.slice(-40);
  }

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Non-fatal
  }

  // Optional real-time webhook dispatch (Discord, Telegram, or custom monitoring endpoint)
  // To activate, user can set NEXT_PUBLIC_TELEMETRY_WEBHOOK or localStorage.setItem("AM_TELEMETRY_WEBHOOK", "<url>")
  try {
    const webhookUrl =
      process.env.NEXT_PUBLIC_TELEMETRY_WEBHOOK ||
      (typeof localStorage !== "undefined" ? localStorage.getItem("AM_TELEMETRY_WEBHOOK") : null);

    if (webhookUrl && (name === "page_view" || name === "cv_download" || name === "recruiter_modal_open" || name === "schedule_call_click")) {
      const payload = {
        content: `⚡ **Portfolio Recruiter Alert**: \`${name}\`\n• Company / Ref: **${session.companyDetected || "Direct"}**\n• Device: ${session.deviceType} | Locale: ${session.locale.toUpperCase()}\n• Source: ${session.referrer}\n• Timestamp: ${new Date().toLocaleTimeString("fr-FR")}`,
      };
      if (navigator.sendBeacon) {
        navigator.sendBeacon(webhookUrl, new Blob([JSON.stringify(payload)], { type: "application/json" }));
      } else {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    }
  } catch {
    // Silent failover
  }
}

export function updateScrollDepth(depthPercent: number, locale: "en" | "fr" = "en"): void {
  if (typeof window === "undefined") return;
  const session = getOrCreateSession(locale);
  if (depthPercent > session.scrollDepthReached) {
    session.scrollDepthReached = depthPercent;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Non-fatal
    }
    if ([25, 50, 75, 100].includes(depthPercent)) {
      trackEvent("scroll_depth", { depth: `${depthPercent}%` }, locale);
    }
  }
}

export function getTelemetrySnapshot(locale: "en" | "fr" = "en") {
  const session = getOrCreateSession(locale);
  const elapsedSec = Math.floor((Date.now() - new Date(session.sessionStartTime).getTime()) / 1000);
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = elapsedSec % 60;
  const durationStr = `${minutes}m ${seconds}s`;

  return {
    sessionId: session.sessionId,
    device: session.deviceType,
    locale: session.locale,
    targetCompany: session.companyDetected || "Direct / Organic Application",
    trafficSource: session.referrer,
    sessionDuration: durationStr,
    totalActionsRecorded: session.eventsCount,
    scrollDepth: `${session.scrollDepthReached}%`,
    recentEvents: session.events.slice(-5).map((e) => ({
      event: e.name,
      time: new Date(e.timestamp).toLocaleTimeString(),
      detail: e.properties || {},
    })),
  };
}

export function generateTrackedUrl(company: string, locale: "en" | "fr" = "en"): string {
  const base = "https://aritra-mondal-ds.github.io";
  const path = locale === "fr" ? "/fr/" : "/";
  const cleanCompany = encodeURIComponent(company.trim().replace(/\s+/g, "-").toLowerCase());
  return `${base}${path}?company=${cleanCompany}&ref=${cleanCompany}-application`;
}
