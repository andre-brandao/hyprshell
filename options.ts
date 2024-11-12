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

print("OPTIONS", OPTIONS);
export const options = mkOptions(OPTIONS, {
  bar: {
    start: opt<BarWidget[]>(["workspaces", "focused"]),
    center: opt<BarWidget[]>(["media"]),
    end: opt<BarWidget[]>(["idle", "tray", "wifi", "audio", "battery", "time"]),
  },
});

print("opt", options);
