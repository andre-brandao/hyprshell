import Mpris from "gi://AstalMpris"

import { Variable, GLib, bind, type Binding } from "astal"

import { Astal, Gtk, Gdk, App } from "astal/gtk3"

import PannelBox from "@/components/ui/PannelBox"
import SlidingText from "@/components/ui/SlidingText"

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
				}}
			>
				{bind(mpris, "players").as((ps) =>
					ps[0] ? (
						<box>
							<box
								// window={"win-media"}
								className="Cover"
								valign={Gtk.Align.CENTER}
								css={bind(ps[0], "coverArt").as(
									(cover) => `background-image: url('${cover}');`,
								)}
								// onClicked={() => (popup.visible ? popup.hide() : popup.show())}
							/>
							{/* <label
							label={bind(ps[0], "title").as(
								() => `${ps[0].title} - ${ps[0].artist}`,
							)}
						/> */}
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
						"Nothing Playing"
					),
				)}
			</eventbox>
		</PannelBox>
	)
}

export default Media
