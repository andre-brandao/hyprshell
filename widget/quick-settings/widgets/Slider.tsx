import { Variable, GLib, bind } from "astal"
import Wp from "gi://AstalWp"

export function AudioSlider() {
	const speaker = Wp.get_default()?.audio.defaultSpeaker!

	return (
		<box
			className="AudioSlider Slider"
			css="min-width: 140px"
		>
			<icon icon={bind(speaker, "volumeIcon")} />
			<slider
				hexpand
				onDragged={({ value }) => (speaker.volume = value)}
				value={bind(speaker, "volume")}
			/>
		</box>
	)
}

export function MicSlider() {
	const mic = Wp.get_default()?.audio.defaultMicrophone!

	return (
		<box
			className="MicSlider Slider"
			css="min-width: 140px"
		>
			<icon icon={bind(mic, "volumeIcon")} />
			<slider
				hexpand
				onDragged={({ value }) => (mic.volume = value)}
				value={bind(mic, "volume")}
			/>
		</box>
	)
}
