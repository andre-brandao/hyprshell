import { App, Widget, type Gdk, Gtk } from "astal/gtk3"

import "./globals"
import "./src/options"
import { css } from "./src/lib/style"

import Bar from "@/components/Bar"
import NotificationPopups from "./src/components/Notification/NotificationPopups"
import Launcher from "./src/components/Launcher"
import { forEachMonitor } from "./src/lib/utils"
import { RegularWindow } from "./src/components/ui/RegularWindow"
import Settings from "@/components/Settings"
import OSD from "@/components/OSD/OSD"
// import PlayGround from "./Playgrond"

App.start({
	css: css,
	icons: "/home/andre/.config/ags/src/assets/icons",
	// gtkTheme: "adw-gtk3-dark",
	// instanceName: 'js',
	requestHandler(request, res) {
		try {
			print(request)
			res("ok")
		} catch (error) {
			printerr(error)
			res("error")
		}
	},
	main() {
		forEachMonitor((m: Gdk.Monitor) => [Bar(m), NotificationPopups(m)])
		Launcher()
		Settings()
		OSD()
		// PlayGround()
	},
})
