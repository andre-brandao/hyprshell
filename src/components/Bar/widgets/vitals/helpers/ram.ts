import GLib from "gi://GLib"
import { divide } from "@/lib/utils"

import { Variable as VariableType } from "astal"
import type { GenericResourceData } from "."

export const computeRamUsage = (): //   round: VariableType<boolean>
GenericResourceData => {
	try {
		const [success, meminfoBytes] = GLib.file_get_contents("/proc/meminfo")

		if (!success || !meminfoBytes) {
			throw new Error("Failed to read /proc/meminfo or file content is null.")
		}

		const meminfo = new TextDecoder("utf-8").decode(meminfoBytes)

		const totalMatch = meminfo.match(/MemTotal:\s+(\d+)/)
		const availableMatch = meminfo.match(/MemAvailable:\s+(\d+)/)

		if (!totalMatch || !availableMatch) {
			throw new Error("Failed to parse /proc/meminfo for memory values.")
		}

		const totalRamInBytes = Number.parseInt(totalMatch[1], 10) * 1024
		const availableRamInBytes = Number.parseInt(availableMatch[1], 10) * 1024

		let usedRam = totalRamInBytes - availableRamInBytes
		usedRam = Number.isNaN(usedRam) || usedRam < 0 ? 0 : usedRam

		return {
			percentage: divide([totalRamInBytes, usedRam], false),
			total: totalRamInBytes,
			used: usedRam,
			free: availableRamInBytes,
		}
	} catch (error) {
		console.error("Error calculating RAM usage:", error)
		return { total: 0, used: 0, percentage: 0, free: 0 }
	}
}
