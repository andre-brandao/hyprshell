import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { RegularWindow } from "../RegularWindow";
import { Group, Page, Row, Setter } from "./Blocks";
import { options } from "@/options";

const { bar, notification } = options;

export default function Layout() {
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
      //   setup={(win) => {
      //     // win.show();
      //     print(win);
      //     win.connect("delete-event", () => {
      //       win.hide();
      //       return true;
      //     });
      //     win.set_size_request(400, 600);
      //   }}
    >
      {/* <box className={"Settings-box"}> */}
      {/* <box>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
          quasi, atque totam harum deserunt aliquid quas eum natus perspiciatis
          consectetur possimus culpa, labore odit debitis maiores vero
          voluptates non praesentium?
        </box> */}

      <Page
        name="Bar"
        icon="i"
        children={[
          <Group
            title="Style"
            children={[
              <Row title="Border Radius" opt={bar.border_radius} />,
              <Row title="Margin" opt={bar.margin} />,
              <Row title="Padding" opt={bar.padding} />,
            ]}
          />,
          <Group
            title="Background"
            children={[
              <Row title="Color" opt={bar.flat_buttons} />,
              <Row title="Opacity" opt={bar.idle_inhibitor.notify} />,
            ]}
          />,
        ]}
      />
      {/* </box> */}
    </RegularWindow>
  );
}
