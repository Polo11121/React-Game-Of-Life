import "@/components/Box/Box.css";

type BoxProps = {
  className: string;
  boxId: string;
  row: number;
  cols: number;
  onSelectBox: (row: number, col: number) => void;
  isMouseDown: boolean;
};

export const Box = ({
  className,
  boxId,
  row,
  cols,
  onSelectBox,
  isMouseDown,
}: BoxProps) => {
  const mouseOverHandler = () => {
    if (isMouseDown) {
      onSelectBox(row, cols);
    }
  };

  const clickHandler = () => onSelectBox(row, cols);

  return (
    <div
      className={`box ${className}`}
      onMouseOver={mouseOverHandler}
      onClick={clickHandler}
      id={boxId}
    ></div>
  );
};
