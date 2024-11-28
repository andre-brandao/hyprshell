// import { App, Astal, Gdk, Gtk } from "astal/gtk3"
// import { RegularWindow } from "./components/ui/RegularWindow"
// import { options } from "@/options"

// const { base16 } = options.theme

// import { Variable, GLib, bind, Binding } from "astal"
// import icons from "@/lib/icons"
// import Icon from "./components/ui/Icon"

// import {
// 	type Base16ColorScheme,
// 	listBase16Themes,
// 	parseThemeFile,
// 	applyTheme,
// } from "@/lib/style/colors"

// export default function PlayGround() {
// 	const themes = listBase16Themes()

// 	const previewTheme = Variable<Base16ColorScheme>(
// 		{
// 			author: "André Brandão",
// 			scheme: "dark",
// 			base00: `${base16.base00.get()}`,
// 			base01: `${base16.base01.get()}`,
// 			base02: `${base16.base02.get()}`,
// 			base03: `${base16.base03.get()}`,
// 			base04: `${base16.base04.get()}`,
// 			base05: `${base16.base05.get()}`,
// 			base06: `${base16.base06.get()}`,
// 			base07: `${base16.base07.get()}`,
// 			base08: `${base16.base08.get()}`,
// 			base09: `${base16.base09.get()}`,
// 			base0A: `${base16.base0A.get()}`,
// 			base0B: `${base16.base0B.get()}`,
// 			base0C: `${base16.base0C.get()}`,
// 			base0D: `${base16.base0D.get()}`,
// 			base0E: `${base16.base0E.get()}`,
// 			base0F: `${base16.base0F.get()}`,
// 		},
// 		// [],
// 	)

// 	function selectTheme(theme: string) {
// 		const parsed = parseThemeFile(theme)

// 		if (!parsed) {
// 			return
// 		}

// 		previewTheme.set(parsed)
// 	}
// 	return (
// 		<RegularWindow
// 			visible={false}
// 			name={"Playground"}
// 			application={App}
// 			// @ts-expect-error
// 			onDeleteEvent={(self) => {
// 				self.hide()
// 				return true
// 			}}
// 		>
// 			<box>
// 				<box vertical>
// 					{previewTheme().as((c) => {
// 						return <BASE16 base16={c} />
// 					})}

// 					<button
// 						onClick={() => applyTheme(previewTheme().get())}
// 						css={`
// 							background-color: ${previewTheme.get().base00};
// 							color: #${previewTheme.get().base05};
// 							`}
// 					>
// 						Aplicar tema {previewTheme.get().scheme}
// 					</button>
// 				</box>
// 				<scrollable>
// 					<box
// 						vertical
// 						expand
// 					>
// 						{themes.map((theme) => (
// 							<button onClick={() => selectTheme(theme.path)}>
// 								<label label={`${theme.name} `} />
// 							</button>
// 						))}
// 					</box>
// 				</scrollable>
// 			</box>
// 		</RegularWindow>
// 	)
// }
