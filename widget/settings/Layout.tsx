// import { App, Astal, Gdk, Gtk } from "astal/gtk3";
// import { RegularWindow } from "../RegularWindow";
// import { Group, Page, Row, Setter } from "./Blocks";
// import { options } from "@/options";

// const { bar, notification } = options;

// export default function Layout() {
//   return (
//     <RegularWindow
//       visible={true}
//       name={"Settings"}
//       setup={(win) => {
//         // win.show();
//         print(win);
//         win.connect("delete-event", () => {
//           win.hide();
//           return true;
//         });
//         win.set_size_request(400, 600);
//       }}
//     >
//       <Page
//         name="Bar"
//         icon="i"
//         children={[
//           <Group
//             title="Style"
//             rows={[
//               <Row title="Border Radius" opt={bar.border_radius} />,
//               <Row title="Margin" opt={bar.margin} />,
//               <Row title="Padding" opt={bar.padding} />,
//             ]}
//           />,
//         ]}
//       />
//     </RegularWindow>
//   );
// }
