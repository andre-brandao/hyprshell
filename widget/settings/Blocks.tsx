import { Opt } from "@/lib/option";
import Gtk from "gi://Gtk?version=3.0";
import { Variable, GLib, bind } from "astal";

export type RowProps<T> = {
  opt: Opt<T>;
  title: string;
  note?: string;
  type?:
    | "number"
    | "color"
    | "float"
    | "object"
    | "string"
    | "enum"
    | "boolean"
    | "img"
    | "font";
  enums?: string[];
  max?: number;
  min?: number;
};

export function Row<T>(props: RowProps<T>) {
  return (
    <box
      className={"row"}
      tooltipText={props.note ? `note: ${props.note}` : ""}
    >
      <box vertical={true} valign={ALIGN.CENTER}>
        <label xalign={0} className={"row-title"} label={props.title} />
        <label xalign={0} className={"id"} label={props.opt.id}></label>
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
      <button onClicked={() => props.opt.reset()} valign={ALIGN.CENTER}>
        Reset
      </button>
    </box>
  );
}
function EnumSetter({ opt, values }: { opt: Opt<string>; values: string[] }) {
  const step = (dir: 1 | -1) => {
    const i = values.findIndex((i) => i === opt().get());
    opt.set(
      dir > 0
        ? i + dir > values.length - 1
          ? values[0]
          : values[i + dir]
        : i + dir < 0
        ? values[values.length - 1]
        : values[i + dir]
    );
  };
  return (
    <box className={"enum-setter"}>
      <label>{bind(opt).as((v) => `${v}`)}</label>
      <button onClicked={() => step(-1)}>-</button>
      <button onClicked={() => step(1)}>+</button>
    </box>
  );
}

export function Setter<T>({
  opt,
  type = typeof opt.get() as RowProps<T>["type"],
  enums,
  max = 1000,
  min = 0,
}: RowProps<T>) {
  switch (type) {
    // case "number":
    //   return <entry></entry>;

    case "float":
    case "object":
      return (
        <entry
          setup={(self) =>
            self.hook(opt, (self) => (self.text = JSON.stringify(opt.get())))
          }
          onActivate={(self) => opt.set(JSON.parse(self.text || ""))}
        ></entry>
      );

    case "string":
      return (
        <entry
          setup={(self) =>
            self.hook(opt, (self) => (self.text = opt.get() as string))
          }
          onActivate={(self) => opt.set(self.text as T)}
        ></entry>
      );

    case "enum":
      return <EnumSetter opt={opt as unknown as Opt<string>} values={enums!} />;
    case "boolean":
      return (
        <>
          <switch active={bind(opt as Opt<boolean>)}></switch>
        </>
      );

    // case "img":
    //   return <></>;
    default:
      break;
  }
  return <label label={"no setter with type " + type}></label>;
}

export function Group({
  title,
  children,
}: {
  title: string;
  children: ReturnType<typeof Row<any>>[];
}) {
  return (
    <box className={"group"} vertical={true}>
      <box>
        <label className={"group-title"} label={title}></label>
        {title ? (
          <button
            hexpand={true}
            halign={ALIGN.END}
            className={"group-reset"}
            // sensitive= () merger binds of rows
          >
            IconP
          </button>
        ) : (
          <box>Hello</box>
        )}
      </box>
    </box>
  );
}

export function Page<T>({
  name,
  icon,
  children,
}: {
  name: string;
  icon: string;
  children: ReturnType<typeof Group>[];
}) {
  return (
    <box className={"page"} name={name}>
      <scrollable css="min-height: 300px;">
        <box
          vexpand={true}
          vertical={true}
          className={"page-content"}
          children={children}
        />
      </scrollable>
    </box>
  );
}
