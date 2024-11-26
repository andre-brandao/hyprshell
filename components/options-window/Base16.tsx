import {
	type Base16ColorScheme,
	listBase16Themes,
	parseThemeFile,
	applyTheme,
} from "@/lib/style/colors"
import { options } from "@/options"

import { Variable, GLib, bind, Binding } from "astal"
import Icon from "../ui/Icon"
import icons from "@/lib/icons"
const { base16 } = options.theme

function Preview({ base16 }: { base16: Base16ColorScheme }) {
	return (
		<box
			vertical
			widthRequest={50}
		>
			{Object.entries(base16).map(([key, value]) =>
				value.startsWith("#") ? (
					<box>
						<label label={key} />
						<label label={value} />
						{/* <box hexpand /> */}
						<box
							css={`
					background-color: ${value};
					min-height: 50px;
					min-width: 50px;`}
						/>
					</box>
				) : (
					<label
						maxWidthChars={15}
						label={value}
					/>
				),
			)}

			<button
				onClick={() => applyTheme(base16)}
				css={`
					background-color: ${base16.base0F};
					color: ${base16.base00};
					margin: 10px;
					`}
			>
				Apply
			</button>
		</box>
	)
}

export function ColorGroup() {
	const themes = listBase16Themes()

	const previewTheme = Variable<Base16ColorScheme>(
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

	function selectTheme(theme: string) {
		const parsed = parseThemeFile(theme)

		if (!parsed) {
			return
		}

		previewTheme.set(parsed)
	}
	return (
		<box
			className={"row"}
			vertical={true}
		>
			<box

			// children={}
			>
				<box
					css={`
					min-width: 50%;
					`}
				>
					{previewTheme().as((c) => {
						return <Preview base16={c} />
					})}
				</box>
				<box
					css={`
					min-width: 50%;
					`}
				>
					<scrollable>
						<box
							vertical
							expand
						>
							{themes.map((theme) => (
								<button onClick={() => selectTheme(theme.path)}>
									<label label={`${theme.name} `} />
								</button>
							))}
						</box>
					</scrollable>
				</box>
			</box>
		</box>
	)
}
