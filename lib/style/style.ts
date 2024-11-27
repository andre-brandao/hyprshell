import { monitorFile, readFile, writeFile } from "astal/file"

import { subprocess, exec, execAsync } from "astal/process"
import { ensureDirectory, ensureFile } from "@/lib/utils"
import { App } from "astal/gtk3"
import { Opt } from "@/lib/option"
import { options } from "@/options"

const { base16, colors } = options.theme

// @ts-expect-error
import mixins from "inline:./mixins.scss"
import GLib from "gi://GLib?version=2.0"

// const themeCSS = options.theme.css;

const tmpCSS = `${TMP}/tmp_styles.scss`
export const css = `${TMP}/style.css`

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const $ = (name: string, value: string | Opt<any>) => {
	if (value instanceof Opt) {
		return `$${name}: ${value.get()};`
	}
	return `$${name}: ${value};`
}

function mkCSSClass(variable: string) {
	return `
  .bg-${variable} {
    background-color: $${variable};
  }
  .fg-${variable} {
    color: $${variable};
  }
  .border-${variable} {
    border-color: $${variable};
  }
`
}

const baseVars = () =>
	Object.entries(options.theme.base16)
		.map(([key, value]) => $(key, value))
		.join("\n")

const baseClasses = () =>
	Object.keys(options.theme.base16).map(mkCSSClass).join("\n")

const aliasClasses = () => {
	const colorAliases = [
		"color01",
		"color02",
		"color03",
		"color04",
		"color05",
		"color06",
		"color07",
		"color08",
	]
		.map(mkCSSClass)
		.join("\n")

	return `
// BG
.bg {
  background-color: $bg;
}
.bg-alt {
  background-color: $bg-alt;
}
.bg-selected {
  background-color: $bg-selected;
}
// FG
.fg {
  color: $fg;
}
.fg-alt {
  color: $fg-alt;
}
.fg-selected {
  color: $fg-selected;
}
// WIDGET
.bg-widget {
  background-color: $widget-bg;
}
.fg-widget {
  color: $widget-fg;
}

.bg-hover {
  background-color: $hover-bg;
}
.fg-hover {
  color: $hover-fg;
}
// BORDER

.bordered {
  border: $border;
}
.rounded {
  border-radius: $radius;
}

${colorAliases}    
`
}
function transparantize(color: Opt<string>, opacity: Opt<number>) {
	return `color.adjust(${color.get()}, $alpha: -${opacity.get() / 100})`
}
const variables = () =>
	[
		$("font-size", options.font.size),
		$("font-name", options.font.name),

		$("color01", base16.base08),
		$("color02", base16.base09),
		$("color03", base16.base0A),
		$("color04", base16.base0B),
		$("color05", base16.base0C),
		$("color06", base16.base0D),
		$("color07", base16.base0E),
		$("color08", base16.base0F),
		// BG
		$("bg", transparantize(colors.bg.color, colors.bg.opacity)),
		$("bg-alt", transparantize(colors.bg.alt, colors.bg.opacity)),
		$("bg-selected", transparantize(colors.bg.selected, colors.bg.opacity)),
		// FG
		$("fg", transparantize(colors.fg.color, colors.fg.opacity)),
		$("fg-alt", transparantize(colors.fg.alt, colors.fg.opacity)),
		$("fg-selected", transparantize(colors.fg.light, colors.fg.opacity)),
		// BORDER
		$(
			"border-color",
			transparantize(colors.border.color, colors.border.opacity),
		),
		$("border-width", colors.border.width),
		$("border", "$border-width solid $border-color"),
		// WIDGET
		$("widget-bg", transparantize(colors.widget.bg, colors.widget.opacity)),
		$("widget-fg", colors.widget.fg),
		// HOVER
		$("hover-bg", transparantize(colors.hover.bg, colors.hover.opacity)),
		$("hover-fg", colors.hover.fg),

		// ERROR
		$("error-bg", colors.error.bg),
		$("error-fg", colors.error.fg),

		// SHADOWS
		$("shadows", colors.shadows.enabled),
		$("shadow-color", "rgba(0,0,0,.6)"),
		$("text-shadow", "2pt 2pt 2pt $shadow-color"),
		$(
			"box-shadow",

			"2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color",
		),

		// OTHERS
		// $("padding", options.theme.padding),
		$("transition", colors.other.transition),
		$("spacing", colors.other.spacing),
		$("radius", colors.other.radius),
	].join("\n")

const imports = () => {
	const fd = exec(`fd ".scss" ${GLib.getenv("HOME")}/.config/ags/components`)
	const files = fd.split(/\s+/)
	return files
		.map((f) => `@import '${f}';`)
		.reverse()
		.join("\n")
}

const functions = () =>
	`@function gtkalpha($c, $a) {
  @return string.unquote("alpha(#{$c},#{$a})");
}`
function resetCss() {
	// ensureDirectory(tmpCSS)
	ensureFile(tmpCSS)
	ensureFile(css)

	writeFile(
		tmpCSS,
		`
@use "sass:string";
@use "sass:color";
${functions()}
${baseVars()}
${baseClasses()}
${variables()}
${aliasClasses()}
${mixins}
${imports()}
`,
	)
	exec(`sass ${tmpCSS} ${css}`)

	// print(mixins);
	// print(readFile(tmpCSS));

	print("Applying CSS")
	App.apply_css(css, true)
}

// monitorFile
options.handler(["font", "theme", "bar"], resetCss)
resetCss()

export function applyCss() {
	resetCss()
}
