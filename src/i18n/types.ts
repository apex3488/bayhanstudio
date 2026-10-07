export type Locale = "ru" | "uz" | "en";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
  };
  loader: {
    brand: string;
    initializing: string;
    ready: string;
  };
  hero: {
    line1: string;
    line2: string;
    support: string;
    primary: string;
    secondary: string;
    status: string;
    coords: string;
  };
  home: {
    gatesLabel: string;
    gatesTitle: string;
    gateServices: string;
    gateServicesText: string;
    gateAbout: string;
    gateAboutText: string;
    gateContact: string;
    gateContactText: string;
    open: string;
    previewLabel: string;
    previewTitle: string;
    previewCta: string;
    aboutTeaserLabel: string;
    aboutTeaserTitle: string;
    aboutTeaserText: string;
    aboutTeaserCta: string;
    contactStripTitle: string;
    contactStripText: string;
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    hint: string;
    pageCta: string;
    items: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
      points: string[];
    }>;
  };
  about: {
    label: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    lead: string;
    manifesto: string[];
    combine: string;
    tags: Array<{ title: string; text: string }>;
    facts: Array<{ value: string; label: string }>;
    focusTitle: string;
    focusText: string;
    cta: string;
  };
  philosophy: {
    label: string;
    title: string;
    subtitle: string;
    nodes: Array<{
      id: string;
      title: string;
      text: string;
    }>;
  };
  process: {
    label: string;
    title: string;
    steps: Array<{
      number: string;
      title: string;
      text: string;
    }>;
  };
  contact: {
    label: string;
    title1: string;
    title2: string;
    title3: string;
    lead: string;
    cta: string;
    telegram: string;
    channel: string;
    instagram: string;
    phone: string;
    hours: string;
    hoursValue: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};
