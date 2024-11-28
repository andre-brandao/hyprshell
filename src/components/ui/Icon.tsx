import { substitutes } from "@/lib/icons"
import { App, Astal, Gtk, Gdk, type Widget } from "astal/gtk3"
import GLib from "gi://GLib"
import { Binding } from "astal"
type IconProps = Omit<Widget.IconProps, "icon"> & {
	name: string | Binding<string>
	fallback?: string
}

function get(value: string | Binding<string>): string {
	return value instanceof Binding ? value.get() : value
}
function Icon({
	name,
	fallback = "image-missing-symbolic",
	...rest
}: IconProps) {
	if (
		!name ||
		name === "" ||
		name === "null" ||
		name === "undefined" ||
		name === "none" ||
		name === undefined ||
		name === null
	) {
		return (
			<icon
				icon={fallback}
				{...rest}
			/>
		)
	}

	if (Astal.Icon.lookup_icon(get(name)))
		return (
			<icon
				icon={name}
				{...rest}
			/>
		)

	// @ts-expect-error
	const icon_sub = substitutes[get(name)] || name
	if (Astal.Icon.lookup_icon(icon_sub))
		return (
			<icon
				icon={icon_sub}
				{...rest}
			/>
		)

	return (
		<icon
			icon={fallback}
			{...rest}
		/>
	)
}

export default Icon
