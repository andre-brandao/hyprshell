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
    position: opt<"top" | "bottom">("top"),
    layout: {
      start: opt<BarWidget[]>(["vitals", "workspaces", "focused"]),
      center: opt<BarWidget[]>(["media"]),
      end: opt<BarWidget[]>([
        "kb_layout",
        "idle",
        "tray",
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
  },

  notification: {
    position: opt<"top-right" | "top-left" | "bottom-right" | "bottom-left">(
      "bottom-left"
    ),
  },
});
