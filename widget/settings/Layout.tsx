import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { RegularWindow } from "../RegularWindow"
import { Group, Page, Row } from "./Blocks"
import { options } from "@/options"

const { bar, notification, theme, font } = options

export const Layout = [
	<Page
		name="Theme"
		icon="i"
	>
		<Group title="Font">
			<Row
				title="Font Size"
				type="string"
				opt={font.size}
			/>

			<Row
				title="Font Name"
				type="font"
				opt={font.name}
			/>
		</Group>
		<Group title="Colors">
			<Row
				title="Background"
				type="color"
				opt={theme.bg}
			/>

			<Row
				title="Foreground"
				type="color"
				opt={theme.fg}
			/>

			<Row
				title="Primary Background"
				type="color"
				opt={theme.primary.bg}
			/>

			<Row
				title="Primary Foreground"
				type="color"
				opt={theme.primary.fg}
			/>

			<Row
				title="Error Background"
				type="color"
				opt={theme.error.bg}
			/>

			<Row
				title="Error Foreground"
				type="color"
				opt={theme.error.fg}
			/>
		</Group>

		<Group title="Border">
			<Row
				title="Border Color"
				type="color"
				opt={theme.border.color}
			/>

			<Row
				title="Border Width"
				type="string"
				opt={theme.border.width}
			/>

			<Row
				title="Border Opacity"
				type="number"
				opt={theme.border.opacity}
			/>
		</Group>

		<Group title="Widget">
			<Row
				title="Widget Color"
				type="color"
				opt={theme.widget.color}
			/>

			<Row
				title="Widget Opacity"
				type="number"
				opt={theme.widget.opacity}
			/>
		</Group>

		<Group title="Other">
			<Row
				title="Blur"
				type="number"
				opt={theme.blur}
			/>

			<Row
				title="Shadows"
				type="boolean"
				opt={theme.shadows}
			/>

			<Row
				title="Padding"
				type="string"
				opt={theme.padding}
			/>

			<Row
				title="Spacing"
				type="string"
				opt={theme.spacing}
			/>

			<Row
				title="Radius"
				type="string"
				opt={theme.radius}
			/>

			<Row
				title="Transition"
				type="string"
				opt={theme.transition}
			/>
		</Group>
	</Page>,
	<Page
		name="Bar"
		icon="i"
	>
		<Group title="Widgets">
			<Row
				title="Widgets"
				opt={bar.layout.start}
			/>
			<Row
				title="Widgets"
				opt={bar.layout.center}
			/>
			<Row
				title="Widgets"
				opt={bar.layout.end}
			/>
		</Group>

		<Group title="Bar Container">
			<Row
				title="Position"
				opt={bar.position}
				type="enum"
				enums={["top", "bottom"]}
			/>
			<Row
				title="Padding"
				opt={bar.BarContainer.padding}
			/>
			<Row
				title="Margin"
				opt={bar.BarContainer.margin}
			/>
			<Row
				title="Border Radius"
				opt={bar.BarContainer.border_radius}
			/>
			<Row
				title="Transparent"
				opt={bar.BarContainer.tranparent}
			/>
		</Group>
	</Page>,

	<Page
		name="Other"
		icon="i"
	>
		<Group title="Other">
			<Row
				title="Position"
				opt={notification.position}
				type="enum"
				enums={["top-left", "top-right", "bottom-left", "bottom-right"]}
			/>
			<Row
				title="Flat Buttons"
				opt={bar.flat_buttons}
				type="boolean"
			/>
		</Group>
	</Page>,
]
