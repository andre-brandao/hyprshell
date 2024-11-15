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
      text: opt<string | `#{"@theme_text_color"}`>("#141414"),
      base: opt<string | ` #{"@theme_base_color"}>`>(`#{"@theme_base_color"}`),
      selected_bg: opt(` #{"@theme_selected_bg_color"}`),
      selected_fg: opt(` #{"@theme_selected_fg_color"}`),

      fg: opt(`#51a4e7`),
      bg: opt(`#141414`),

      // fg: opt(`#{"@theme_fg_color"}`),
      // bg: opt(` #{"@theme_bg_color"}`),

      "primary-bg": opt(`#51a4e7`),
      "primary-fg": opt(`#141414`),

      error: opt("red"),
      "error-bg": opt(`#b13558`),
      "error-fg": opt(`#eeeeee`),

      padding: opt("7pt"),
      spacing: opt("12pt"),
      radius: opt("11px"),
      transition: opt("300ms"),
      shadows: opt(true),

      "widget-bg": opt(`gtkalpha(#080808, 0.94)`),

      "hover-bg": opt(`gtkalpha(#eeeeee, 0.94)`),
      "hover-fg": opt(`lighten($fg,8%)`),

      // border: opt(` #{"@theme_borders_color"}`),
      "border-width": opt("1px"),
      "border-color": opt(` #{"@theme_borders_color"}`),
      border: opt(`$border-width solid $border-color`),

      "active-gradient": opt(`linear-gradient(to right, $bg, darken($bg, 4%))`),
      "shadow-color": opt(`rgba(0,0,0,.6)`),
      "text-shadow": opt(`2pt 2pt 2pt $shadow-color`),
      "box-shadow": opt(
        `2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color`
      ),

      "popover-padding": opt("$padding * 1.6"),
      "popover-radius": opt("$radius + $popover-padding"),
      "popover-border-color": opt(`$border-color`),

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
    flat_buttons: opt<boolean>(true),
    layout: {
      start: opt<BarWidget[]>(["vitals", "focused"]),
      center: opt<BarWidget[]>(["workspaces"]),
      end: opt<BarWidget[]>([
        // "media"
        "tray",
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
      show_empty: opt<boolean>(true),
      mode: opt<"mini" | "full">("mini"),
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
