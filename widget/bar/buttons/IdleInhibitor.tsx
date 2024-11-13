import { exec, subprocess } from "astal/process";
import { Variable } from "astal";
import { dependencies, Notify } from "@/lib/utils";

type IdleState = "active" | "inactive" | "unknown";
function IdleInhibitor() {
  if (!dependencies("matcha")) return <></>;

  const idleVar = Variable<IdleState>("unknown");

  const handleLine = (line: string) => {
    print(line);
    const match: IdleState = line.startsWith("Starting")
      ? "active"
      : "inactive";
    idleVar.set(match);
    Notify({
      summary: "Idle Inhibitor",
      body: line,
      iconName: "dialog-information",
    });
  };

  const proc = subprocess(["matcha", "-d"], handleLine, handleLine);

  function toggle() {
    print("Toggling Idle Inhibitor");
    exec(["matcha", "-t"]);
  }

  return (
    <button
      className={
        "idle-inhibitor " +
        idleVar().as((s) => (s === "active" ? "active" : ""))
      }
      onDestroy={() => {
        idleVar.drop();
      }}
      onClicked={toggle}
      tooltipText={"Idle Inhibitor\nClick to toggle"}
      label={idleVar().as((s) => {
        switch (s) {
          case "active":
            return "󰅶";
          case "inactive":
            return "󰾫";

          default:
            return "";
        }
      })}
    ></button>
  );
}

export default IdleInhibitor;
