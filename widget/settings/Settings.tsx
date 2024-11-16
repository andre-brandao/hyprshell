import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { RegularWindow } from "../RegularWindow";
import { Group, Page, Row, Setter } from "./Blocks";
import { options } from "@/options";

import { Layout } from "./Layout";

import { Variable, GLib, bind, Binding } from "astal";

function Header({ title }: { title: string | Binding<string> }) {
  return (
    <box>
      <label label="Settings" />
      <label label={title} />
    </box>
  );
}
export default function SettingsWindow() {
  // const current = Variable(Layout()[0].);

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
      <box vertical>
        <Header title={bind(Layout[0], "name").as((n) => `${n}`)} />
        <stack
          // vertical
          shown={"Theme"}
          children={Layout}
        />
      </box>
    </RegularWindow>
  );
}
