import { useState } from "react";
import { Box } from "@/components";
import "@/components/Grid/Grid.css";

type GridProps = {
  grid: boolean[][];
  size: {
    rows: number;
    cols: number;
  };
  onSelectBox: (row: number, col: number) => void;
};

export const Grid = ({ size, grid, onSelectBox }: GridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const width = size.cols * 16;

  const mouseDownHandler = () => setIsMouseDown(true);
  const mouseUpHandler = () => setIsMouseDown(false);

  return (
    <div
      className="grid"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      style={{
        width,
      }}
    >
      {grid
        .map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const boxId = `${rowIndex}-${colIndex}`;

            return (
              <Box
                isMouseDown={isMouseDown}
                key={boxId}
                boxId={boxId}
                row={rowIndex}
                cols={colIndex}
                onSelectBox={onSelectBox}
                className={col ? "on" : "off"}
              />
            );
          })
        )
        .flat()}
    </div>
  );
};
