import Mpris from "gi://AstalMpris";
import MediaPlayer from "@/widget/media-player/MediaPlayer";

import { Variable, GLib, bind } from "astal";

import { Astal, Gtk, Gdk, Widget, App } from "astal/gtk3";

function Padding({ name = "", css = "", hexpand = true, vexpand = true }) {
  return (
    <eventbox
      can_focus={false}
      hexpand={hexpand}
      vexpand={vexpand}
      // onButtonPressEvent={() => App.toggle_window(name)}
    >
      <box css={css}>{name}</box>
    </eventbox>
  );
}

function PopupRevealer({
  name,
  child,
  transitionType = 5,
}: {
  name: string;
  child?: JSX.Element;
  transitionType?: Widget.RevealerProps["transitionType"];
}) {
  return (
    <box css="padding: 1px;">
      <revealer
        transitionType={transitionType}
        transitionDuration={200}
        setup={
          (self) =>
            App.connect("window-toggled", (_, wname) => {
              if (wname.name === name) {
                self.reveal_child = !self.reveal_child;
              }
            })

          // self.hook(App, (_, wname, visible) => {
          //   if (wname === name) self.reveal_child = visible;
          //   App.
          // })
        }
      >
        <box className="window-content">{child}</box>
      </revealer>
    </box>
  );
}

function Layout({ name, child }: { name: string; child: JSX.Element }) {
  return {
    center: () => (
      <centerbox>
        <Padding name={name} />
        <centerbox vertical={true}>
          <Padding name={name} />
          <PopupRevealer name={name} child={child} />
          <Padding name={name} />
        </centerbox>
        <Padding name={name} />
      </centerbox>
    ),
    top: () => (
      <centerbox>
        <Padding name={name} />
        <box vertical={true}>
          <PopupRevealer name={name} child={child} />
          <Padding name={name} />
        </box>
        <Padding name={name} />
      </centerbox>
    ),
    "top-right": () => (
      <box>
        <Padding name={name} />
        <box vertical={true} hexpand={false}>
          <PopupRevealer name={name} child={child} />
          <Padding name={name} />
        </box>
      </box>
    ),
    "top-center": () => (
      <box>
        <Padding name={name} />
        <box vertical={true} hexpand={false}>
          <PopupRevealer name={name} child={child} />
          <Padding name={name} />
        </box>
      </box>
    ),
  };
}

export default ({
  name,
  child,
  layout,
  exclusivity = "ignore",
}: {
  exclusivity?: "ignore" | "exclusive";
  name: string;
  child: JSX.Element;
  layout: keyof ReturnType<typeof Layout>;
}) => {
  const { TOP, BOTTOM, RIGHT, LEFT } = Astal.WindowAnchor;
  return (
    <window
      className={"popup-window"}
      visible={false}
      // anchor={[TOP, BOTTOM, RIGHT, LEFT]}
    >
      {Layout({ name, child })[layout]()}
    </window>
  );
};
