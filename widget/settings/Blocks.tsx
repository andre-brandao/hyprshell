import { Opt } from "@/lib/option"
// import Gtk from "gi://Gtk?version=3.0";
import { Variable, GLib, bind, Binding } from "astal"
import Icon from "../Icon"
import icons from "@/lib/icons"
import GObject from "gi://GObject"
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3"
import { Setter } from "./Setter"

export type RowProps<T> = {
	opt: Opt<T>
	title: string
	note?: string
	type?:
		| "number"
		| "color"
		| "float"
		| "object"
		| "string"
		| "enum"
		| "boolean"
		| "img"
		| "font"
	enums?: string[]
	max?: number
	min?: number
}

export function Row<T>(props: RowProps<T>) {
	return (
		<box
			className={"row"}
			tooltipText={props.note ? `note: ${props.note}` : ""}
			// setup={self => self.proper}
		>
			<box
				vertical={true}
				valign={ALIGN.CENTER}
			>
				<label
					xalign={0}
					className={"row-title"}
					label={props.title}
				/>
				<label
					xalign={0}
					className={"id"}
					label={props.opt.id}
				></label>
			</box>
			<box hexpand={true} />
			<box valign={ALIGN.CENTER}>
				<Setter
					opt={props.opt}
					min={props.min}
					max={props.max}
					enums={props.enums}
					title={props.title}
					note={props.note}
					type={props.type}
				/>
			</box>
			<button
				onClicked={() => props.opt.reset()}
				valign={ALIGN.CENTER}
			>
				<Icon name={icons.ui.refresh} />
			</button>
		</box>
	)
}

export function Group({
	title,
	children,
}: {
	title: string
	children?: ReturnType<typeof Row<any>>[]
}) {
	return (
		<box
			className={"group"}
			vertical={true}
		>
			<box>
				<label
					className={"group-title"}
					label={title}
				></label>
				{title ? (
					<button
						hexpand={true}
						halign={ALIGN.END}
						className={"group-reset"}
						// sensitive= () merger binds of rows
						// onClicked={()=> children.forEach(row => row.op)}
					>
						<Icon
							name={icons.ui.refresh}
							// sensitive={Variable.derive(
							//   children.map(({ attribute: { opt } }) =>
							//     opt.bind().as((v) => v !== opt.initial),
							//   ),
							// )()}
						/>
					</button>
				) : (
					<box></box>
				)}
			</box>
			<box
				vertical
				children={children}
			/>
		</box>
	)
}

export function Page<T>({
	name,
	icon,
	children,
}: {
	name: string | Binding<string>
	icon: string
	children?: ReturnType<typeof Group>[]
}) {
	return (
		<box
			className={"page"}
			name={name}
		>
			<scrollable css="min-height: 300px;">
				<box
					vexpand
					vertical
					className={"page-content"}
					children={children}
				/>
			</scrollable>
		</box>
	)
}
