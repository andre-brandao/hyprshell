import { Variable, GLib, bind, type Binding } from "astal"

import { Astal, Gtk, Gdk, App } from "astal/gtk3"

function SlidingText({
	text,
	speed = 10,
	max_length = 20,
}: {
	text: Binding<string>
	speed?: number
	max_length?: number
}) {
	if (text.get().length < max_length) {
		return <label label={text} />
	}
	let index = 0

	const fullText = text.as(
		(t) => " ".repeat(4) + t,
		// + " ".repeat(4)
	)

	const slidingText = Variable("")

	const updateText = () => {
		index = (index + 1) % fullText.get().length
		const visibleText = fullText.get().substring(index, index + max_length)
		slidingText.set(visibleText)
		return true
	}

	const timeout = GLib.timeout_add(
		GLib.PRIORITY_DEFAULT,
		1000 / speed,
		updateText,
	)
	return (
		<box
			expand={false}
			orientation={Gtk.Orientation.HORIZONTAL}
			onDestroy={() => GLib.source_remove(timeout)}
		>
			<label
				label={slidingText()}
				halign={ALIGN.START}
			/>
		</box>
	)
}

export default SlidingText
