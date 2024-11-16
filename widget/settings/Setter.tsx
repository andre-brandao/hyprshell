import { Opt } from "@/lib/option"
// import Gtk from "gi://Gtk?version=3.0";
import { Variable, GLib, bind, Binding } from "astal"
import Icon from "../Icon"
import icons from "@/lib/icons"
import GObject from "gi://GObject"
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3"
import { RowProps } from "./Blocks"

// subclass, register, define constructor props
class ColorButton extends astalify(Gtk.ColorButton) {
	static {
		GObject.registerClass(this)
	}

	constructor(
		props: ConstructProps<
			ColorButton,
			Gtk.ColorButton.ConstructorProps,
			{ onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
		>,
	) {
		super(props as any)
	}
}

class SpinButton extends astalify(Gtk.SpinButton) {
	static {
		GObject.registerClass(this)
	}

	constructor(
		props: ConstructProps<
			SpinButton,
			Gtk.SpinButton.ConstructorProps,
			{ onValueChanged: [] } // signals of Gtk.ColorButton have to be manually typed
		>,
	) {
		super(props as any)
	}
}

function EnumSetter({ opt, values }: { opt: Opt<string>; values: string[] }) {
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
			<label>{bind(opt).as((v) => `${v}`)}</label>
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
						self.hook(opt, (self) => (self.value = opt.get() as number))
						self.value = opt.get() as number
					}}
					onValueChanged={(self) => {
						print("set num", self.value)
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
						self.hook(opt, (self) => (self.text = JSON.stringify(opt.get())))
					}}
					onActivate={(self) => {
						print("set obj", self.text)
						opt.set(JSON.parse(self.text || ""))
					}}
				></entry>
			)

		case "string":
			return (
				<entry
					setup={(self) => {
						self.text = opt.get() as string
						self.hook(opt, (self) => (self.text = opt.get() as string))
					}}
					onActivate={(self) => {
						print("set text", self.text)
						opt.set(self.text as T)
					}}
				></entry>
			)

		case "enum":
			return (
				<EnumSetter
					opt={opt as unknown as Opt<string>}
					values={enums!}
				/>
			)
		case "boolean":
			return <switch active={bind(opt as Opt<boolean>)}></switch>

		case "color":
			const color = new Gdk.RGBA()
			color.parse(opt.get() as string)

			return (
				<ColorButton
					rgba={color}
					setup={(self) =>
						self.hook(opt, (self) => {
							const rgba = new Gdk.RGBA()
							rgba.parse(opt.get() as string)
							print("rgba" + opt.get(), rgba)
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
				></ColorButton>
			)

		// case "img":
		//   return <></>;
		default:
			return <label label={"no setter with type " + type}></label>
			break
	}
	return <label label={"no setter"}></label>
}
