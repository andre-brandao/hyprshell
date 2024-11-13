import { Astal, Gtk, Gdk } from "astal/gtk3";

import Workspaces from "./buttons/Workspaces";
import FocusedClient from "./buttons/FocusedClient";
import Media from "./buttons/Media";
import SysTray from "./buttons/SysTray";
import Wifi from "./buttons/Wifi";
import AudioSlider from "./buttons/AudioSlider";
import BatteryLevel from "./buttons/Battery";
import Time from "./buttons/Time";
import IdleInibitor from "./buttons/IdleInhibitor";
import { options } from "../../options";
import Vitals, { CPU } from "./buttons/Vitals";

const { center, end, start } = options.bar.layout;

export const barWidget = {
  battery: BatteryLevel,
  time: Time,
  audio: AudioSlider,
  wifi: Wifi,
  tray: SysTray,
  media: Media,
  workspaces: Workspaces,
  focused: FocusedClient,
  idle: IdleInibitor,
  vitals: Vitals,
};
export type BarWidget = keyof typeof barWidget;

export default function Bar(monitor: Gdk.Monitor) {
  const anchor =
    Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT;

  function getWidgets(ws: BarWidget[]) {
    return ws.map((w) => barWidget[w]({}));
  }

  return (
    <window
      className="Bar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={anchor}
    >
      <centerbox>
        <box hexpand halign={Gtk.Align.START}>
          {start((value) => getWidgets(value))}
          {/* <Workspaces />
          <FocusedClient /> */}
        </box>
        <box>
          {center((value) => getWidgets(value))}
          {/* <Media /> */}
        </box>
        <box hexpand halign={Gtk.Align.END}>
          {end((value) => getWidgets(value))}
          {/* <IdleInibitor />
          <SysTray />
          <Wifi />
          <AudioSlider />
          <BatteryLevel />
          <Time /> */}
        </box>
      </centerbox>
    </window>
  );
}
