export const WALLPAPER_SECTIONS = [
  { id: "desktop", title: "Desktop" },
  { id: "abstract", title: "Abstract" },
];

export const WALLPAPERS = [
  {
    id: "1",
    category: "desktop",
    label: "Sonoma Horizon",
    url: "/wallpapers/pexels-codioful-6984997.jpg",
  },
  {
    id: "2",
    category: "desktop",
    label: "Redwoods",
    url: "/wallpapers/pexels-codioful-6985120.jpg",
  },
  {
    id: "3",
    category: "desktop",
    label: "Utah Evening",
    url: "/wallpapers/pexels-codioful-6985193.jpg",
  },
  {
    id: "4",
    category: "desktop",
    label: "San Francisco Bay",
    url: "/wallpapers/pexels-codioful-7135034.jpg",
  },
];

export function frameStyleFromUrl(url) {
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

export function getWallpaperById(id) {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
}
