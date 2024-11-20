import { readFile } from "astal/file";
import { exec, GLib } from "astal";
import { Notify } from "../utils";

const stylixPath = `${GLib.getenv("HOME")}/.config/stylix/pallete.json`;

const currentThemePath = `${GLib.getenv(
  "HOME",
)}/.config/stylix/current-theme.json`;

const themeListDirectory = `${GLib.getenv("HOME")}/dotfiles/nixos/themes`;

/**
 * Parses a theme file and returns a StylixColors object.
 * @param filePath Path to the theme file.
 * @returns A StylixColors object or undefined if parsing fails.
 */
export function parseThemeFile(
  filePath: string,
): Base16ColorScheme | undefined {
  if (!GLib.file_test(filePath, GLib.FileTest.EXISTS)) {
    Notify({
      appName: "Stylix",
      summary: "Theme File Not Found",
      body: `File does not exist: ${filePath}`,
    });
    return;
  }

  const content = readFile(filePath);
  const lines = content.split("\n");

  const theme: Partial<Base16ColorScheme> = {};

  for (const line of lines) {
    const cleanedLine = line.split("#")[0].trim(); // Remove comments and trim whitespace
    if (!cleanedLine) continue; // Skip empty lines

    const [key, value] = cleanedLine.split(":").map((part) => part.trim());
    if (!key || !value) {
      Notify({
        appName: "Stylix",
        summary: "Invalid Line in Theme File",
        body: `Could not parse line: ${line}`,
      });
      return;
    }

    // Normalize and assign the value
    if (
      key.startsWith("base") &&
      value.startsWith('"') &&
      value.endsWith('"')
    ) {
      theme[key as keyof Base16ColorScheme] = `#${value.slice(1, -1)}`; // Remove quotes
    } else if (key === "scheme" || key === "author") {
      theme[key as keyof Base16ColorScheme] = value;
    } else {
      Notify({
        appName: "Stylix",
        summary: "Unexpected Key in Theme File",
        body: `Unexpected key: ${key}`,
      });
      return;
    }
  }

  // Validate all required keys
  const isValid = validateStylixColors(theme);
  if (!isValid) {
    return;
  }

  return theme as Base16ColorScheme;
}

/**
 * Validates the parsed StylixColors object.
 * @param colors Partial StylixColors object.
 * @returns True if valid, otherwise false.
 */
function validateStylixColors(colors: Partial<Base16ColorScheme>): boolean {
  const expectedKeys = [
    "scheme",
    "author",
    "base00",
    "base01",
    "base02",
    "base03",
    "base04",
    "base05",
    "base06",
    "base07",
    "base08",
    "base09",
    "base0A",
    "base0B",
    "base0C",
    "base0D",
    "base0E",
    "base0F",
  ];

  const missingKeys = expectedKeys.filter((key) => !(key in colors));

  if (missingKeys.length > 0) {
    Notify({
      appName: "Stylix",
      summary: "Invalid Theme File",
      body: `Missing keys: ${missingKeys.join(", ")}`,
    });
    return false;
  }

  return true;
}

export function listBase16Themes() {
  const fd = exec(`fd ".yaml" ${themeListDirectory}`);
  const files = fd.split(/\s+/);
  return files.map((f) => ({
    name: f.split("/").pop(),
    path: f,
  }));
}
