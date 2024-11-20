import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { RegularWindow } from "./components/ui/RegularWindow"
import { options } from "@/options"

const { base16 } = options.themev2

import { Variable, GLib, bind, Binding } from "astal"
import icons from "@/lib/icons"
import Icon from "./components/ui/Icon"

import { listBase16Themes, parseThemeFile } from "@/lib/style/stylix"

function applyToOptions(theme: Base16ColorScheme) {
	base16.base00.set(`${theme.base00}`)
	base16.base01.set(`${theme.base01}`)
	base16.base02.set(`${theme.base02}`)
	base16.base03.set(`${theme.base03}`)
	base16.base04.set(`${theme.base04}`)
	base16.base05.set(`${theme.base05}`)
	base16.base06.set(`${theme.base06}`)
	base16.base07.set(`${theme.base07}`)
	base16.base08.set(`${theme.base08}`)
	base16.base09.set(`${theme.base09}`)
	base16.base0A.set(`${theme.base0A}`)
	base16.base0B.set(`${theme.base0B}`)
	base16.base0C.set(`${theme.base0C}`)
	base16.base0D.set(`${theme.base0D}`)
	base16.base0E.set(`${theme.base0E}`)
	base16.base0F.set(`${theme.base0F}`)
}

export default function PlayGround() {
	const themes = listBase16Themes()

	const activeTheme = Variable<Base16ColorScheme>(
		{
			author: "André Brandão",
			scheme: "dark",
			base00: `${base16.base00.get()}`,
			base01: `${base16.base01.get()}`,
			base02: `${base16.base02.get()}`,
			base03: `${base16.base03.get()}`,
			base04: `${base16.base04.get()}`,
			base05: `${base16.base05.get()}`,
			base06: `${base16.base06.get()}`,
			base07: `${base16.base07.get()}`,
			base08: `${base16.base08.get()}`,
			base09: `${base16.base09.get()}`,
			base0A: `${base16.base0A.get()}`,
			base0B: `${base16.base0B.get()}`,
			base0C: `${base16.base0C.get()}`,
			base0D: `${base16.base0D.get()}`,
			base0E: `${base16.base0E.get()}`,
			base0F: `${base16.base0F.get()}`,
		},
		// [],
	)

	function applyTheme(theme: string) {
		const parsed = parseThemeFile(theme)

		if (!parsed) {
			return
		}

		activeTheme.set(parsed)
	}
	return (
		<RegularWindow
			visible={false}
			name={"Playground"}
			application={App}
			// @ts-expect-error
			onDeleteEvent={(self) => {
				self.hide()
				return true
			}}
		>
			<box>
				<box vertical>
					{activeTheme().as((c) => {
						return <BASE16 base16={c} />
					})}

					<button
						onClick={() => applyToOptions(activeTheme.get())}
						css={`
							background-color: ${activeTheme.get().base00};
							color: #${activeTheme.get().base05};
							`}
					>
						Aplicar tema {activeTheme.get().scheme}
					</button>
				</box>
				<scrollable>
					<box
						vertical
						expand
					>
						{themes.map((theme) => (
							<button onClick={() => applyTheme(theme.path)}>
								<label label={`${theme.name} `} />
							</button>
						))}
					</box>
				</scrollable>
			</box>
		</RegularWindow>
	)
}

function BASE16({ base16 }: { base16: Base16ColorScheme }) {
	return (
		<box vertical>
			{Object.entries(base16).map(([key, value]) => (
				<box
					css={`
					background-color: ${value};
					min-width: 250px;
					`}
				>
					<label label={key} />
					-
					<label label={value} />
				</box>
			))}
		</box>
	)
}

function COLORS({ colors }: { colors: string[] }) {
	return (
		<box vertical>
			{colors.map((color) => (
				<box
					css={`
				background-color: ${color};
				min-width: 250px;
				`}
				>
					<box>
						<Icon name={color} />
					</box>
					<label label={color.slice(0, 17)} />
				</box>
			))}
		</box>
	)
}
