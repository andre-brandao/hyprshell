import { monitorFile, readFile, writeFile } from "astal/file";

import { subprocess, exec, execAsync } from "astal/process";
import { ensureDirectory, ensureFile } from "@/lib/utils";
import { App } from "astal/gtk3";
import { Opt } from "@/lib/option";
import { options } from "@/options";

const { base16, colors } = options.themev2;

// @ts-expect-error
import mixins from "inline:./mixins.scss";
import GLib from "gi://GLib?version=2.0";

// const themeCSS = options.theme.css;

const tmpCSS = `${TMP}/tmp_styles.scss`;
export const css = `${TMP}/style.css`;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const $ = (name: string, value: string | Opt<any>) => {
  if (value instanceof Opt) {
    return `$${name}: ${value.get()};`;
  }
  return `$${name}: ${value};`;
};

// base00 - Default Background
// base01 - Lighter Background (Used for status bars, line number and folding marks)
// base02 - Selection Background
// base03 - Comments, Invisibles, Line Highlighting
// base04 - Dark Foreground (Used for status bars)
// base05 - Default Foreground, Caret, Delimiters, Operators
// base06 - Light Foreground (Not often used)
// base07 - Light Background (Not often used)
// base08 - Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
// base09 - Integers, Boolean, Constants, XML Attributes, Markup Link Url
// base0A - Classes, Markup Bold, Search Text Background
// base0B - Strings, Inherited Class, Markup Code, Diff Inserted
// base0C - Support, Regular Expressions, Escape Characters, Markup Quotes
// base0D - Functions, Methods, Attribute IDs, Headings
// base0E - Keywords, Storage, Selector, Markup Italic, Diff Changed
// base0F - Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>

function mkBaseClass(variable: string) {
  return `
  .${variable}-bg{
    background-color: $${variable};
  }
  .${variable}-fg{
    color: $${variable};
  }
  .${variable}-border{
    border-color: $${variable};
  }
  .${variable}-hover{
    &:hover{
      background-color: $${variable};
    }
  }`;
}

const baseVars = () =>
  Object.entries(options.themev2.base16)
    .map(([key, value]) => $(key, value))
    .join("\n");

const baseClasses = () =>
  Object.keys(options.themev2.base16).map(mkBaseClass).join("\n");

function transparantize(color: Opt<string>, opacity: Opt<number>) {
  return `transparentize(${color.get()}, ${opacity.get() / 100})`;
}
const variables = () =>
  [
    $("font-size", options.font.size),
    $("font-name", options.font.name),

    $("color01", base16.base08),
    $("color02", base16.base09),
    $("color03", base16.base0A),
    $("color04", base16.base0B),
    $("color05", base16.base0C),
    $("color06", base16.base0D),
    $("color07", base16.base0E),
    $("color08", base16.base0F),
    // BG
    $("bg", transparantize(colors.bg.color, colors.bg.opacity)),
    $("bg-alt", transparantize(colors.bg.alt, colors.bg.opacity)),
    $("bg-selected", transparantize(colors.bg.selected, colors.bg.opacity)),
    // FG
    $("fg", transparantize(colors.fg.color, colors.fg.opacity)),
    $("fg-alt", transparantize(colors.fg.alt, colors.fg.opacity)),
    $("fg-light", transparantize(colors.fg.light, colors.fg.opacity)),
    // BORDER
    $(
      "border-color",
      transparantize(colors.border.color, colors.border.opacity),
    ),
    $("border-width", colors.border.width),
    $("border", "$border-width solid $border-color"),
    // WIDGET
    $("widget-bg", transparantize(colors.widget.bg, colors.widget.opacity)),
    $("widget-fg", transparantize(colors.widget.fg, colors.widget.opacity)),
    // HOVER
    $("hover-bg", transparantize(colors.hover.bg, colors.hover.opacity)),
    $("hover-fg", transparantize(colors.hover.fg, colors.hover.opacity)),

    // ERROR
    $("error-bg", colors.error.bg),
    $("error-fg", colors.error.fg),

    // SHADOWS
    $("shadows", colors.shadows.enabled),
    $("shadow-color", "rgba(0,0,0,.6)"),
    $("text-shadow", "2pt 2pt 2pt $shadow-color"),
    $(
      "box-shadow",

      "2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color",
    ),

    // OTHERS
    // $("padding", options.theme.padding),
    $("transition", colors.other.transition),
    $("spacing", colors.other.spacing),
    $("radius", colors.other.radius),
  ].join("\n");

const imports = () => {
  const fd = exec(`fd ".scss" ${GLib.getenv("HOME")}/.config/ags/components`);
  const files = fd.split(/\s+/);
  return files
    .map((f) => `@import '${f}';`)
    .reverse()
    .join("\n");
};

const functions = () =>
  `@function gtkalpha($c, $a) {
  @return string.unquote("alpha(#{$c},#{$a})");
}`;
function resetCss() {
  ensureDirectory(tmpCSS);
  ensureFile(tmpCSS);
  ensureFile(css);

  writeFile(
    tmpCSS,
    `
@use "sass:string";
${functions()}
${baseVars()}
${baseClasses()}
${variables()}
${mixins}
${imports()}
`,
  );
  exec(`sass ${tmpCSS} ${css}`);

  // print(mixins);
  // print(readFile(tmpCSS));

  print("Applying CSS");
  App.apply_css(css, true);
}

// monitorFile
options.handler(["font", "theme", "bar"], resetCss);
resetCss();

export function applyCss() {
  resetCss();
}
