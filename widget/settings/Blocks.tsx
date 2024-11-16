import { Opt } from "@/lib/option";
// import Gtk from "gi://Gtk?version=3.0";
import { Variable, GLib, bind, Binding } from "astal";
import Icon from "../Icon";
import icons from "@/lib/icons";
import GObject from "gi://GObject";
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3";

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

// subclass, register, define constructor props
class ColorButton extends astalify(Gtk.ColorButton) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<
      ColorButton,
      Gtk.ColorButton.ConstructorProps,
      { onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
    >,
  ) {
    super(props as any);
  }
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
        : values[i + dir],
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
    case "number":
    // return <spin></spin>;

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
      return (
        <EnumSetter
          opt={opt as unknown as Opt<string>}
          values={enums!}
        />
      );
    case "boolean":
      return <switch active={bind(opt as Opt<boolean>)}></switch>;

    case "color":
      const color = new Gdk.RGBA();
      color.parse(opt.get() as string);

      return (
        <ColorButton
          rgba={color}
          setup={(self) =>
            self.hook(opt, (self) => {
              const rgba = new Gdk.RGBA();
              rgba.parse(opt.get() as string);
              print("rgba" + opt.get(), rgba);
              self.rgba = rgba;
            })
          }
          onColorSet={({ rgba: { red, green, blue } }) => {
            const hex = (n: number) => {
              const c = Math.floor(255 * n).toString(16);
              return c.length === 1 ? `0${c}` : c;
            };
            opt.set(`#${hex(red)}${hex(green)}${hex(blue)}` as T);
          }}
        ></ColorButton>
      );

    // case "img":
    //   return <></>;
    default:
      return <label label={"no setter with type " + type}></label>;
      break;
  }
  return <label label={"no setter"}></label>;
}

export function Group({
  title,
  children,
}: {
  title: string;
  children?: ReturnType<typeof Row<any>>[];
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
  );
}

export function Page<T>({
  name,
  icon,
  children,
}: {
  name: string | Binding<string>;
  icon: string;
  children?: ReturnType<typeof Group>[];
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
  );
}
