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
$theme_fg_color: "@theme_fg_color";
$theme_bg_color: "@theme_bg_color";
$bg: #212223;
$fg: #f1f1f1;
$accent: #378df7;
$radius: 7px;
$fg-color: #{"@theme_fg_color"};
$bg-color: #{"@theme_bg_color"};
$error: red;
${imports.join("\n")}
`

    // ${style2}
    // ${style3}
    // ${style4}
    // ${style5}
  );
  exec(`sass ${tempcss} ${css}`);

  App.apply_css(css, true);
}

resetCss();
