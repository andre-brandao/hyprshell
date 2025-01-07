import {
	type Base16ColorScheme,
	listBase16Themes,
	getThemeColors,
	applyTheme,
} from "@/lib/style/colors"
import { options } from "@/options"

import { Variable, GLib, bind, Binding } from "astal"
import Icon from "../../ui/Icon"
import icons from "@/lib/icons"
const { base16 } = options.theme

function Preview({ base16 }: { base16: Base16ColorScheme }) {
	return (
		<box vertical>
			{Object.entries(base16).map(([key, value]) =>
				value.startsWith("#") ? (
					<box>
						<box
							css={`
					background-color: ${value};
					min-height: 50px;
					min-width: 50px;`}
						/>
						<label label={key} />
						<label label={value} />
						{/* <box hexpand /> */}
					</box>
				) : (
					<box />
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
	const isLoading = Variable(false)
	const themes = Variable<
		{
			name: string
			download_url: string
		}[]>([])

	// listBase16Themes().then((t) => {
	// 	// print("themes", t)
	// 	isLoading.set(false)
	// 	themes.set(t)
	// })

	function loadThemes() {
		isLoading.set(true)
		listBase16Themes().then((t) => {
			// print("themes", t)
			isLoading.set(false)
			themes.set(t)
		}).catch((e) => {
			print("error", e)
			isLoading.set(false)
		})
	}

	const previewTheme = Variable<Base16ColorScheme>(
		{
			author: "André Brandão",
			name: "Default",
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
		getThemeColors(theme).then((theme) => {
			if (theme) {
				previewTheme.set(theme)
				print("theme", JSON.stringify(theme))
			}
		})
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

							{themes().as((t) => <>
								{

									t.length > 0 ?




										t.filter(theme => theme !== undefined && theme.name !== undefined)
											.map((theme) => (
												<button onClick={() => selectTheme(theme.download_url)}>
													<label label={`${theme.name} `} />
												</button>
											)) : (
											<button onClick={loadThemes}>
												<label label={"Load Themes"} />
											</button>
										)



								}




							</>
							)}


						</box>
					</scrollable>
				</box>
			</box>
		</box>
	)
}
