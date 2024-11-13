import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import {
  readFile,
  readFileAsync,
  writeFile,
  writeFileAsync,
  monitorFile,
  Gio,
} from "astal/file";
import { interval, timeout, idle } from "astal/time";
import { subprocess, exec, execAsync } from "astal/process";

export function ensureDirectory(path: string) {
  if (GLib.file_test(path, GLib.FileTest.EXISTS)) {
    print(`creating directory: ${path}`);
    GLib.mkdir_with_parents(path, 0o777);
  }
}

/**
 * @returns true if all of the `bins` are found
 */
export function dependencies(...bins: string[]) {
  const missing = bins.filter((bin) => {
    execAsync(`which ${bin}`)
      .then((out) => true)
      .catch((err) => false);
  });

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(", ")}`));
    // notify(`missing dependencies: ${missing.join(", ")}`);
  }

  return missing.length === 0;
}

/**
 * @returns execAsync(cmd)
 */
export function sh(cmd: string | string[]) {
  return execAsync(cmd).catch((err) => {
    printerr(typeof cmd === "string" ? cmd : cmd.join(" "), err);
    return "";
  });
}

/**
 * @returns execAsync(["bash", "-c", cmd])
 */
export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd =
    typeof strings === "string"
      ? strings
      : strings.flatMap((str, i) => str + `${values[i] ?? ""}`).join("");

  return execAsync(["bash", "-c", cmd]).catch((err) => {
    console.error(cmd, err);
    return "";
  });
}

export function forMonitors(widget: (monitor: number) => Gtk.Window) {
  const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
  return range(n, 0).flatMap(widget);
}

/**
 * @returns [start...length]
 */
export function range(length: number, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}
