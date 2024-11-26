import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { RegularWindow } from "../../components/ui/RegularWindow"
import { Group, Page, Row } from "./Blocks"
import { options } from "@/options"

import { ColorGroup } from "./Base16"

const { bar, notification, theme, font, components } = options

export const Layout = [
	<Page
		name="Theme"
		icon="i"
	>
		<Group title="Theme Selector">
			<ColorGroup />
		</Group>
		<Group title="Base16 ColorScheme">
			<Row
				title="Base00"
				type="color"
				opt={theme.base16.base00}
			/>
			<Row
				title="Base01"
				type="color"
				opt={theme.base16.base01}
			/>
			<Row
				title="Base02"
				type="color"
				opt={theme.base16.base02}
			/>
			<Row
				title="Base03"
				type="color"
				opt={theme.base16.base03}
			/>
			<Row
				title="Base04"
				type="color"
				opt={theme.base16.base04}
			/>
			<Row
				title="Base05"
				type="color"
				opt={theme.base16.base05}
			/>
			<Row
				title="Base06"
				type="color"
				opt={theme.base16.base06}
			/>
			<Row
				title="Base07"
				type="color"
				opt={theme.base16.base07}
			/>
			<Row
				title="Base08"
				type="color"
				opt={theme.base16.base08}
			/>
			<Row
				title="Base09"
				type="color"
				opt={theme.base16.base09}
			/>
			<Row
				title="Base0A"
				type="color"
				opt={theme.base16.base0A}
			/>
			<Row
				title="Base0B"
				type="color"
				opt={theme.base16.base0B}
			/>
			<Row
				title="Base0C"
				type="color"
				opt={theme.base16.base0C}
			/>
			<Row
				title="Base0D"
				type="color"
				opt={theme.base16.base0D}
			/>
			<Row
				title="Base0E"
				type="color"
				opt={theme.base16.base0E}
			/>
			<Row
				title="Base0F"
				type="color"
				opt={theme.base16.base0F}
			/>
		</Group>
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
		<Group title="Background">
			<Row
				title="Color"
				type="color"
				opt={theme.colors.bg.color}
			/>
			<Row
				title="Alternative"
				type="color"
				opt={theme.colors.bg.alt}
			/>
			<Row
				title="Selected"
				type="color"
				opt={theme.colors.bg.selected}
			/>
			<Row
				title="Opacity"
				type="number"
				opt={theme.colors.bg.opacity}
			/>
		</Group>
		<Group title="Foreground">
			<Row
				title="Color"
				type="color"
				opt={theme.colors.fg.color}
			/>
			<Row
				title="Alternative"
				type="color"
				opt={theme.colors.fg.alt}
			/>
			<Row
				title="Light"
				type="color"
				opt={theme.colors.fg.light}
			/>
			<Row
				title="Opacity"
				type="number"
				opt={theme.colors.fg.opacity}
			/>
		</Group>

		<Group title="Widget">
			<Row
				title="Foreground"
				type="color"
				opt={theme.colors.widget.fg}
			/>
			<Row
				title="Background"
				type="color"
				opt={theme.colors.widget.bg}
			/>
			<Row
				title="Opacity"
				type="number"
				opt={theme.colors.widget.opacity}
			/>
		</Group>

		<Group title="Hover">
			<Row
				title="Background"
				type="color"
				opt={theme.colors.hover.bg}
			/>
			<Row
				title="Foreground"
				type="color"
				opt={theme.colors.hover.fg}
			/>
			<Row
				title="Opacity"
				type="number"
				opt={theme.colors.hover.opacity}
			/>
		</Group>

		<Group title="Error">
			<Row
				title="Background"
				type="color"
				opt={theme.colors.error.bg}
			/>
			<Row
				title="Foreground"
				type="color"
				opt={theme.colors.error.fg}
			/>
		</Group>

		<Group title="Border">
			<Row
				title="Color"
				type="color"
				opt={theme.colors.border.color}
			/>
			<Row
				title="Width"
				type="string"
				opt={theme.colors.border.width}
			/>
			<Row
				title="Opacity"
				type="number"
				opt={theme.colors.border.opacity}
			/>
		</Group>

		<Group title="Shadows">
			<Row
				title="Enabled"
				type="boolean"
				opt={theme.colors.shadows.enabled}
			/>
			<Row
				title="Color"
				type="color"
				opt={theme.colors.shadows.color}
			/>
			<Row
				title="Text Shadow"
				type="string"
				opt={theme.colors.shadows["text-shadow"]}
			/>
			<Row
				title="Box Shadow"
				type="string"
				opt={theme.colors.shadows["box-shadow"]}
			/>
		</Group>

		<Group title="Other">
			<Row
				title="Transition"
				type="string"
				opt={theme.colors.other.transition}
			/>
			<Row
				title="Spacing"
				type="string"
				opt={theme.colors.other.spacing}
			/>
			<Row
				title="Radius"
				type="string"
				opt={theme.colors.other.radius}
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
				title="Flat Buttons"
				opt={bar.flat_buttons}
				type="boolean"
			/>
			<Row
				title="Padding"
				opt={components.BarContainer.padding}
			/>
			<Row
				title="Margin"
				opt={components.BarContainer.margin}
			/>
			<Row
				title="Border Radius"
				opt={components.BarContainer.border_radius}
			/>
			<Row
				title="Transparent"
				opt={components.BarContainer.tranparent}
			/>
		</Group>
	</Page>,
	<Page
		name="Widgets"
		icon="i"
	>
		<Group title="Vitals">
			<Row
				title="CPU Interval"
				opt={bar.vitals.cpu.interval}
				type="number"
			/>
			<Row
				title="RAM Interval"
				opt={bar.vitals.ram.interval}
				type="number"
			/>
			<Row
				title="RAM Round"
				opt={bar.vitals.ram.round}
				type="boolean"
			/>
			<Row
				title="RAM Label Type"
				opt={bar.vitals.ram.lblType}
				type="enum"
				enums={["used/total", "used", "free", "percent"]}
			/>
			<Row
				title="Storage Interval"
				opt={bar.vitals.storage.interval}
				type="number"
			/>
			<Row
				title="Storage Round"
				opt={bar.vitals.storage.round}
				type="boolean"
			/>
			<Row
				title="Storage Label Type"
				opt={bar.vitals.storage.lblType}
				type="enum"
				enums={["used/total", "used", "free", "percent"]}
			/>
		</Group>
		<Group title="Workspaces">
			<Row
				title="Show Empty"
				opt={bar.workspaces.show_empty}
				type="boolean"
			/>
			<Row
				title="Mode"
				opt={bar.workspaces.mode}
				type="enum"
				enums={["mini", "full"]}
			/>
			<Row
				title="Show"
				opt={bar.workspaces.show}
				type="number"
			/>
			<Row
				title="Label"
				opt={bar.workspaces.label}
				type="string"
			/>
			<Row
				title="Focused Label"
				opt={bar.workspaces.focused_label}
				type="string"
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
