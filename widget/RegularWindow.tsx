import GObject from "gi://GObject";
import { Gtk, Gdk, Widget, astalify, type ConstructProps } from "astal/gtk3";
import COLROS from "./bar/ColorDebug";
import Layout from "./settings/Layout";

export class RegularWindow extends astalify(Gtk.ColorButton) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<
      RegularWindow,
      Gtk.ColorButton.ConstructorProps,
      { onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
    >
  ) {
    super(props as any);
  }
}

export function TestRWindow() {
  // function setup(button: RegularWindow) {}

  return (
    <RegularWindow
      className={"settings-dialog"}
      useAlpha
      onDeleteEvent={(self) => {
        self.hide();
        return true;
      }}
    >
      {/* <COLROS /> */}
      <Layout />
    </RegularWindow>
  );
}
