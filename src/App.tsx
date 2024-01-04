import { FocusEvent, useEffect, useState } from "react";
import { Button, Grid, Input, Select } from "@/components";
import "@/App.css";

const SIZES = [
  {
    label: "25x25",
    value: 25,
  },
  {
    label: "50x50",
    value: 50,
  },
  {
    label: "75x75",
    value: 75,
  },
  {
    label: "100x100",
    value: 100,
  },
];

const SPEEDS = [
  {
    label: "1000",
    value: 1000,
  },
  {
    label: "500",
    value: 500,
  },
  {
    label: "250",
    value: 250,
  },
  {
    label: "100",
    value: 100,
  },
];

export const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [size, setSize] = useState(25);
  const [numberOfIterations, setNumberOfIterations] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array(size).fill(Array(size).fill(false))
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
    if (iterations === numberOfIterations) {
      setIterations(0);
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
            if (i > 0 && j < size - 1 && prevGrid[i - 1][j + 1]) {
              neighborsCount++;
            }
            if (j < size - 1 && prevGrid[i][j + 1]) {
              neighborsCount++;
            }
            if (j > 0 && prevGrid[i][j - 1]) {
              neighborsCount++;
            }
            if (i < size - 1 && prevGrid[i + 1][j]) {
              neighborsCount++;
            }
            if (i < size - 1 && j > 0 && prevGrid[i + 1][j - 1]) {
              neighborsCount++;
            }
            if (i < size - 1 && j < size - 1 && prevGrid[i + 1][j + 1]) {
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

      setIterations((prevGen) => prevGen + 1);
    }, speed);
  };

  const changeSizeHandler = (event: FocusEvent<HTMLSelectElement, Element>) => {
    const size = +event.target.value;
    setSize(size);
    stopGameHandler();
    setGrid(Array(size).fill(Array(size).fill(false)));
    setIterations(0);
  };
  const changeSpeedHandler = (
    event: FocusEvent<HTMLSelectElement, Element>
  ) => {
    setSpeed(+event.target.value);
  };
  const generateSeedHandler = () => {
    setGrid((prevGrid) =>
      prevGrid.map((gridRow) => gridRow.map(() => Math.random() >= 0.9))
    );
    stopGameHandler();
    setIterations(0);
  };
  const changeNumberOfIterationsHandler = (
    event: FocusEvent<HTMLInputElement, Element>
  ) => {
    setIterations(0);
    setNumberOfIterations(+event.target.value);
  };

  useEffect(() => {
    if (numberOfIterations > 0 && iterations === numberOfIterations) {
      stopGameHandler();
    }
  }, [iterations, numberOfIterations]);

  useEffect(() => {
    if (isStarted) {
      startGameHandler();
    }
  }, [speed]);

  return (
    <div>
      <div className="form">
        <div className="form-input">
          <Select
            labelText="Size"
            id="size"
            disabled={isStarted}
            options={SIZES}
            onChange={changeSizeHandler}
            value={size}
          />
          <Input
            labelText={`Number of iterations ${
              !numberOfIterations ? "(infinite)" : `(${numberOfIterations})`
            }`}
            disabled={isStarted}
            id="iterations"
            onChange={changeNumberOfIterationsHandler}
            value={numberOfIterations}
          />
          <Select
            labelText="Speed (ms)"
            id="speed"
            options={SPEEDS}
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
      <h2>Iteration: {iterations}</h2>
      <Grid grid={grid} size={size} onSelectBox={selectBoxHandler} />
    </div>
  );
};
