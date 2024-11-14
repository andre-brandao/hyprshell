import { Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal/variable";
import { mkOptions, opt } from "./lib/option";

import { barWidget, type BarWidget } from "./widget/bar/Bar";

// export const options = {
//   bar: {
//     start: opt<BarWidget[]>(["workspaces", "focused"]),
//     center: opt<BarWidget[]>(["media"]),
//     end: opt<BarWidget[]>(["idle", "tray", "wifi", "audio", "battery", "time"]),
//   },
// };
export const options = mkOptions(OPTIONS, {
  theme: {
    // https://gitlab.gnome.org/GNOME/gtk/-/blob/gtk-3-24/gtk/theme/Adwaita/_colors-public.scss
    css: {
      text: opt(` #{"@theme_text_color"}`),
      base: opt(` #{"@theme_base_color"}`),
      selected_bg: opt(` #{"@theme_selected_bg_color"}`),
      selected_fg: opt(` #{"@theme_selected_fg_color"}`),
      accent: opt(` #{"@theme_selected_bg_color"}`),

      fg: opt(`#{"@theme_fg_color"}`),
      bg: opt(` #{"@theme_bg_color"}`),

      "primary-bg": opt(` #{"@theme_selected_bg_color"}`),
      "primary-fg": opt(` #{"@theme_selected_fg_color"}`),

      error: opt("red"),
      "error-bg": opt(` #FF0000`),
      "error-fg": opt(` #FFFFFF`),

      padding: opt("4px"),
      spacing: opt("0.5em"),
      radius: opt("15px"),
      transition: opt("300ms"),
      shadows: opt(true),

      "widget-bg": opt(`gtkalpha(#eeeeee, 0.94)`),

      "hover-bg": opt(`gtkalpha(#eeeeee, 0.94)`),
      "hover-fg": opt(` #{"@theme_text_color"}`),

      // border: opt(` #{"@theme_borders_color"}`),
      "border-width": opt("1px"),
      "border-color": opt(` #{"@theme_borders_color"}`),
      border: opt(`$border-width 1px solid`),

      // "active-gradient": opt(`linear-gradient(to right, $bg, darken($bg, 4%))`),
      "shadow-color": opt(`rgba(0,0,0,.6)`),
      "text-shadow": opt(`2pt 2pt 2pt $shadow-color`),
      "box-shadow": opt(
        `2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color`
      ),

      "popover-padding": opt("$padding * 1.6"),
      "popover-radius": opt("$radius + $popover-padding"),

      "font-size": opt("1.3em"),
      "font-name": opt("Ubuntu"),

      "charging-bg": opt(`green`),
    },
  },
  bar: {
    padding: opt<string>("0.5em"),
    margin: opt<string>("0.5em"),
    border_radius: opt<string>("0.5em"),
    position: opt<"top" | "bottom">("top"),
    layout: {
      start: opt<BarWidget[]>(["vitals", "tray", "focused"]),
      center: opt<BarWidget[]>(["workspaces"]),
      end: opt<BarWidget[]>([
        // "media"
        "kb_layout",
        "idle",

        "wifi",
        "audio",
        "battery",
        "time",
      ]),
    },
    vitals: {
      cpu: {
        icon: opt<string>(" "),
        interval: opt<number>(1500),
      },
      ram: {
        interval: opt<number>(1500),
        round: opt<boolean>(true),
        icon: opt<string>(" "),
        lblType: opt<"used/total" | "used" | "free" | "percent">("used/total"),
      },
      storage: {
        icon: opt<string>(" "),
        interval: opt<number>(15000),
        round: opt<boolean>(true),
        lblType: opt<"used/total" | "used" | "free" | "percent">("used"),
      },
    },

    workspaces: {
      mode: opt<"active" | "number">("number"),
      show: opt<number>(7),
      label: opt<string | "id">("id"),
      focused_label: opt<string | "id">(""),
    },

    idle_inhibitor: {
      notify: opt<boolean>(true),
    },
  },

  notification: {
    position: opt<"top-right" | "top-left" | "bottom-right" | "bottom-left">(
      "bottom-left"
    ),
  },

  debug: {
    notify_missing_deps: opt<boolean>(true),
  },
});
