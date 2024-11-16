import { Variable, GLib, bind } from "astal"

import PopupWindow from "@/widget/popup/PopUp"
import PannelButton from "@/widget/PannelButton"
import { Gtk, Astal, type Widget } from "astal/gtk3"

function PannelBox(props: Widget.BoxProps) {
	return (
		<box
			{...props}
			setup={(s) => s.toggleClassName("PannelBox", true)}
		/>
	)
}

export default PannelBox
