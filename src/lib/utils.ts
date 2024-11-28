import { type Variable, GLib, bind } from "astal"
import { Astal, type Gtk, type Gdk, App } from "astal/gtk3"
import {
	readFile,
	readFileAsync,
	writeFile,
	writeFileAsync,
	monitorFile,
	Gio,
} from "astal/file"

import { subprocess, exec, execAsync } from "astal/process"

export function forEachMonitor(
	createWidgets: (mon: Gdk.Monitor) => Gtk.Widget[],
) {
	const widgetMap = new Map<Gdk.Monitor, Gtk.Widget[]>()

	for (const gdkmonitor of App.get_monitors()) {
		widgetMap.set(gdkmonitor, createWidgets(gdkmonitor))
	}

	App.connect("monitor-added", (_, gdkmonitor) => {
		widgetMap.set(gdkmonitor, createWidgets(gdkmonitor))
	})

	App.connect("monitor-removed", (_, gdkmonitor) => {
		for (const widget of widgetMap.get(gdkmonitor) ?? []) {
			widget.destroy()
		}
		widgetMap.delete(gdkmonitor)
	})
}
export function ensureDirectory(path: string) {
	if (!GLib.file_test(path, GLib.FileTest.EXISTS)) {
		print(`creating directory: ${path}`)
		GLib.mkdir_with_parents(path, 0o777)
		// exec(["mkdir", "-p", path]);
		// writeFile(path, "");
	}
}
export function ensureFile(path: string) {
	ensureDirectory(path.split("/").slice(0, -1).join("/"))
	if (!GLib.file_test(path, GLib.FileTest.EXISTS)) {
		print(`creating file: ${path}`)
		writeFile(path, "")
		// exec(["touch", path]);
		// GLib.file_set_contents(path, "");
	}
}

/**
 * @returns true if all of the `bins` are found
 */
export function dependencies(...bins: string[]) {
	const missing = bins.filter((bin) => {
		execAsync(`which ${bin}`)
			.then((out) => true)
			.catch((err) => false)
	})

	if (missing.length > 0) {
		// if (options.debug.notify_missing_deps().get()) {
		//   Notify({
		//     appName: "Astal",
		//     summary: "Missing Dependencies",
		//     body: `missing dependencies: ${missing.join(", ")}`,
		//     urgency: "critical",
		//     iconName: "dialog-error",
		//   });
		// }
		console.warn(Error(`missing dependencies: ${missing.join(", ")}`))
		// notify(`missing dependencies: ${missing.join(", ")}`);
	}

	return missing.length === 0
}

/**
 * @returns execAsync(cmd)
 */
export function sh(cmd: string | string[]) {
	return execAsync(cmd).catch((err) => {
		printerr(typeof cmd === "string" ? cmd : cmd.join(" "), err)
		return ""
	})
}

/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bash(
	strings: TemplateStringsArray | string,
	...values: unknown[]
) {
	const cmd =
		typeof strings === "string"
			? strings
			: strings.flatMap((str, i) => `${str}${values[i] ?? ""}`).join("")

	return execAsync(["bash", "-c", cmd]).catch((err) => {
		console.error(cmd, err)
		return ""
	})
}

/**
 * @returns [start...length]
 */
export function range(length: number, start = 1) {
	return Array.from({ length }, (_, i) => i + start)
}

export const divide = ([total, used]: number[], round: boolean): number => {
	const percentageTotal = (used / total) * 100
	if (round) {
		return total > 0 ? Math.round(percentageTotal) : 0
	}
	return total > 0 ? Number.parseFloat(percentageTotal.toFixed(2)) : 0
}

/**
 *
 * @param notifPayload
 */
export const Notify = (notifPayload: {
	appName?: string
	body?: string
	iconName?: string
	id?: number
	summary?: string
	urgency?: "low" | "normal" | "critical"
	category?: string
	timeout?: number
	transient?: boolean
}): void => {
	let command = "notify-send"
	command += ` "${notifPayload.summary} "`
	if (notifPayload.body) command += ` "${notifPayload.body}" `
	if (notifPayload.appName) command += ` -a "${notifPayload.appName}"`
	if (notifPayload.iconName) command += ` -i "${notifPayload.iconName}"`
	if (notifPayload.urgency) command += ` -u "${notifPayload.urgency}"`
	if (notifPayload.timeout !== undefined)
		command += ` -t ${notifPayload.timeout}`
	if (notifPayload.category) command += ` -c "${notifPayload.category}"`
	if (notifPayload.transient) command += " -e"
	if (notifPayload.id !== undefined) command += ` -r ${notifPayload.id}`

	execAsync(command)
}
