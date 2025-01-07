import { fetch } from "@/lib/modules/fetch"
import { Notify } from "../utils"
import { options } from "@/options"

import { exec, GLib, execAsync } from "astal"

export type Base16ColorScheme = {
	name?: string
	author?: string
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

function parseBase16Colors(yamlText: string): Base16ColorScheme | null {
	// Split the YAML text into lines
	const lines = yamlText.split("\n")

	// Initialize an object to hold the parsed values
	const colors: Partial<Base16ColorScheme> = {}

	// Loop through each line to extract the color codes and other properties
	for (const line of lines) {
		const trimmedLine = line.trim()

		// Ignore lines that don't have a color palette (not starting with "base")
		if (trimmedLine.startsWith("base")) {
			const [key, value] = trimmedLine.split(":").map((part) => part.trim())

			// Clean up the value by removing the extra quotes and escape characters
			const cleanValue = value
				.replace(/\\["\n\r]/g, "")
				.replace(/"/g, "")
				.trim()

			// Assign to the corresponding property in the colors object
			colors[key as keyof Base16ColorScheme] = cleanValue
		}

		// Capture name and author if they exist, cleaning any unnecessary escape characters
		if (trimmedLine.startsWith("name:") || trimmedLine.startsWith("author:")) {
			const [key, value] = trimmedLine.split(":").map((part) => part.trim())
			if (key === "name" || key === "author") {
				// Clean the string by removing any escape characters
				const cleanValue = value
					.replace(/\\["\n\r]/g, "")
					.replace(/"/g, "")
					.trim()
				colors[key as keyof Base16ColorScheme] = cleanValue
			}
		}
	}

	// Return the colors object if we have all base colors, else return null
	if (Object.keys(colors).length < 16) {
		return null // Not all colors were found
	}

	return colors as Base16ColorScheme
}

const THEMES_LIST_URL =
	"https://api.github.com/repos/tinted-theming/schemes/contents/base16"
/**
 * Parses and downloads a theme file from a URL, returning a Base16ColorScheme object.
 * @param fileUrl The URL to the theme file.
 * @returns A Base16ColorScheme object or undefined if parsing fails.
 */
export async function getThemeColors(
	filePath: string,
): Promise<Base16ColorScheme | undefined> {
	// Fetch the file content using curl
	let content: string

	try {
		content = await execAsync(`curl -s ${filePath}`)
	} catch (error) {
		Notify({
			appName: "Stylix",
			summary: "Failed to Fetch Theme",
			body: `Unable to fetch theme file: ${error}`,
		})
		return
	}
	const theme = parseBase16Colors(content)
	if (!theme) {
		Notify({
			appName: "Stylix",
			summary: "Invalid Theme File",
			body: "The theme file is invalid or incomplete.",
		})
		return
	}
	print(JSON.stringify(theme))
	const isValid = validateStylixColors(theme)
	if (!isValid) {
		return
	}
	return theme
}

/**
 * Validates the parsed Base16ColorScheme object.
 * @param colors Partial Base16ColorScheme object.
 * @returns True if valid, otherwise false.
 */
export function validateStylixColors(
	colors: Partial<Base16ColorScheme>,
): boolean {
	const expectedKeys = [
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

/**
 * Lists Base16 themes from the GitHub repository.
 * @returns A list of theme file details or an empty array on failure.
 */
export async function listBase16Themes(): Promise<
	{
		name: string
		download_url: string
	}[]
> {
	try {
		const response = await execAsync(`curl ${THEMES_LIST_URL}`)
			.then((res) => {
				// print(res)
				return JSON.parse(res)
			})
			.catch((err) => {
				printerr(err)
			})

		const themes = response.map(
			(file: {
				name: string
				download_url: string
			}) => ({
				name: file.name,
				download_url: file.download_url,
			}),
		)

		return themes
	} catch (error) {
		return []
	}
}

/**
 * Applies a Base16 color scheme.
 * @param theme The Base16 color scheme to apply.
 */
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
