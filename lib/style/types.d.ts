type Base16ColorScheme = {
  scheme: string;
  author: string;
  base00: string;
  base01: string;
  base02: string;
  base03: string;
  base04: string;
  base05: string;
  base06: string;
  base07: string;
  base08: string;
  base09: string;
  base0A: string;
  base0B: string;
  base0C: string;
  base0D: string;
  base0E: string;
  base0F: string;
};

type Base16Key = keyof Base16ColorScheme;
type Base16Color = `$${Base16Key}`;

type Color = Base16Color | string;

type ClassVariants<T extends string> = {
  [K in T as `${K}-bg`]: string;
} & {
  [K in T as `${K}-fg`]: string;
} & {
  [K in T as `${K}-border`]: string;
} & {
  [K in T as `${K}-hover`]: string;
};

type AliasMap = {
  bg: Base16Key;
  "bg-alt": Base16Key;
  "bg-selected": Base16Key;
  fg: Base16Key;
  "fg-alt": Base16Key;
  "fg-light": Base16Key;
  color01: Base16Key;
  color02: Base16Key;
  color03: Base16Key;
  color04: Base16Key;
  color05: Base16Key;
  color06: Base16Key;
  color07: Base16Key;
  color08: Base16Key;
};
type AliasKeys = keyof AliasMap;

type StyledComponent = ClassVariants<Base16Key> & ClassVariants<AliasKeys>;

// Example: StyledComponent usage
//   const styledComponentExample: StyledComponent = {
//     "base00-bg": "#000000",
//     "base00-fg": "#FFFFFF",
//     "bg-bg": "#000000",
//     "bg-fg": "#FFFFFF",
//     "bg-hover": "#111111",
//     "bg-border": "#222222",
//     "fg-light-bg": "#666666",
//     "color01-fg": "#888888",
//   };
