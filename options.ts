import { Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal/variable";

export class OptM<T = unknown> extends Variable<T> {
  id: string = "";
  initial: T;
  constructor(initial: T) {
    super(initial);
    this.initial = initial;
  }

  reset() {
    this.set(this.initial);
  }
}
const opt = <T>(initial: T) => new OptM<T>(initial);

import { barWidget, type BarWidget } from "./widget/bar/Bar";
export const options = {
  bar: {
    start: opt<BarWidget[]>(["workspaces", "focused"]),
    center: opt<BarWidget[]>(["media"]),
    end: opt<BarWidget[]>(["idle", "tray", "wifi", "audio", "battery", "time"]),
  },
};
