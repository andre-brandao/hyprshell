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
            rows={[<Row title="Start" opt={bar.layout.start} />]}
          />,
          <Group title="Center" rows={[]} />,
          <Group title="Right" rows={[]} />,
        ]}
      />
    </>
  );
}
