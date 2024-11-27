import { Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal/variable"
import { mkOptions, opt } from "./lib/option"

import { barWidget, type BarWidget } from "@/components/bar/Bar"
import type { Color } from "./lib/style/colors"

export const options = mkOptions(OPTIONS, {
	font: {
		size: opt("1.2em"),
		name: opt("Ubuntu"),
	},

	theme: {
		base16: {
			base00: opt("#000000"),
			base01: opt("#242422"),
			base02: opt("#484844"),
			base03: opt("#6c6c66"),
			base04: opt("#918f88"),
			base05: opt("#b5b3aa"),
			base06: opt("#d9d7cc"),
			base07: opt("#fdfbee"),
			base08: opt("#ff6c60"),
			base09: opt("#e9c062"),
			base0A: opt("#ffffb6"),
			base0B: opt("#a8ff60"),
			base0C: opt("#c6c5fe"),
			base0D: opt("#96cbfe"),
			base0E: opt("#ff73fd"),
			base0F: opt("#b18a3d"),
		},
		// This is also validbg
		// https://gitlab.gnome.org/GNOME/gtk/-/blob/gtk-3-24/gtk/theme/Adwaita/_colors-public.scss

		colors: {
			bg: {
				color: opt<Color>("$base00"),
				alt: opt<Color>("$base01"),
				selected: opt<Color>("$base02"),
				opacity: opt(0),
			},
			fg: {
				color: opt<Color>("$base05"),
				alt: opt<Color>("$base04"),
				light: opt<Color>("$base06"),
				opacity: opt(0),
			},
			widget: {
				// color: opt<Color>("$color01"),
				fg: opt<Color>("$color06"),
				bg: opt<Color>("$base00"),
				opacity: opt(40),
			},
			hover: {
				bg: opt<Color>("$color07"),
				fg: opt<Color>("$fg"),
				opacity: opt(60),
			},
			error: {
				bg: opt("#e55f86"),
				fg: opt("#141414"),
			},
			border: {
				color: opt("$color05"),
				width: opt("2px"),
				opacity: opt(50),
			},
			shadows: {
				enabled: opt(true),
				color: opt("rgba(0,0,0,.6)"),
				"text-shadow": opt("2pt 2pt 2pt $shadow-color"),
				"box-shadow": opt(
					"2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color",
				),
			},

			other: {
				transition: opt("300ms"),
				spacing: opt("8pt"),
				radius: opt("11px"),
				// padding: opt("7pt"),
			},
		},
	},

	components: {
		BarContainer: {
			padding: opt<string>("0.5em"),
			margin: opt<string>("0.5em"),
			border_radius: opt<string>("0.5em"),
			tranparent: opt<boolean>(false),
		},
		PannelBox: {
			margin: opt("1.5pt"),
			// classes: opt<string[]>(["bg-widget", "rounded"]),
			css: opt<string>(""),
			// background: opt("#")
		},
		PannelButton: {
			// classes: opt<string[]>(["bg-widget", "rounded"]),
		},
	},
	bar: {
		position: opt<"top" | "bottom">("top"),
		flat_buttons: opt<boolean>(true),

		layout: {
			start: opt<BarWidget[]>(["distro", "vitals", "media", "focused"]),
			center: opt<BarWidget[]>(["workspaces"]),
			end: opt<BarWidget[]>([
				// "media"
				"tray",
				"kb_layout",
				"idle",

				"quick_settings",

				"time",
				"battery",
			]),
		},
		vitals: {
			cpu: {
				interval: opt<number>(1500),
			},
			ram: {
				interval: opt<number>(1500),
				round: opt<boolean>(true),

				lblType: opt<"used/total" | "used" | "free" | "percent">("used/total"),
			},
			storage: {
				interval: opt<number>(15000),
				round: opt<boolean>(true),
				lblType: opt<"used/total" | "used" | "free" | "percent">("used"),
			},
		},

		workspaces: {
			show_empty: opt<boolean>(true),
			mode: opt<"mini" | "full">("mini"),
			show: opt<number>(7),
			label: opt<string | "id">("id"),
			focused_label: opt<string | "id">(""),
		},
		battery: {
			charging: opt<string>("#51a4e7"),
		},

		idle_inhibitor: {
			notify: opt<boolean>(true),
		},
	},

	notification: {
		position: opt<"top-right" | "top-left" | "bottom-right" | "bottom-left">(
			"bottom-left",
		),
	},

	debug: {
		notify_missing_deps: opt<boolean>(true),
	},
})
