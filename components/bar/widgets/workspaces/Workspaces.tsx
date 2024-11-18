import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import { options } from "@/options"
import { range } from "@/lib/utils"
import PannelBox from "@/components/ui/PannelBox"

const { show, label, focused_label, mode, show_empty } = options.bar.workspaces

function Workspaces() {
	const hypr = Hyprland.get_default()

	const wssBind = bind(hypr, "workspaces").as((wss) =>
		wss.filter((ws) => ws.id > 0).sort((a, b) => a.id - b.id),
	)

	return (
		<PannelBox className="Workspaces">
			{wssBind.as((wss) => {
				return range(!show_empty().get() ? wss.length : show().get(), 1).map(
					(i) => <WsButton index={i} />,
				)
			})}

			{/* {bind(hypr, "focusedWorkspace").as((fw) => {
				if (!show_empty().get()) return <box />
				if (fw.id < show().get()) {
					return <box />
				}

				return (
					<WsButton
						index={fw.id}
						className="focused"
					/>
				)
			})} */}
		</PannelBox>
	)
}

function WsButton({ index, className }: { index: number; className?: string }) {
	const hypr = Hyprland.get_default()

	const ws = hypr.get_workspace(index)

	// print("ws", ws);

	const formatLabel = Variable.derive(
		[bind(hypr, "focusedWorkspace"), focused_label, label],
		(focusadeWorkspace, fl, l) => {
			if (focusadeWorkspace.id === index) {
				return fl === "id" ? index : fl
			}

			if (ws) {
				return l === "id" ? index : fl
			}

			return l === "id" ? index : fl
		},
	)

	const formatClassName = Variable.derive(
		[bind(hypr, "focusedWorkspace"), show],
		(fw, s) => {
			const classes: string[] = []
			const left = hypr.get_workspace(index - 1)
			const right = hypr.get_workspace(index + 1)

			if (left) classes.push("left")

			if (index + 1 <= s && right) classes.push("right")

			if (fw.id === index) classes.push("focused")

			if (ws) {
				classes.push("occupied")
			}
			return classes.join(" ")
		},
	)
	return (
		<button
			className={formatClassName()}
			onClicked={() => hypr.dispatch("workspace", index.toString())}
		>
			{formatLabel()}
		</button>
	)
}

export default Workspaces
