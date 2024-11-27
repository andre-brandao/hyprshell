export type Base16ColorScheme = {
	scheme: string
	author: string
	base00: string
	base01: string
	base02: string
	base03: string
	base04: string
	base05: string
	base06: string
	base07: string
	base08: string
	base09: string
	base0A: string
	base0B: string
	base0C: string
	base0D: string
	base0E: string
	base0F: string
}

export type Base16Color = keyof Base16ColorScheme
export type Color = Base16Color | string

import { readFile } from "astal/file"
import { exec, GLib } from "astal"
import { Notify } from "../utils"
import { options } from "@/options"

const stylixPath = `${GLib.getenv("HOME")}/.config/stylix/pallete.json`

const currentThemePath = `${GLib.getenv(
	"HOME",
)}/.config/stylix/current-theme.json`

const themeListDirectory = `${GLib.getenv("HOME")}/dotfiles/nixos/themes`

/**
 * Parses a theme file and returns a StylixColors object.
 * @param filePath Path to the theme file.
 * @returns A StylixColors object or undefined if parsing fails.
 */
export function parseThemeFile(
	filePath: string,
): Base16ColorScheme | undefined {
	if (!GLib.file_test(filePath, GLib.FileTest.EXISTS)) {
		Notify({
			appName: "Stylix",
			summary: "Theme File Not Found",
			body: `File does not exist: ${filePath}`,
		})
		return
	}

	const content = readFile(filePath)
	const lines = content.split("\n")

	const theme: Partial<Base16ColorScheme> = {}

	for (const line of lines) {
		const cleanedLine = line.split("#")[0].trim() // Remove comments and trim whitespace
		if (!cleanedLine) continue // Skip empty lines

		const [key, value] = cleanedLine.split(":").map((part) => part.trim())
		if (!key || !value) {
			Notify({
				appName: "Stylix",
				summary: "Invalid Line in Theme File",
				body: `Could not parse line: ${line}`,
			})
			return
		}

		// Normalize and assign the value
		if (
			key.startsWith("base") &&
			value.startsWith('"') &&
			value.endsWith('"')
		) {
			theme[key as keyof Base16ColorScheme] = `#${value.slice(1, -1)}` // Remove quotes
		} else if (key === "scheme" || key === "author") {
			theme[key as keyof Base16ColorScheme] = value
		} else {
			Notify({
				appName: "Stylix",
				summary: "Unexpected Key in Theme File",
				body: `Unexpected key: ${key}`,
			})
			return
		}
	}

	// Validate all required keys
	const isValid = validateStylixColors(theme)
	if (!isValid) {
		return
	}

	return theme as Base16ColorScheme
}

/**
 * Validates the parsed StylixColors object.
 * @param colors Partial StylixColors object.
 * @returns True if valid, otherwise false.
 */
export function validateStylixColors(
	colors: Partial<Base16ColorScheme>,
): boolean {
	const expectedKeys = [
		"scheme",
		"author",
		"base00",
		"base01",
		"base02",
		"base03",
		"base04",
		"base05",
		"base06",
		"base07",
		"base08",
		"base09",
		"base0A",
		"base0B",
		"base0C",
		"base0D",
		"base0E",
		"base0F",
	]

	const missingKeys = expectedKeys.filter((key) => !(key in colors))

	if (missingKeys.length > 0) {
		Notify({
			appName: "Stylix",
			summary: "Invalid Theme File",
			body: `Missing keys: ${missingKeys.join(", ")}`,
		})
		return false
	}

	return true
}

export function listBase16Themes() {
	const fd = exec(`fd ".yaml" ${themeListDirectory}`)
	const files = fd.split(/\s+/)
	return files.map((f) => ({
		name: f.split("/").pop(),
		path: f,
	}))
}

export function applyTheme(theme: Base16ColorScheme) {
	const base16 = options.theme.base16
	base16.base00.set(`${theme.base00}`)
	base16.base01.set(`${theme.base01}`)
	base16.base02.set(`${theme.base02}`)
	base16.base03.set(`${theme.base03}`)
	base16.base04.set(`${theme.base04}`)
	base16.base05.set(`${theme.base05}`)
	base16.base06.set(`${theme.base06}`)
	base16.base07.set(`${theme.base07}`)
	base16.base08.set(`${theme.base08}`)
	base16.base09.set(`${theme.base09}`)
	base16.base0A.set(`${theme.base0A}`)
	base16.base0B.set(`${theme.base0B}`)
	base16.base0C.set(`${theme.base0C}`)
	base16.base0D.set(`${theme.base0D}`)
	base16.base0E.set(`${theme.base0E}`)
	base16.base0F.set(`${theme.base0F}`)
}
