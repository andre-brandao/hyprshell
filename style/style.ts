// import style1 from "inline:./style.scss";
import { writeFile } from "astal/file";

import { subprocess, exec, execAsync } from "astal/process";
import { ensureDirectory, ensureFile } from "@/lib/utils";
import { App } from "astal/gtk3";
// import { SRC } from "@/env";

const tempcss = `${TMP}/tmp_styles.scss`;
export const css = `${TMP}/style.css`;

function resetCss() {
  // https://gitlab.gnome.org/GNOME/gtk/-/blob/gtk-3-24/gtk/theme/Adwaita/_colors-public.scss
  ensureDirectory(tempcss);
  ensureFile(tempcss);
  ensureFile(css);
  const fd = exec(`fd ".scss" /home/andre/.config/ags/style`);
  const files = fd.split(/\s+/);
  const imports = files.map((f) => `@import '${f}';`);

  writeFile(
    tempcss,
    `
@use "sass:string";
// https://gitlab.gnome.org/GNOME/gtk/-/blob/gtk-3-24/gtk/theme/Adwaita/_colors-public.scss

$fg: #{"@theme_fg_color"};
$bg: #{"@theme_bg_color"};

$text: #{"@theme_text_color"};
$base: #{"@theme_base_color"};
$selected_bg: #{"@theme_selected_bg_color"};
$selected_fg: #{"@theme_selected_fg_color"};
$border: #{"@theme_borders_color"};

$accent: #{"@theme_selected_bg_color"};
$radius: 15px;
$error: red;

$font-size: 1.3em;

@function gtkalpha($c, $a) {
  @return string.unquote("alpha(#{$c},#{$a})");
}

${imports.join("\n")}
`
  );
  exec(`sass ${tempcss} ${css}`);

  App.apply_css(css, true);
}

resetCss();

export function applyCss() {
  resetCss();
}
