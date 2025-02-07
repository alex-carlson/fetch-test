export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Fetch",
  description: "Find your next best friend",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse",
      href: "/browse",
    },
    {
      label: "Favorites",
      href: "/favorites",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse",
      href: "/browse",
    },
    {
      label: "Favorites",
      href: "/favorites"
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
  api: {
    baseUrl: "https://frontend-take-home-service.fetch.com"
  },
};
