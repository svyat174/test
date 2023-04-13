import { FC } from "react";
import { MatrixElement } from "./App";

interface TableProps {
  filteredMatrix: MatrixElement[][];
}

const Table: FC<TableProps> = ({ filteredMatrix }) => {
  return (
    <div><p
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
        fontSize: 30,
        gap: 1,
      }}  
    >Draw table</p>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          // gap: 6,
          backgroundColor: "black",
          width: "max-content",
          margin: 6,
        }}
      >
        {filteredMatrix?.map((row: MatrixElement[]) => (
          <div>
            {row?.map((el: MatrixElement) =>
              el === null ? (
                <div
                  style={{
                    margin: "5px 3px",
                    width: 45,
                    height: 15,
                    borderRadius: 8,
                    padding: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                  }}
                >
                  <p style={{ color: "white", opacity: 1 }}>{""}</p>
                </div>
              ) : (
                <div
                  style={{
                    margin: "5px 3px",
                    width: 45,
                    height: 15,
                    borderRadius: 8,
                    padding: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      el.value > 0
                        ? `rgba(${el.color[0]}, ${el.color[1]}, ${
                            el.color[2]
                          }, ${el.value / 100})`
                        : `rgba(${el.color[0]}, ${el.color[1]}, ${
                            el.color[2]
                          }, ${(el.value * -1) / 100})`,
                  }}
                >
                  <p style={{ color: "white", opacity: 1 }}>
                    {el.value === null ? "" : el.value}
                  </p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Table;
