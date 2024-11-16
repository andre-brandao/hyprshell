import { Astal, Gtk, Gdk } from "astal/gtk3";

import Workspaces from "./workspaces/Workspaces";
import FocusedClient from "./buttons/FocusedClient";
import Media from "./buttons/Media";
import SysTray from "./sys-tray/SysTray";
// import Wifi from "./buttons/Wifi";
// import AudioSlider from "./buttons/AudioSlider";
import BatteryLevel from "./battery/Battery";
import Time from "./time/Time";
import IdleInibitor from "./buttons/IdleInhibitor";
import { options } from "@/options";
import Vitals, { CPU } from "./vitals/Vitals";
import KBInput from "./buttons/KBLayout";
import COLROS from "./ColorDebug";
import DistroIcon from "./buttons/DistroIcon";
import QuickSettings from "../quick-settings/QuickSettings";

const { center, end, start } = options.bar.layout;
const { padding, margin, border_radius } = options.bar;
export const barWidget = {
  distro: DistroIcon,
  battery: BatteryLevel,
  time: Time,
  // audio: AudioSlider,
  // wifi: Wifi,
  tray: SysTray,
  media: Media,
  workspaces: Workspaces,
  focused: FocusedClient,
  idle: IdleInibitor,
  vitals: Vitals,
  kb_layout: KBInput,
  quick_settings: QuickSettings,
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
      css={``}
    >
      <centerbox
        className={"BarContainer"}
        css={`
          padding: ${padding().get()};
          margin: ${margin().get()};
          border-radius: ${border_radius().get()};
        `}
      >
        <box className={"BarStart"} hexpand halign={Gtk.Align.START}>
          {start(getWidgets)}
        </box>
        <box className={"BarCenter"}>
          {center(getWidgets)}

          {/* <COLROS></COLROS> */}
        </box>
        <box className={"BarEnd"} hexpand halign={Gtk.Align.END}>
          {end(getWidgets)}
        </box>
      </centerbox>
    </window>
  );
}
