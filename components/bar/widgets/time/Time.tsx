import { Variable, GLib, bind } from "astal"

import PopupWindow from "@/components/ui/popup/PopUp"
import PannelButton from "@/components/ui/PannelButton"
import { Gtk, Astal } from "astal/gtk3"
import PannelBox from "@/components/ui/PannelBox"

const Divider = () => (
	<box
		className="divider"
		vertical
	/>
)

const Time = () => {
	const time = Variable<string>("").poll(
		1000,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		() => GLib.DateTime.new_now_local().format("%H:%M")!,
	)

	const fullDate = Variable<string>("").poll(1000, () => {
		const time = GLib.DateTime.new_now_local()

		const dayNameMonth = time.format("%A, %B ")
		const dayNum = time.get_day_of_month()
		const date = time.format(", %Y")

		return dayNum && dayNameMonth && date ? dayNameMonth + dayNum + date : ""
	})

	return (
		<box
			className="timebox"
			vertical
		>
			<box
				className="time-container"
				halign={Gtk.Align.CENTER}
				valign={Gtk.Align.CENTER}
			>
				<label
					className="content"
					label={bind(time)}
				/>
			</box>

			<box
				className="date-container"
				halign={Gtk.Align.CENTER}
			>
				<label
					css="font-size: 20px;"
					label={bind(fullDate)}
				/>
			</box>
		</box>
	)
}

export default function ({ format = "%H:%M - %a %e %b" }) {
	const time = Variable<string>("").poll(
		1000,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		() => GLib.DateTime.new_now_local().format(format)!,
	)
	const cal = new Gtk.Calendar({
		show_day_names: true,
		show_heading: true,
	})

	cal.show_all()

	const popup = (
		<PopupWindow
			name="calendar"
			anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
		>
			<box
				vertical
				className="date widget"
			>
				<Time />
				<box className="cal-box">{cal}</box>
			</box>
		</PopupWindow>
	)

	return (
		<PannelBox className="">
			<PannelButton
				className={"TimeButton"}
				onClicked={() => (popup.visible ? popup.hide() : popup.show())}
			>
				<label
					className="Time"
					onDestroy={() => {
						time.drop()
						popup.destroy()
					}}
					label={time()}
				/>
			</PannelButton>
		</PannelBox>
	)
}
