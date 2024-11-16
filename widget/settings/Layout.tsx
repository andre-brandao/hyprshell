import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { RegularWindow } from "../RegularWindow";
import { Group, Page, Row, Setter } from "./Blocks";
import { options } from "@/options";

const { bar, notification, theme, font } = options;

export const Layout = [
  <Page
    name="Theme"
    icon="i"
  >
    <Group title="Font">
      <Row
        title="Font Size"
        type="string"
        opt={font.size}
      />

      <Row
        title="Font Name"
        type="font"
        opt={font.name}
      />
    </Group>
    <Group title="Colors">
      <Row
        title="Background"
        type="color"
        opt={theme.bg}
      />

      <Row
        title="Foreground"
        type="color"
        opt={theme.fg}
      />

      <Row
        title="Primary Background"
        type="color"
        opt={theme.primary.bg}
      />

      <Row
        title="Primary Foreground"
        type="color"
        opt={theme.primary.fg}
      />

      <Row
        title="Error Background"
        type="color"
        opt={theme.error.bg}
      />

      <Row
        title="Error Foreground"
        type="color"
        opt={theme.error.fg}
      />

      <Row
        title="Border Color"
        type="color"
        opt={theme.border.color}
      />

      <Row
        title="Border Width"
        type="string"
        opt={theme.border.width}
      />
    </Group>
  </Page>,
  <Page
    name="Bar"
    icon="i"
  >
    <Group title="Bar">
      <Row
        title="Widgets"
        opt={bar.layout.start}
      />
      <Row
        title="Widgets"
        opt={bar.layout.center}
      />
      <Row
        title="Widgets"
        opt={bar.layout.end}
      />
    </Group>
  </Page>,
];
