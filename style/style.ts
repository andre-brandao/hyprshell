import { monitorFile, readFile, writeFile } from "astal/file";

import { subprocess, exec, execAsync } from "astal/process";
import { ensureDirectory, ensureFile } from "@/lib/utils";
import { App } from "astal/gtk3";
import { Opt } from "@/lib/option";
import { options } from "@/options";

// @ts-expect-error
import mixins from "inline:./mixins.scss";

// const themeCSS = options.theme.css;

const tmpCSS = `${TMP}/tmp_styles.scss`;
export const css = `${TMP}/style.css`;

const $ = (name: string, value: string | Opt<any>) => {
  if (value instanceof Opt) {
    return `$${name}: ${value.get()};`;
  }
  return `$${name}: ${value};`;
};

// const variables = () =>
//   Object.entries(themeCSS)
//     .map(([key, value]) => $(key, value.get().toString()))
//     .join("\n");
const popoverPaddingMultiplier = 1.6;

const variables = () =>
  [
    $(
      "bg",
      options.theme.blur.get()
        ? `transparentize(${options.theme.bg}, ${
            options.theme.blur.get() / 100
          })`
        : options.theme.bg,
    ),
    $("fg", options.theme.fg),

    $("primary-bg", options.theme.primary.bg),
    $("primary-fg", options.theme.primary.fg),

    $("error", options.theme.error.bg),
    $("error-bg", options.theme.error.bg),
    $("error-fg", options.theme.error.fg),

    $("padding", options.theme.padding),
    $("spacing", options.theme.spacing),
    $("radius", options.theme.radius),
    // $("transition", `${options.transition}ms`),
    $("transition", options.theme.transition),

    $("shadows", options.theme.shadows),

    $(
      "widget-bg",
      `transparentize(${options.theme.widget.color.get()}, ${
        options.theme.widget.opacity.get() / 100
      })`,
    ),

    $(
      "hover-bg",
      `transparentize(${options.theme.widget.color.get()}, ${
        options.theme.widget.opacity.get() / 100
      })`,
    ),
    $("hover-fg", `lighten(${options.theme.fg.get()}, 8%)`),

    $("border-width", options.theme.border.width),
    $(
      "border-color",
      `transparentize(${options.theme.border.color.get()}, ${
        options.theme.border.opacity.get() / 100
      })`,
    ),
    $("border", "$border-width solid $border-color"),

    $(
      "active-gradient",
      `linear-gradient(to right, ${options.theme.primary.bg.get()}, darken(${options.theme.primary.bg.get()}, 4%))`,
    ),
    $("shadow-color", "rgba(0,0,0,.6)"),
    $("text-shadow", "2pt 2pt 2pt $shadow-color"),
    $(
      "box-shadow",

      "2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color",
    ),

    $(
      "popover-border-color",
      `transparentize(${options.theme.border.color.get()}, ${Math.max(
        (options.theme.border.opacity.get() - 1) / 100,
        0,
      )})`,
    ),
    $("popover-padding", `$padding * ${popoverPaddingMultiplier}`),
    $(
      "popover-radius",
      options.theme.radius.get() === "0" ? "0" : "$radius + $popover-padding",
    ),

    $("font-size", options.font.size),
    $("font-name", options.font.name),

    // etc
    $("charging-bg", options.bar.battery.charging),
  ].join("\n");

const imports = () => {
  const fd = exec(`fd ".scss" /home/andre/.config/ags/widget`);
  const files = fd.split(/\s+/);
  return files
    .map((f) => `@import '${f}';`)
    .reverse()
    .join("\n");
};

const functions = () => `
  @function gtkalpha($c, $a) {
    @return string.unquote("alpha(#{$c},#{$a})");
  }
  `;
function resetCss() {
  ensureDirectory(tmpCSS);
  ensureFile(tmpCSS);
  ensureFile(css);

  writeFile(
    tmpCSS,
    `
            @use "sass:string";
            ${functions()}
            ${variables()}
            ${mixins}
            ${imports()}
            `,
  );
  exec(`sass ${tmpCSS} ${css}`);

  // print(mixins);
  // print(readFile(tmpCSS));
  App.apply_css(css, true);
}

// monitorFile
options.handler(
  [
    "font",
    "theme",
    "bar.flatButtons",
    "bar.position",
    "bar.battery.charging",
    "bar.battery.blocks",
  ],
  resetCss,
);
resetCss();

export function applyCss() {
  resetCss();
}
