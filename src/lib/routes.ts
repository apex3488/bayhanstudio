export const ROUTES = {
  home: "/",
  services: "/services/",
  about: "/about/",
  contact: "/contact/",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
