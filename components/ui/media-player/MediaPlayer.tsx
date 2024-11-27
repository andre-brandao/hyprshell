import { Astal, Gtk } from "astal/gtk3"
import Mpris from "gi://AstalMpris"
import { bind } from "astal"
import Icon from "../Icon"
import icons from "@/lib/icons"

function lengthStr(length: number) {
	const min = Math.floor(length / 60)
	const sec = Math.floor(length % 60)
	const sec0 = sec < 10 ? "0" : ""
	return `${min}:${sec0}${sec}`
}

function MediaPlayer({ player }: { player: Mpris.Player }) {
	const { START, END } = Gtk.Align

	const title = bind(player, "title").as((t) => t || "Unknown Track")

	const artist = bind(player, "artist").as((a) => a || "Unknown Artist")

	const coverArt = bind(player, "coverArt").as(
		(c) => `background-image: url('${c}')`,
	)

	const playerIcon = bind(player, "entry").as((e) =>
		e && Astal.Icon.lookup_icon(e) ? e : "audio-x-generic-symbolic",
	)

	const position = bind(player, "position").as((p) =>
		player.length > 0 ? p / player.length : 0,
	)

	const playIcon = bind(player, "playbackStatus").as((s) =>
		s === Mpris.PlaybackStatus.PLAYING
			? "media-playback-pause-symbolic"
			: "media-playback-start-symbolic",
	)

	return (
		<box className="MediaPlayer">
			<box
				vertical
				css={`
				margin-right: 5px;
				`}
			>
				<slider
					vertical
					expand
					inverted
					onDragged={({ value }) => {
						player.volume = value
					}}
					value={bind(player, "volume")}
				/>

				<Icon
					name={icons.audio.volume.high}
					// css={`
					// 	padding-right: 5px;
					// 	`}
				/>
			</box>
			<box
				className="cover-art"
				css={coverArt}
			/>
			<box vertical>
				<box className="title">
					<label
						truncate
						hexpand
						halign={START}
						label={title}
					/>
					<Icon name={playerIcon} />
				</box>
				<label
					halign={START}
					valign={START}
					vexpand
					wrap
					label={artist}
				/>
				{/* volume */}

				<slider
					visible={bind(player, "length").as((l) => l > 0)}
					onDragged={({ value }) => {
						player.position = value * player.length
					}}
					value={position}
				/>
				<centerbox className="actions">
					<label
						hexpand
						className="position"
						halign={START}
						visible={bind(player, "length").as((l) => l > 0)}
						label={bind(player, "position").as(lengthStr)}
					/>
					<box>
						<button
							onClicked={() => player.previous()}
							visible={bind(player, "canGoPrevious")}
						>
							<Icon name="media-skip-backward-symbolic" />
						</button>
						<button
							onClicked={() => player.play_pause()}
							visible={bind(player, "canControl")}
						>
							<Icon name={playIcon} />
						</button>
						<button
							onClicked={() => player.next()}
							visible={bind(player, "canGoNext")}
						>
							<Icon name="media-skip-forward-symbolic" />
						</button>
					</box>
					<label
						className="length"
						hexpand
						halign={END}
						visible={bind(player, "length").as((l) => l > 0)}
						label={bind(player, "length").as((l) =>
							l > 0 ? lengthStr(l) : "0:00",
						)}
					/>
				</centerbox>
			</box>
		</box>
	)
}

export default function MprisPlayers() {
	const mpris = Mpris.get_default()

	return (
		<box vertical>
			{bind(mpris, "players").as((arr) =>
				arr.map((player) => <MediaPlayer player={player} />),
			)}
		</box>
	)
}
