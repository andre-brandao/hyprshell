import Tray from "gi://AstalTray"

import { Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { App } from "astal/gtk3"

import PanelButton from "@/components/ui/PannelButton"
import PannelBox from "@/components/ui/PannelBox"
function SysTray() {
	const tray = Tray.get_default()

	// tray.

	return (
		<PannelBox className="SysTray">
			{bind(tray, "items").as((items) =>
				items.map((item) => {
					if (item.iconThemePath) App.add_icons(item.iconThemePath)

					const menu = item.create_menu()

					return (
						<PanelButton
							tooltipMarkup={bind(item, "tooltipMarkup")}
							onDestroy={() => menu?.destroy()}
							onClickRelease={(self) => {
								menu?.popup_at_widget(
									self,
									Gdk.Gravity.SOUTH,
									Gdk.Gravity.NORTH,
									null,
								)
							}}
						>
							<icon gIcon={bind(item, "gicon")} />
						</PanelButton>
					)
				}),
			)}
		</PannelBox>
	)
}

export default SysTray
