import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { RegularWindow } from "../ui/RegularWindow"
import { options } from "@/options"

import { Layout } from "./Layout"

import { Variable, GLib, bind, Binding } from "astal"
import icons from "@/lib/icons"
import Icon from "../ui/Icon"
import { applyCss } from "@/lib/style/style"

const current = Variable(Layout[0].name)

function Header() {
	// { title }: { title: string | Binding<string> }
	return (
		<centerbox
			className="Header"
			startWidget={
				<box>
					<button className="reset">
						<Icon name={icons.ui.refresh} />
					</button>
				</box>
			}
			centerWidget={
				<box>
					<label label="Settings" />
				</box>
			}
			endWidget={
				<box
					hexpand
					halign={ALIGN.END}
				>
					<button
						className="close"
						onClicked={() => App.get_window("Settings")?.hide()}
					>
						<Icon name={icons.ui.close} />
					</button>
				</box>
			}
		/>
	)
}

function Pager() {
	return (
		<box
			className="Pager"
			vertical
		>
			{Layout.map(({ name }) => (
				<button
					// xalign={0}

					className={current().as((v) => `${v === name ? "active" : ""}`)}
					onClick={() => current.set(name)}
				>
					<box>
						<label label={name} />
					</box>
				</button>
			))}

			<box>
				<button onClicked={() => applyCss()}>Reset CSS</button>
			</box>
		</box>
	)
}
export default function SettingsWindow() {
	return (
		<RegularWindow
			visible={false}
			name={"Settings"}
			application={App}
			// @ts-expect-error
			onDeleteEvent={(self) => {
				self.hide()
				return true
			}}
		>
			<box>
				<Pager />
				<box vertical>
					<Header title={bind(Layout[0], "name").as((n) => `${n}`)} />
					<stack
						// vertical
						shown={current()}
						// children={Layout}
					>
						{Layout}
					</stack>
				</box>
			</box>
		</RegularWindow>
	)
}
