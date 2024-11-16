import {
	layoutMap,
	type HyprctlDeviceLayout,
	type HyprctlKeyboard,
	type HyprctlMouse,
	type KbLabelType,
	type LayoutKeys,
	type LayoutValues,
	getKeyboardLayout,
} from "@/lib/modules/kbLayout"
import { bind, execAsync, Variable } from "astal"
import Hyprland from "gi://AstalHyprland"
import PannelBox from "../../PannelBox"

export default function KBInput() {
	const hypr = Hyprland.get_default()
	// TODO: Fix not showing up on startup
	return (
		<PannelBox className={"KBLayout"}>
			<label
				setup={(self) => {
					self.label = " "
					hypr.connect("keyboard-layout", (_, kb, layout) => {
						print("keyboard-layout", kb, layout)
						self.label = `${layoutMap[layout as LayoutKeys] ?? ".."}`

						self.tooltipText = `kb: ${kb} \nlayout: ${layout}`
					})
				}}
			></label>
		</PannelBox>
	)
}
