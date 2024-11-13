import { exec, subprocess } from "astal/process";
import { Variable } from "astal";
import { dependencies } from "@/lib/utils";

type IdleState = "active" | "idle" | "inactive" | "unknown";
function IdleInhibitor() {
  if (!dependencies("matcha")) return <></>;

  const idleVar = Variable<IdleState>("unknown");

  const proc = subprocess(
    ["matcha", "-d"],
    (line) => {
      print(line);
      const match: IdleState = line.startsWith("Starting")
        ? "inactive"
        : "idle";
      idleVar.set(match);
    },
    (line) => {
      print(line);
      const match: IdleState = line.startsWith("Starting")
        ? "inactive"
        : "idle";
      idleVar.set(match);
    }
  );

  function toggle() {
    print("Toggling Idle Inhibitor");
    exec(["matcha", "-t"]);
  }

  return (
    <button
      onDestroy={() => {
        idleVar.drop();
      }}
      onClicked={toggle}
    >
      {idleVar().as((s) => (
        <>{s}</>
      ))}
    </button>
  );
}

export default IdleInhibitor;
