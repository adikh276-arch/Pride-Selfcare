declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

const BASE_PATH = '/pride';

/**
 * Centrally preserves active URL query parameters (lang, upa_id, uid, service, etc.)
 * when navigating to a new path or route.
 */
export const preserveQueryParams = (targetPath: string): string => {
  if (typeof window === 'undefined' || !window.location) {
    return targetPath;
  }

  const [pathname, targetQuery] = targetPath.split('?');
  const currentParams = new URLSearchParams(window.location.search || '');

  // Normalize legacy 'source' param to 'service'
  if (currentParams.has('source')) {
    const val = currentParams.get('source');
    if (val && !currentParams.has('service')) {
      currentParams.set('service', val);
    }
    currentParams.delete('source');
  }

  // Fallback to cached upa_id / uid / user_id from sessionStorage if missing
  if (!currentParams.has('upa_id')) {
    try {
      const cachedUpa = sessionStorage.getItem('fw_upa_id') || sessionStorage.getItem('upa_id');
      if (cachedUpa) currentParams.set('upa_id', cachedUpa);
    } catch {
      // ignore
    }
  }

  if (!currentParams.has('uid')) {
    try {
      const cachedUid = sessionStorage.getItem('uid') || sessionStorage.getItem('user_id');
      if (cachedUid) currentParams.set('uid', cachedUid);
    } catch {
      // ignore
    }
  }

  if (targetQuery) {
    const targetParams = new URLSearchParams(targetQuery);
    targetParams.forEach((value, key) => {
      if (key === 'source') {
        currentParams.set('service', value);
      } else {
        currentParams.set(key, value);
      }
    });
  }

  const mergedSearch = currentParams.toString();
  return mergedSearch ? `${pathname}?${mergedSearch}` : pathname;
};

/**
 * Centrally handles exit across all contexts:
 * 1. React Native WebView -> window.ReactNativeWebView.postMessage
 * 2. iframe inside web.mantracare.com -> window.parent.postMessage
 * 3. Standalone browser or Localhost fallback -> redirects to https://web.mantracare.com/tasks
 */
export function handleExit() {
  if (typeof window === 'undefined') return;

  // 1. React Native WebView
  if (window.ReactNativeWebView) {
    try {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          action: 'exit',
        })
      );
    } catch (e) {
      console.error('Failed to postMessage to ReactNativeWebView:', e);
    }
    return;
  }

  // 2. iframe inside web.mantracare.com or any parent window
  if (window.parent !== window) {
    try {
      // Support structured message for web.mantracare.com
      window.parent.postMessage(
        {
          action: 'exit',
        },
        '*'
      );
      // Also post legacy string for older shell wrappers
      window.parent.postMessage('exit_activity', '*');
    } catch (e) {
      console.error('Failed to postMessage to parent:', e);
    }
    return;
  }

  // 3. Standalone browser or Localhost fallback
  window.location.href = 'https://web.mantracare.com/tasks';
}

export const handleExternalExit = handleExit;
export const handlePlatformExit = handleExit;

/**
 * Checks if the user entered from the Self Care Resources hub / dashboard.
 */
export const isOpenedFromDashboard = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const fromHub =
      sessionStorage.getItem('opened_from_hub') === 'true' ||
      sessionStorage.getItem('fw_opened_from_dashboard') === 'true';
    if (fromHub) return true;

    if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
      const refUrl = new URL(document.referrer);
      const refPath = refUrl.pathname.replace(new RegExp(`^${BASE_PATH}`), '') || '/';
      if (refPath === '/' || refPath === '') {
        return true;
      }
    }
  } catch {
    // ignore
  }
  return false;
};

/**
 * Centrally handles navigation after completion or back button:
 * - If opened from Self Care Resources -> routes back to the hub ('/' or saved hub_return_url)
 * - If opened directly (deep link / standalone task) -> executes handleExit()
 */
export const handleExitOrDashboard = (router?: {
  push?: (path: string) => void;
  replace?: (path: string) => void;
  back?: () => void;
}) => {
  if (isOpenedFromDashboard()) {
    // If browser history has a previous internal entry, navigate back cleanly
    if (
      typeof window !== 'undefined' &&
      window.history.length > 1 &&
      document.referrer &&
      document.referrer.includes(window.location.host)
    ) {
      if (router?.back) {
        router.back();
        return;
      }
      window.history.back();
      return;
    }

    let returnUrl = '/';
    try {
      returnUrl = sessionStorage.getItem('hub_return_url') || '/';
    } catch {
      returnUrl = '/';
    }

    // Strip leading /pride (basePath) if present, since Next.js router automatically prefixes basePath
    let relativeUrl = returnUrl;
    if (relativeUrl.startsWith(BASE_PATH)) {
      relativeUrl = relativeUrl.slice(BASE_PATH.length);
    }
    if (!relativeUrl.startsWith('/')) {
      relativeUrl = '/' + relativeUrl;
    }

    const finalPath = preserveQueryParams(relativeUrl);

    if (router) {
      if (router.replace) {
        router.replace(finalPath);
      } else if (router.push) {
        router.push(finalPath);
      }
    } else if (typeof window !== 'undefined') {
      const fullUrl = returnUrl.startsWith(BASE_PATH)
        ? returnUrl
        : `${BASE_PATH}${returnUrl.startsWith('/') ? returnUrl : `/${returnUrl}`}`;
      window.location.replace(preserveQueryParams(fullUrl));
    }
  } else {
    handleExit();
  }
};

/**
 * Handles back routing, delegating to onBackCallback or handleExitOrDashboard.
 */
export const goBack = (
  onBackCallback?: () => void,
  router?: { push?: (path: string) => void; replace?: (path: string) => void; back?: () => void }
) => {
  if (onBackCallback) {
    onBackCallback();
  } else {
    handleExitOrDashboard(router);
  }
};

/**
 * Redirects back to Dashboard / Exit.
 */
export const goToDashboard = (router?: {
  push?: (path: string) => void;
  replace?: (path: string) => void;
  back?: () => void;
}) => {
  handleExitOrDashboard(router);
};

/**
 * Attaches current language and preserved params to target url
 */
export const withLang = (url: string) => {
  if (typeof window === 'undefined' || !url) return url;
  return preserveQueryParams(url);
};
