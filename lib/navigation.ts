export const NAV_SECTION_BY_LABEL: Record<string, string> = {
  Home: "home",
  About: "about",
  Skills: "skills",
  Experience: "experience",
  Projects: "projects",
  "Personal Projects": "personal-projects",
  Certifications: "achievements",
  Contact: "contact",
};

export function getSectionIdForNavLabel(label: string) {
  return NAV_SECTION_BY_LABEL[label] ?? label.toLowerCase();
}

export function scrollToHash(href: string, options?: ScrollIntoViewOptions) {
  const targetId = href.replace(/^#/, "");
  const target = document.getElementById(targetId);

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    ...options,
  });
  globalThis.history.replaceState(null, "", href);
}
