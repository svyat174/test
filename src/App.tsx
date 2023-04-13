import { useEffect, useState } from "react";
import Table from "./Table";

type FilterOptions = ">" | "<" | "all";

export interface MatrixElement {
  value: number;
  color: number[];
}

export default function App(): JSX.Element {
  const [filter, setFilter] = useState<FilterOptions>("all");
  const [matrix, setMatrix] = useState<MatrixElement[][]>([]);
  const [filteredByClickMatrix, setFilteredByClickMatrix] = useState<MatrixElement[][]>([]);

  function getColors(value: number): number[] {
    if (value > 0) {
      return [65, 188, 156];
    } else if (value < 0) {
      return [191, 11, 27];
    } else {
      return [21, 24, 32];
    }
  }

  function applyFilter(
    matrix: MatrixElement[][],
    filter: FilterOptions
  ): MatrixElement[][] {
    switch (filter) {
      case ">":
        return matrix.map((row) => row.filter((elem) => elem.value > 0));
      case "<":
        return matrix.map((row) => row.filter((elem) => elem.value < 0));
      default:
        return matrix;
    }
  }

  const generatedMatrix: MatrixElement[][] = [];
  for (let i = 0; i < 13; i++) {
    const row: MatrixElement[] = [];
    for (let j = 0; j < 13; j++) {
      let value: number;
      do {
        value = Math.floor(Math.random() * 201) - 100;
        //eslint-disable-next-line
      } while (row.some((elem) => elem.value === value));
      row.push({ value, color: [0, 0, 0] });
    }
    generatedMatrix.push(row);
  }

  const filteredMatrix = applyFilter(generatedMatrix, filter);

  const generateFinalMatrix = (matrix: MatrixElement[][]) => {
    const res = matrix.map((row: MatrixElement[]) =>
      row.map((elem: MatrixElement) => {
        const color = getColors(elem.value);
        return { ...elem, color };
      })
    );
    return res;
  };

  useEffect(() => {
    const newMatrix = generateFinalMatrix(filteredMatrix);
    setMatrix(newMatrix);
    //eslint-disable-next-line
  }, []);

  const filterGreater = () => {
    const greaterMatrix: MatrixElement[][] | null = [
      ...matrix.map((row: MatrixElement[]) =>
        row.map((el: any) => (el.value > 0 ? el : null))
      ),
    ];

    setFilteredByClickMatrix(greaterMatrix);
    setFilter(">");
  };

  const filterLess = () => {
    const greaterMatrix: MatrixElement[][] = [
      ...matrix.map((row: MatrixElement[]) =>
        row.map((el: any) => (el.value < 0 ? el : null))
      ),
    ];

    setFilteredByClickMatrix(greaterMatrix);
    setFilter(">");
  };

  const filterAll = () => {
    setFilter("all");
  };

  console.log(filteredByClickMatrix, "filteredByClickMatrix");
  return (
    <div className="matrix">
      <Table
        filteredMatrix={filter === "all" ? matrix : filteredByClickMatrix}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          onClick={() => filterGreater()}
          style={{
            border: "1px solid black",
            padding: "2px 10px",
            borderRadius: 5,
            boxShadow: "-1px 19px 13px -11px rgba(34, 60, 80, 0.26)",
            width: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(65, 188, 156)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "white" }}>Filter {">"} 0</span>
        </div>
        <div
          onClick={() => filterAll()}
          style={{
            border: "1px solid black",
            padding: "2px 10px",
            borderRadius: 5,
            boxShadow: "-1px 19px 13px -11px rgba(34, 60, 80, 0.26)",
            width: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(21, 24, 32)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "white" }}>All</span>
        </div>
        <div
          onClick={() => filterLess()}
          style={{
            border: "1px solid black",
            padding: "2px 10px",
            borderRadius: 5,
            boxShadow: "-1px 19px 13px -11px rgba(34, 60, 80, 0.26)",
            width: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(191, 11, 27)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "white" }}>Filter {"<"} 0</span>
        </div>
      </div>
    </div>
  );
}
