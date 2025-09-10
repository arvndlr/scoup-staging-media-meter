import { create } from "zustand";

const storageKey = "onboarding-store-v1";

const safeGet = () => {
  try {
    const raw = sessionStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const safeSet = (state) => {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {}
};

const initial = {
  account: { firstName: "", lastName: "", jobTitle: "" },
  keywords: { main: [], additional: [], excluded: [] },
  socialSources: { twitter: [], facebook: [], reddit: [], youtube: [] },
  publishers: [], // [{ id, websiteLink, publicationName }]
};

const restored = safeGet() || initial;

export const useOnboardingStore = create((set, get) => ({
  ...restored,

  // Account
  setAccount: (partial) =>
    set((s) => {
      const next = { ...s, account: { ...s.account, ...partial } };
      safeSet(next);
      return next;
    }),

  // Keywords
  setKeywords: (partial) =>
    set((s) => {
      const next = {
        ...s,
        keywords: {
          main:       partial.main       ?? s.keywords.main,
          additional: partial.additional ?? s.keywords.additional,
          excluded:   partial.excluded   ?? s.keywords.excluded,
        },
      };
      safeSet(next);
      return next;
    }),

  // Social sources (twitter/facebook/reddit/youtube arrays of strings/links)
  setSocialSources: (partial) =>
    set((s) => {
      const next = {
        ...s,
        socialSources: { ...s.socialSources, ...partial },
      };
      safeSet(next);
      return next;
    }),

  // Publishers
  setPublishers: (rows) =>
    set((s) => {
      const next = { ...s, publishers: Array.isArray(rows) ? rows : [] };
      safeSet(next);
      return next;
    }),

  resetAll: () => {
    safeSet(initial);
    set(initial);
  },
}));
