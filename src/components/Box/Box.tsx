import "@/components/Box/Box.css";

type BoxProps = {
  className: string;
  boxId: string;
  row: number;
  cols: number;
  onSelectBox: (row: number, col: number) => void;
  isMouseDown: boolean;
  boxSize: number;
};

export const Box = ({
  className,
  boxId,
  row,
  cols,
  onSelectBox,
  isMouseDown,
  boxSize,
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
      style={{
        height: boxSize,
        width: boxSize,
      }}
      onMouseOver={mouseOverHandler}
      onClick={clickHandler}
      id={boxId}
    ></div>
  );
};
