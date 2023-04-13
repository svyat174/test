import React, { useState } from "react";

type FilterOptions = ">" | "<" | "all";

interface MatrixElement {
  value: number;
  color: number[];
}

export default function App() {
  const [filter, setFilter] = useState<FilterOptions>("all");

  function getColors(value: number, max: number, min: number): number[] {
    const percentageMax = (value / max) * 100;
    const percentageMin = (value / min) * 100;
    const red = percentageMin < 50 ? 255 : Math.floor(255 - ((percentageMin - 50) / 50) * 255);
    const green = percentageMax > 50 ? 255 : Math.floor((percentageMax / 50) * 255);
    return [red, green, 0];
  }

  function applyFilter(matrix: MatrixElement[][], filter: FilterOptions): MatrixElement[][] {
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
      row.push({ value, color: [0, 0, 0] }); // Начальный цвет для каждого элемента матрицы
    }
    generatedMatrix.push(row);
  }

  // Находим максимальное и минимальное значение в матрице для расчета цвета
  const flatMatrix = generatedMatrix.flat();
  const max = Math.max(...flatMatrix.map((elem) => elem.value));
  const min = Math.min(...flatMatrix.map((elem) => elem.value));

  const filteredMatrix = applyFilter(generatedMatrix, filter);

  // Обновляем цвет каждого элемента матрицы в зависимости от его значения
  const updatedMatrix = filteredMatrix.map((row) =>
    row.map((elem) => {
      const color = getColors(elem.value, max, min);
      return { ...elem, color };
    })
  );

  return (
    <div className="matrix">
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Color</th>
          </tr>
          <tr>
            <th>
              <button onClick={() => setFilter(">")}>{">"} 0</button>
            </th>
            <th>
              <button onClick={() => setFilter("<")}>{"<"} 0</button>
            </th>
            <th>
              <button onClick={() => setFilter("all")}>All</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {updatedMatrix.map((row, i) => (
            <tr key={i}>
              {row.map((elem, j) => (
                <React.Fragment key={j}>
                  <td>{elem.value}</td>
                  <td style={{ backgroundColor: `rgb(${elem.color.join(",")})` }}></td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
