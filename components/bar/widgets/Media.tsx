import Mpris from "gi://AstalMpris"

import { Variable, GLib, bind, type Binding } from "astal"

import { Astal, Gtk, Gdk, App } from "astal/gtk3"

import PannelBox from "@/components/ui/PannelBox"
import SlidingText from "@/components/ui/SlidingText"
import { bash, dependencies, sh } from "@/lib/utils"

function Media() {
	const mpris = Mpris.get_default()

	const isHovering = Variable(false)

	return (
		<PannelBox className="Media">
			<eventbox
				setup={(s) => {
					s.connect("enter-notify-event", () => {
						print("hovering")
						isHovering.set(true)
					})
					s.connect("leave-notify-event", () => {
						print("not hovering")
						isHovering.set(false)
					})
					s.connect("button-press-event", () => {
						dependencies("pypr")
						sh(["pypr", "toggle", "music"])
					})
				}}
			>
				{bind(mpris, "players").as((ps) =>
					ps[0] ? (
						<box>
							<box
								className="Cover"
								valign={Gtk.Align.CENTER}
								css={bind(ps[0], "coverArt").as(
									(cover) => `background-image: url('${cover}');`,
								)}
							/>

							{isHovering((b) =>
								b ? (
									<SlidingText
										text={bind(ps[0], "title").as(
											() => `${ps[0].title} - ${ps[0].artist}`,
										)}
									/>
								) : (
									<box />
								),
							)}
						</box>
					) : (
						<box> "Nothing Playing"</box>
					),
				)}
			</eventbox>
		</PannelBox>
	)
}

export default Media
