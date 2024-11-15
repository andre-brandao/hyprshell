import { readFile, writeFile } from "astal/file";

import { subprocess, exec, execAsync } from "astal/process";
import { ensureDirectory, ensureFile } from "@/lib/utils";
import { App } from "astal/gtk3";
import { Opt } from "@/lib/option";
import { options } from "@/options";

// @ts-expect-error
import mixins from "inline:./mixins.scss";

const themeCSS = options.theme.css;

const tmpCSS = `${TMP}/tmp_styles.scss`;
export const css = `${TMP}/style.css`;

const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;

const variables = () =>
  Object.entries(themeCSS)
    .map(([key, value]) => $(key, value.get().toString()))
    .join("\n");

const imports = () => {
  const fd = exec(`fd ".scss" /home/andre/.config/ags/style/widgets`);
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
            `
  );
  exec(`sass ${tmpCSS} ${css}`);

  // print(mixins);
  // print(readFile(tmpCSS));
  App.apply_css(css, true);
}

resetCss();

export function applyCss() {
  resetCss();
}
