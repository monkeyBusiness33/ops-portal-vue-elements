import { useUserStore } from "@/store/useUserStore";

export const generateID = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

/**
 * Returns token based on build mode
 **/
export const getChatApiToken = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_TOKEN;
  }
  return window.api_token;
};
/**
 * Returns hostname
 **/
export const getDomainName = () => {
  if (import.meta.env.DEV) {
    return new URL(import.meta.env.VITE_BASE_URL).host;
  }
  return window.location.host;
};

/**
 * Returns mode for chat
 **/
export const getChatModeId = () => {
  if (import.meta.env.DEV || !window.conversation_id) {
    // 4GLSz4VL88xzXXBPTLF3Vb
    return "";
  }
  return window.conversation_id;
};

export const removeOwnIdOnline = (users: number[]) => {
  if (Array.isArray(users)) {
    const userStore = useUserStore();
    const personId = userStore.getUser?.person?.id;
    return users.filter((el) => el !== personId);
  }
  return [];
};

export const getWsProtocol = () => {
  if (window.location.protocol === "https:") {
    return "wss://";
  }
  return "ws://";
};

export const getAxiosBaseUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BASE_URL;
  }
  return `${window.location.protocol}//${window.location.host}`;
};

export const getWebSocketBaseUrl = () => {
  const host = getDomainName();
  const protocol = getWsProtocol();

  return `${protocol}${host}`;
};

/**
 Method add throttle for events
 **/
export const throttle = (callback: any, delay: number) => {
  let lastCall: any = null;
  let lastResult: any = null;
  return (...args: any) => {
    const now = new Date().getTime();
    if (lastCall === null || now >= delay + lastCall) {
      lastCall = now;
      lastResult = callback(...args);
    }
    return lastResult;
  };
};
