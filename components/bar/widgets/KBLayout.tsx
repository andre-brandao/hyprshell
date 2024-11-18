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
import PannelBox from "@/components/ui/PannelBox"
import PopupWindow from "@/components/ui/popup/PopUp"
import PanelButton from "@/components/ui/PannelButton"
import { RegularWindow } from "@/components/ui/RegularWindow"
import { App } from "astal/gtk3"
import SlidingText from "@/components/ui/SlidingText"

export default function KBInput() {
	const hypr = Hyprland.get_default()
	// TODO: Fix not showing up on startup

	const popup = (
		<RegularWindow
			name="Shortcuts"
			application={App}
			visible={false}
			// @ts-expect-error
			onDeleteEvent={(self) => {
				self.hide()
				return true
			}}
		>
			<Shortcuts />
		</RegularWindow>
	)
	return (
		<PannelBox className={"KBLayout"}>
			<PanelButton
				onClicked={() => {
					if (popup.visible) return popup.hide()
					popup.show()
				}}
				setup={(self) => {
					self.label = " "
					hypr.connect("keyboard-layout", (_, kb, layout) => {
						print("keyboard-layout", kb, layout)
						self.label = `${layoutMap[layout as LayoutKeys] ?? ".."}`

						self.tooltipText = `kb: ${kb} \nlayout: ${layout}`
					})
				}}
			/>
		</PannelBox>
	)
}

function Shortcuts() {
	const hypr = Hyprland.get_default()
	const binds = hypr.get_binds()

	// binds[0].

	function formatModMask(modmask: number) {
		if (modmask === 0) return ""
		if (modmask === 8) return "Alt"
		if (modmask === 64) return "SUPER"
		if (modmask === 65) return "SUPER+Shift"

		return `modmask: ${modmask}`
	}

	return (
		<scrollable className="ShortcutsBox">
			<box vertical>
				{binds.map((bind) => (
					<box
						css={`
							padding: 0.5em;
					`}
					>
						<box className="key">
							<label label={`${formatModMask(bind.modmask)} ${bind.key}`} />
						</box>
						<box
							className="action"
							expand
							halign={ALIGN.END}
						>
							<label
								label={`${formatKeybindPath(bind.arg)} ${bind.dispatcher}`}
							/>
						</box>
					</box>
				))}
			</box>
		</scrollable>
	)
}

function formatKeybindPath(input: string): string {
	const nixStorePrefix = /\/nix\/store\/[^/]+\/bin\//
	return input.replace(nixStorePrefix, "")
}
