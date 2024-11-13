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
import { ensureDirectory } from "./utils";

type OptProps = {
  persistent?: boolean;
};

export class Opt<T = unknown> extends Variable<T> {
  constructor(initial: T, { persistent = false }: OptProps = {}) {
    super(initial);
    this.initial = initial;
    this.persistent = persistent;
  }

  initial: T;
  id = "";
  persistent: boolean;

  //   toString() {
  //     return `${this.value}`;
  //   }
  toJSON() {
    return `opt:${this.get()}`;
  }

  getValue = (): T => {
    // return super.getValue();
    return this.get();
  };

  init(cacheFile: string) {
    const cacheV = JSON.parse(readFile(cacheFile) || "{}")[this.id];
    // if (cacheV !== undefined) this.value = cacheV;
    if (cacheV !== undefined) this.set(cacheV);

    this.subscribe((v) => {
      const cache = JSON.parse(readFile(cacheFile) || "{}");
      cache[this.id] = this.get();
      writeFile(cacheFile, JSON.stringify(cache, null, 2));
    });
    // this.connect("changed", () => {
    //   const cache = JSON.parse(Utils.readFile(cacheFile) || "{}");
    //   cache[this.id] = this.value;
    //   Utils.writeFileSync(JSON.stringify(cache, null, 2), cacheFile);
    // });
  }

  reset() {
    if (this.persistent) return;

    if (JSON.stringify(this.get()) !== JSON.stringify(this.initial)) {
      //   this.value = this.initial;
      this.set(this.initial);
      return this.id;
    }
  }
}

export const opt = <T>(initial: T, opts?: OptProps) => new Opt(initial, opts);

function getOptions(object: object, path = ""): Opt[] {
  return Object.keys(object).flatMap((key) => {
    // @ts-expect-error
    const obj: Opt = object[key];
    const id = path ? path + "." + key : key;

    if (obj instanceof Variable) {
      obj.id = id;
      return obj;
    }

    if (typeof obj === "object") return getOptions(obj, id);

    return [];
  });
}

export function mkOptions<T extends object>(cacheFile: string, object: T) {
  for (const opt of getOptions(object)) opt.init(cacheFile);
  const configFile = `${TMP}/config.json`;
  ensureDirectory(cacheFile.split("/").slice(0, -1).join("/"));
  ensureDirectory(configFile.split("/").slice(0, -1).join("/"));

  print("cacheFile", cacheFile);
  print("configFile", configFile);

  const values = getOptions(object).reduce(
    (obj, opt) => ({ [opt.id]: opt.get(), ...obj }),
    {}
  );
  print(values);
  print(configFile);

  writeFile(configFile, JSON.stringify(values, null, 2));
  monitorFile(configFile, () => {
    const cache = JSON.parse(readFile(configFile) || "{}");
    for (const opt of getOptions(object)) {
      if (JSON.stringify(cache[opt.id]) !== JSON.stringify(opt.get()))
        // opt.value = cache[opt.id];
        opt.set(cache[opt.id]);
    }
  });

  function sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function reset(
    [opt, ...list] = getOptions(object),
    id = opt?.reset()
  ): Promise<Array<string>> {
    if (!opt) return sleep().then(() => []);

    return id
      ? [id, ...(await sleep(50).then(() => reset(list)))]
      : await sleep().then(() => reset(list));
  }

  return Object.assign(object, {
    configFile,
    array: () => getOptions(object),
    async reset() {
      return (await reset()).join("\n");
    },
    handler(deps: string[], callback: () => void) {
      for (const opt of getOptions(object)) {
        if (deps.some((i) => opt.id.startsWith(i))) opt.subscribe(callback);
        //   opt.connect("changed", callback);
      }
    },
  });
}
