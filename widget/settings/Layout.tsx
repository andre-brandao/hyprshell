import { Group, Page, Row, Setter } from "./Blocks";
import { options } from "@/options";

const { bar, notification } = options;

export default function Layout() {
  return (
    <>
      <Page
        name="Bar"
        icon="i"
        children={[
          <Group
            title="Style"
            rows={[
              <Row title="Border Radius" opt={bar.border_radius} />,
              <Row title="Margin" opt={bar.margin} />,
              <Row title="Padding" opt={bar.padding} />,
            ]}
          />,
        ]}
      />
    </>
  );
}
