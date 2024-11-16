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
// dark: {
//   primary: {
//       bg: opt("#51a4e7"),
//       fg: opt("#141414"),
//   },
//   error: {
//       bg: opt("#e55f86"),
//       fg: opt("#141414"),
//   },
//   bg: opt("#171717"),
//   fg: opt("#eeeeee"),
//   widget: opt("#eeeeee"),
//   border: opt("#eeeeee"),
// },
export const options = mkOptions(OPTIONS, {
  font: {
    size: opt("1.2em"),
    name: opt("Ubuntu"),
  },
  // https://gitlab.gnome.org/GNOME/gtk/-/blob/gtk-3-24/gtk/theme/Adwaita/_colors-public.scss
  theme: {
    bg: opt("#171717"),
    fg: opt("#eeeeee"),
    primary: {
      fg: opt("#51a4e7"),
      bg: opt("#141414"),
    },
    error: {
      bg: opt("#e55f86"),
      fg: opt("#141414"),
    },
    border: {
      color: opt("#51a4e7"),
      width: opt("1px"),
      opacity: opt(50),
    },
    widget: {
      color: opt("#080808"),
      opacity: opt(40),
    },
    blur: opt(0),
    shadows: opt(true),
    padding: opt("7pt"),
    spacing: opt("8pt"),
    radius: opt("11px"),
    transition: opt("300ms"),
  },
  bar: {
    position: opt<"top" | "bottom">("top"),
    flat_buttons: opt<boolean>(true),
    BarContainer: {
      padding: opt<string>("0.5em"),
      margin: opt<string>("0.5em"),
      border_radius: opt<string>("0.5em"),
      tranparent: opt<boolean>(false),
    },
    PannelBox: {},
    layout: {
      start: opt<BarWidget[]>([
        "distro",
        "vitals",
        // "focused",
        "media",
      ]),
      center: opt<BarWidget[]>(["workspaces"]),
      end: opt<BarWidget[]>([
        // "media"
        "tray",
        "kb_layout",
        "idle",

        "quick_settings",
        // "wifi",
        // "audio",
        "time",
        "battery",
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
    battery: {
      charging: opt<string>("#51a4e7"),
    },

    idle_inhibitor: {
      notify: opt<boolean>(true),
    },
  },

  notification: {
    position: opt<"top-right" | "top-left" | "bottom-right" | "bottom-left">(
      "bottom-left",
    ),
  },

  debug: {
    notify_missing_deps: opt<boolean>(true),
  },
});
