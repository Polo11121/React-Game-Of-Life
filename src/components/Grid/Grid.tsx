import { useState } from "react";
import { Box } from "@/components";
import "@/components/Grid/Grid.css";

type GridProps = {
  grid: boolean[][];
  size: number;
  onSelectBox: (row: number, col: number) => void;
};

const BOX_SIZES = {
  25: 18,
  50: 9,
  75: 6,
  100: 4.5,
} as {
  [key: number]: number;
};

export const Grid = ({ size, grid, onSelectBox }: GridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownHandler = () => setIsMouseDown(true);
  const mouseUpHandler = () => setIsMouseDown(false);

  const boxSize = BOX_SIZES[size];

  return (
    <div
      className="grid"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      style={{
        gridTemplateColumns: `repeat(${size}, ${boxSize}px)`,
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
                boxSize={boxSize}
              />
            );
          })
        )
        .flat()}
    </div>
  );
};
