import { Astal, Gtk, type Gdk } from "astal/gtk3"

import Workspaces from "./widgets/workspaces"
import FocusedClient from "./widgets/FocusedClient"
import Media from "./widgets/Media"
import SysTray from "./widgets/sys-tray/SysTray"
// import Wifi from "./buttons/Wifi";
// import AudioSlider from "./buttons/AudioSlider";
import BatteryLevel from "./widgets/battery"
import Time from "./widgets/time/Time"
import IdleInibitor from "./widgets/IdleInhibitor"
import { options } from "@/options"
import Vitals, { CPU } from "./widgets/vitals"
import KBInput from "./widgets/KBLayout"
import DistroIcon from "./widgets/DistroIcon"
import QuickSettings from "@/components/ControlCenter/btn"
import { Variable } from "astal"

const { position } = options.bar
const { center, end, start } = options.bar.layout
const { padding, margin, border_radius, tranparent } =
	options.components.BarContainer
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
}
export type BarWidget = keyof typeof barWidget

export default function Bar(monitor: Gdk.Monitor) {
	const anchor = position((p) => {
		switch (p) {
			case "top":
				return (
					Astal.WindowAnchor.TOP |
					Astal.WindowAnchor.LEFT |
					Astal.WindowAnchor.RIGHT
				)
			case "bottom":
				return (
					Astal.WindowAnchor.BOTTOM |
					Astal.WindowAnchor.LEFT |
					Astal.WindowAnchor.RIGHT
				)
			default:
				return (
					Astal.WindowAnchor.TOP |
					Astal.WindowAnchor.LEFT |
					Astal.WindowAnchor.RIGHT
				)
		}
	})

	function getWidgets(ws: BarWidget[]) {
		return ws.map((w) => barWidget[w]({}))
	}

	return (
		<window
			className="Bar"
			gdkmonitor={monitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={anchor}
			// css={``}
		>
			<centerbox
				className={tranparent((v) =>
					v ? "transparent BarContainer" : "BarContainer opaque",
				)}
				css={Variable.derive(
					[padding, margin, border_radius],
					(p, m, br) => `
          padding: ${p};
          margin: ${m};
          border-radius: ${br};
          `,
				)()}
			>
				<box
					className={"BarStart"}
					hexpand
					halign={Gtk.Align.START}
				>
					{start(getWidgets)}
				</box>
				<box className={"BarCenter"}>
					{center(getWidgets)}

					{/* <COLROS></COLROS> */}
				</box>
				<box
					className={"BarEnd"}
					hexpand
					halign={Gtk.Align.END}
				>
					{end(getWidgets)}
				</box>
			</centerbox>
		</window>
	)
}
