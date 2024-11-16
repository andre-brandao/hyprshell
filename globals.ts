import Gtk from "gi://Gtk"
import GLib from "gi://GLib?version=2.0"
import { ensureDirectory } from "./lib/utils"

declare global {
	const OPTIONS: string
	const TMP: string
	const USER: string
	const ALIGN: {
		START: number
		CENTER: number
		END: number
		FILL: number
	}
}

Object.assign(globalThis, {
	OPTIONS: `${GLib.get_user_cache_dir()}/ags/options.json`,
	TMP: `${GLib.get_tmp_dir()}/asztal`,
	USER: GLib.get_user_name(),
	ALIGN: {
		START: Gtk.Align.START,
		CENTER: Gtk.Align.CENTER,
		END: Gtk.Align.END,
		FILL: Gtk.Align.FILL,
	},
})

ensureDirectory(TMP)
