type Props = {
  child?: JSX.Element;
};

function PopUpWindow(props: Props) {
  return (
    <window className="PopUpWindow" >
      {props.child}
    </window>
  );
}
