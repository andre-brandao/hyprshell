import type { Opt } from "@/lib/option"
// import Gtk from "gi://Gtk?version=3.0";
import { Variable, GLib, bind, Binding } from "astal"
import Icon from "../../components/ui/Icon"
import icons from "@/lib/icons"
import GObject from "gi://GObject"
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3"
import type { RowProps } from "./Blocks"

// subclass, register, define constructor props
class ColorButton extends astalify(Gtk.ColorButton) {
	static {
		GObject.registerClass(ColorButton)
	}

	constructor(
		props: ConstructProps<
			ColorButton,
			Gtk.ColorButton.ConstructorProps,
			{ onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
		>,
	) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		super(props as any)
	}
}

class SpinButton extends astalify(Gtk.SpinButton) {
	static {
		GObject.registerClass(SpinButton)
	}

	constructor(
		props: ConstructProps<
			SpinButton,
			Gtk.SpinButton.ConstructorProps,
			{ onValueChanged: [] } // signals of Gtk.ColorButton have to be manually typed
		>,
	) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		super(props as any)
	}
}

function EnumSetter({
	opt,
	values,
}: { opt: Opt<string>; values: string[] | undefined }) {
	if (!values) {
		return <label label={"no values"} />
	}

	const step = (dir: 1 | -1) => {
		const i = values.findIndex((i) => i === opt().get())
		opt.set(
			dir > 0
				? i + dir > values.length - 1
					? values[0]
					: values[i + dir]
				: i + dir < 0
					? values[values.length - 1]
					: values[i + dir],
		)
	}
	return (
		<box className={"enum-setter"}>
			<label label={bind(opt).as((v) => `${v}`)} />
			<button onClicked={() => step(-1)}>-</button>
			<button onClicked={() => step(1)}>+</button>
		</box>
	)
}

export function Setter<T>({
	opt,
	type = typeof opt.get() as RowProps<T>["type"],
	enums,
	max = 1000,
	min = 0,
}: RowProps<T>) {
	switch (type) {
		case "number":
			return (
				<SpinButton
					setup={(self) => {
						self.set_range(min, max)
						self.set_increments(1, 5)
						self.hook(opt, (self) => {
							self.value = opt.get() as number
						})
						self.value = opt.get() as number
					}}
					onValueChanged={(self) => {
						// print("set num", self.value)
						opt.set(self.value as T)
					}}
				/>
			)
		case "float":
		case "object":
			return (
				<entry
					setup={(self) => {
						self.text = JSON.stringify(opt.get())
						self.hook(opt, (self) => {
							self.text = JSON.stringify(opt.get())
						})
					}}
					onActivate={(self) => {
						// print("set obj", self.text)
						opt.set(JSON.parse(self.text || ""))
					}}
				/>
			)

		case "string":
			return (
				<entry
					setup={(self) => {
						self.text = opt.get() as string
						self.hook(opt, (self) => {
							self.text = opt.get() as string
						})
					}}
					onActivate={(self) => {
						// print("set text", self.text)
						opt.set(self.text as T)
					}}
				/>
			)

		case "enum":
			return (
				<EnumSetter
					opt={opt as unknown as Opt<string>}
					values={enums}
				/>
			)
		case "boolean":
			return (
				<switch
					onButtonReleaseEvent={(self) => {
						// print("pressed bool", self.active)
						// self.active = !self.active
						opt.set(self.active as T)
					}}
					active={bind(opt as Opt<boolean>)}
				/>
			)

		case "color": {
			const color = new Gdk.RGBA()
			color.parse(opt.get() as string)

			return (
				<ColorButton
					rgba={color}
					setup={(self) =>
						self.hook(opt, (self) => {
							const rgba = new Gdk.RGBA()
							rgba.parse(opt.get() as string)
							// print(`rgba${opt.get()}`, rgba)
							self.rgba = rgba
						})
					}
					onColorSet={({ rgba: { red, green, blue } }) => {
						const hex = (n: number) => {
							const c = Math.floor(255 * n).toString(16)
							return c.length === 1 ? `0${c}` : c
						}
						opt.set(`#${hex(red)}${hex(green)}${hex(blue)}` as T)
					}}
				/>
			)
		}

		// case "img":
		//   return <></>;
		default:
			return <label label={`no setter with type ${type}`} />
	}
}
