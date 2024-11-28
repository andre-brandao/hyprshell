#!/usr/bin/ags run
import { App, Astal, Gtk, Gdk } from "astal/gtk3"

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
const { IGNORE } = Astal.Exclusivity
const { EXCLUSIVE } = Astal.Keymode
const { CENTER } = Gtk.Align

function hide() {
	App.get_window("dialog")?.hide()
}

interface DialogProps {
	title: string
	action: string
	yes: () => void
	no: () => void
}

export default function Dialog({ action, yes, no }: DialogProps) {
	function onKeyPress(self: Astal.Window, event: Gdk.Event) {
		if (event.get_keyval()[1] === Gdk.KEY_Escape) {
			no()
			self.hide()
		}
	}

	return (
		<window
			name={"dialog"}
			css={`
        all: unset;
        background-color: alpha(black, 0.3);
      `}
			application={App}
			onKeyPressEvent={onKeyPress}
			exclusivity={IGNORE}
			keymode={EXCLUSIVE}
			anchor={TOP | BOTTOM | LEFT | RIGHT}
		>
			<box
				css={`
          margin: 10px;
          padding: 6px;
          box-shadow: 2px 3px 5px 0 alpha(black, 0.6);
          border-radius: 11px;
          background-color: #181818;
          color: white;
          min-width: 200px;
        `}
				halign={CENTER}
				valign={CENTER}
				vertical
			>
				<label
					css={`
            font-size: 1.4em;
            margin: 6px;
          `}
					className="title"
					label="Are you sure you want to do"
				/>
				<label
					css={`
            font-size: large;
            margin: 6px;
            color: alpha(white, 0.8);
          `}
					className="action"
					label={`${action}?`}
				/>
				<box homogeneous>
					<button
						css={`
              margin: 6px;
            `}
						onClicked={() => {
							yes()
							hide()
						}}
					>
						Yes
					</button>
					<button
						css={`
              margin: 6px;
            `}
						onClicked={() => {
							no()
							hide()
						}}
					>
						No
					</button>
				</box>
			</box>
		</window>
	)
}
