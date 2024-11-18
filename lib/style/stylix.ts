import { readFile } from "astal/file";
import { GLib } from "astal";
import { Notify } from "../utils";

type StylixColors = {
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
  scheme: string;
};

const stylixPath = `${GLib.getenv("HOME")}/.config/stylix/pallete.json`;

function getStylixColors() {
  if (GLib.file_test(stylixPath, GLib.FileTest.EXISTS)) {
    Notify({
      appName: "Stylix",
      summary: "Stylix Config Not Found",
    });
  }
  const stylixText = readFile(stylixPath);

  const stylixJSON = JSON.parse(stylixText);

  const isValid = validateStylixColors(stylixJSON);

  if (!isValid) {
    Notify({
      appName: "Stylix",
      summary: "Stylix Config Invalid",
    });
    return;
  }

  const stylixColors = stylixJSON as StylixColors;
  //   validate json

  return stylixColors;
}

function validateStylixColors(colors: JSON) {
  const keys = Object.keys(colors);
  const expectedKeys = [
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
    // "scheme",
  ];
  const missingKeys = expectedKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    Notify({
      appName: "Stylix",
      summary: "Stylix Invalid Config",
      body: `missing keys: ${missingKeys.join(", ")}`,
    });
  }

  return missingKeys.length === 0;
}
