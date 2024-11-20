import { Variable, GLib, bind } from "astal"

import PopupWindow from "@/components/ui/popup/PopUp"
import PannelButton from "@/components/ui/PannelButton"
import { Gtk, Astal, type Widget } from "astal/gtk3"

import { options } from "@/options"

// const {} = option

function PannelBox(props: Widget.BoxProps) {
	return (
		<box
			{...props}
			setup={(s) => s.toggleClassName("PannelBox", true)}
		/>
	)
}

export default PannelBox
