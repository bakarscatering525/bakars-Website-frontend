const FALLBACK_PATH = "/api/v1";
const DEV_FALLBACK_URL = `http://localhost:8000${FALLBACK_PATH}`;
const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function normalizeUrl(url?: string) {
  if (!url) return undefined;
  return url.replace(/\/+$/, "");
}

function isLoopbackUrl(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return LOOPBACK_HOSTNAMES.has(parsed.hostname);
  } catch {
    // Relative paths (e.g. "/api/v1") are fine and should not be treated as loopback.
    return false;
  }
}

function isRunningOnLoopbackHost() {
  if (typeof window === "undefined") {
    return false;
  }
  return LOOPBACK_HOSTNAMES.has(window.location.hostname);
}

export function resolveApiBaseUrl() {
  const sameOriginFallback =
    typeof window !== "undefined"
      ? normalizeUrl(`${window.location.origin}${FALLBACK_PATH}`)
      : undefined;

  const envApiUrl = normalizeUrl(import.meta.env.VITE_API_URL);
  if (envApiUrl) {
    if (isLoopbackUrl(envApiUrl) && !isRunningOnLoopbackHost() && sameOriginFallback) {
      console.warn(
        "VITE_API_URL points to a local address but the app is not running locally. Using same-origin API instead."
      );
      return sameOriginFallback;
    }
    return envApiUrl;
  }

  let envBaseUrl = normalizeUrl(import.meta.env.VITE_API_BASE_URL);
  if (envBaseUrl) {
    if (envBaseUrl.toLowerCase().includes("/api/docs")) {
      const sanitized = normalizeUrl(envBaseUrl.replace(/\/api\/docs.*$/i, ""));
      console.warn(
        "VITE_API_BASE_URL should point to the API root, not the docs route. Using the API base instead."
      );
      envBaseUrl = sanitized;

      if (!envBaseUrl) {
        return sameOriginFallback ?? DEV_FALLBACK_URL;
      }
    }

    if (isLoopbackUrl(envBaseUrl) && !isRunningOnLoopbackHost() && sameOriginFallback) {
      console.warn(
        "VITE_API_BASE_URL points to a local address but the app is not running locally. Using same-origin API instead."
      );
      return sameOriginFallback;
    }

    const lower = envBaseUrl.toLowerCase();
    const alreadyHasApiSegment =
      lower.includes("/api/") || lower.endsWith("/api") || lower.includes("/api?");
    return alreadyHasApiSegment ? envBaseUrl : `${envBaseUrl}${FALLBACK_PATH}`;
  }

  if (sameOriginFallback) {
    if (import.meta.env.PROD) {
      console.warn(
        "VITE_API_URL/VITE_API_BASE_URL not set. Falling back to same-origin API path:",
        sameOriginFallback
      );
    }
    return sameOriginFallback ?? DEV_FALLBACK_URL;
  }

  return DEV_FALLBACK_URL;
}

export const apiBaseUrl = resolveApiBaseUrl();
export const apiFallbackPath = FALLBACK_PATH;
