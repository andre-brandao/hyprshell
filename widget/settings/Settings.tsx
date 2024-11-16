import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { RegularWindow } from "../RegularWindow";
import { Group, Page, Row, Setter } from "./Blocks";
import { options } from "@/options";

import { Layout } from "./Layout";

import { Variable, GLib, bind, Binding } from "astal";
import icons from "@/lib/icons";
import Icon from "../Icon";

const current = Variable(Layout[0].name);

function Header() {
  // { title }: { title: string | Binding<string> }
  return (
    <centerbox
      className="Header"
      startWidget={
        <button className="reset">
          <Icon name={icons.ui.refresh} />
        </button>
      }
      centerWidget={
        <box>
          <label label="Settings" />
          -
          <label label={current()} />
        </box>
      }
      endWidget={
        <button
          // halign={ALIGN.END}
          // hexpand={false}
          className="close"
          onClicked={() => App.get_window("Settings")?.hide()}
        >
          <Icon name={icons.ui.close} />
        </button>
      }
    />
  );
}

function Pager() {
  return (
    <box
      className="Pager"
      vertical
    >
      {Layout.map(({ name }) => (
        <button
          // xalign={0}

          className={current().as((v) => `${v === name ? "active" : ""}`)}
          onClick={() => current.set(name)}
        >
          <box>
            {/* <Icon name={icon} /> */}
            <label label={name} />
          </box>
        </button>
      ))}
    </box>
  );
}
export default function SettingsWindow() {
  return (
    <RegularWindow
      visible={false}
      name={"Settings"}
      application={App}
      // @ts-expect-error
      onDeleteEvent={(self) => {
        self.hide();
        return true;
      }}
    >
      <box>
        <Pager />
        <box vertical>
          <Header title={bind(Layout[0], "name").as((n) => `${n}`)} />
          <stack
            // vertical
            shown={current()}
            children={Layout}
          />
        </box>
      </box>
    </RegularWindow>
  );
}
