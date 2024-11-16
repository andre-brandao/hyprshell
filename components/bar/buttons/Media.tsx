import Mpris from "gi://AstalMpris"

import { Variable, GLib, bind } from "astal"

import { Astal, Gtk, Gdk, App } from "astal/gtk3"

import PopupWindow from "@/components/ui/popup/PopUp"
import MediaPlayer from "@/components/ui/media-player/MediaPlayer"

import PanelButton from "@/components/ui/PannelButton"
function Media() {
	const mpris = Mpris.get_default()

	// const popup = (
	//   <PopupWindow
	//     name="media"
	//     anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP}
	//   >
	//     <MediaPlayer />
	//   </PopupWindow>
	// );

	return (
		<box className="Media">
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
						<label
							label={bind(ps[0], "title").as(
								() => `${ps[0].title} - ${ps[0].artist}`,
							)}
						/>
					</box>
				) : (
					"Nothing Playing"
				),
			)}
		</box>
	)
}

export default Media
