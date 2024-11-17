import Mpris from "gi://AstalMpris"

import { Variable, GLib, bind, type Binding } from "astal"

import { Astal, Gtk, Gdk, App } from "astal/gtk3"

function SlidingText({
	text,
	speed = 4,
	max_length = 20,
}: {
	text: Binding<string>
	speed?: number
	max_length?: number
}) {
	let index = 0

	return (
		<box
			expand={false}
			orientation={Gtk.Orientation.HORIZONTAL}
		>
			<label
				label={text.as((t) => t.substring(0, max_length))}
				halign={ALIGN.START}
				setup={(label) => {
					const updateText = () => {
						index = (index + 1) % text.get().length
						const visibleText = text.get().substring(index, index + max_length)
						label.label = visibleText
						return true // Returning true keeps the timeout active.
					}
					GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000 / speed, updateText)
				}}
			/>
		</box>
	)
}

export default SlidingText
