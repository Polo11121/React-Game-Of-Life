import { FocusEvent, useState } from "react";
import { Button, Grid, Input } from "@/components";
import "@/App.css";

export const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [size, setSize] = useState({
    rows: 50,
    cols: 50,
  });
  const [generations, setGenerations] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array(size.rows).fill(Array(size.cols).fill(false))
  );
  const isDisabled = grid.flat().every((box) => !box);

  const selectBoxHandler = (row: number, col: number) =>
    setGrid((prevGrid) =>
      prevGrid.map((gridRow, i) =>
        gridRow.map((gridColumn, j) =>
          i === row && j === col ? !gridColumn : gridColumn
        )
      )
    );

  const stopGameHandler = () => {
    if (window.gameOfLife != undefined && window.gameOfLife != "undefined") {
      window.clearInterval(window.gameOfLife);
    }

    setIsStarted(false);
  };

  const startGameHandler = () => {
    if (isDisabled) {
      return alert("You must generate seed first!");
    }

    stopGameHandler();
    setIsStarted(true);

    window.gameOfLife = setInterval(() => {
      setGrid((prevGrid) =>
        prevGrid.map((gridRow, i) =>
          gridRow.map((gridColumn, j) => {
            let neighborsCount = 0;

            if (i > 0 && prevGrid[i - 1][j]) {
              neighborsCount++;
            }
            if (i > 0 && j > 0 && prevGrid[i - 1][j - 1]) {
              neighborsCount++;
            }
            if (i > 0 && j < size.cols - 1 && prevGrid[i - 1][j + 1]) {
              neighborsCount++;
            }
            if (j < size.cols - 1 && prevGrid[i][j + 1]) {
              neighborsCount++;
            }
            if (j > 0 && prevGrid[i][j - 1]) {
              neighborsCount++;
            }
            if (i < size.rows - 1 && prevGrid[i + 1][j]) {
              neighborsCount++;
            }
            if (i < size.rows - 1 && j > 0 && prevGrid[i + 1][j - 1]) {
              neighborsCount++;
            }
            if (
              i < size.rows - 1 &&
              j < size.cols - 1 &&
              prevGrid[i + 1][j + 1]
            ) {
              neighborsCount++;
            }

            if (prevGrid[i][j] && (neighborsCount < 2 || neighborsCount > 3)) {
              return false;
            }

            if (!prevGrid[i][j] && neighborsCount === 3) {
              return true;
            }

            return gridColumn;
          })
        )
      );

      setGenerations((prevGen) => prevGen + 1);
    }, speed);
  };

  const changeRowsHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    const rows = +event.target.value;
    setSize((prevGrid) => ({ ...prevGrid, rows }));
    stopGameHandler();
    setGrid(Array(rows).fill(Array(size.cols).fill(false)));
    setGenerations(0);
  };
  const changeColsHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    const cols = +event.target.value;
    setSize((prevGrid) => ({ ...prevGrid, cols }));
    stopGameHandler();
    setGrid(Array(size.rows).fill(Array(cols).fill(false)));
    setGenerations(0);
  };
  const changeSpeedHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    setSpeed(+event.target.value);

    if (isStarted) {
      startGameHandler();
    }
  };
  const generateSeedHandler = () => {
    setGrid((prevGrid) =>
      prevGrid.map((gridRow) => gridRow.map(() => Math.random() >= 0.9))
    );
    stopGameHandler();
    setGenerations(0);
  };

  return (
    <div>
      <div className="form">
        <div className="form-input">
          <Input
            labelText="Rows"
            min={10}
            id="rows"
            type="number"
            onChange={changeRowsHandler}
            value={size.rows}
          />
          <Input
            labelText="Columns"
            id="columns"
            min={10}
            onChange={changeColsHandler}
            value={size.cols}
          />
          <Input
            labelText="Speed (ms)"
            id="speed"
            type="number"
            onChange={changeSpeedHandler}
            value={speed}
          />
        </div>
        <div className="form-buttons">
          <Button color="green" onClick={generateSeedHandler}>
            Generate Seed
          </Button>
          <Button disabled={!isStarted} color="red" onClick={stopGameHandler}>
            Stop Game
          </Button>
          <Button disabled={isStarted} color="blue" onClick={startGameHandler}>
            Start Game
          </Button>
        </div>
      </div>
      <h1>Game of Life Michał Jasiński 155280</h1>
      <h2>Generations: {generations}</h2>
      <Grid grid={grid} size={size} onSelectBox={selectBoxHandler} />
    </div>
  );
};
