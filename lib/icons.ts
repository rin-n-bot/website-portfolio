export type IconItem = 
{
  name: string;
  path: string;
  href?: string;
  bg: string;
  forceWhite?: boolean;
};

export const icons: IconItem[] = 
[
  { name: "Claude", path: "/claude-ai-icon.svg", bg: "#D97757", forceWhite: true },
  { name: "Figma", path: "/figma.svg", bg: "#1E1E1E" },
  { name: "VS Code", path: "/vscode.svg", bg: "#fff" },
  { name: "GitHub", path: "/github_dark.svg", bg: "#2D2D2D" },
  { name: "Postman", path: "/postman.svg", bg: "#FF6C37" },
  { name: "DeepSeek", path: "/deepseek.svg", bg: "#4D6BFE", forceWhite: true },
  { name: "Firebase", path: "/firebase.svg", bg: "#3A2A00" },
  { name: "PostgreSQL", path: "/postgresql.svg", bg: "#336791" },
  { name: "Vite", path: "/vite.svg", bg: "#1A1A3A" },
  { name: "Docker", path: "/docker.svg", bg: "#fff" },
];