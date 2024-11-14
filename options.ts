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
  theme: {},
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
