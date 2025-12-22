import type { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./CustomerTable.module.scss";

export interface Column<T> {
  label: string;
  render: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
}

interface CustomerTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowSelect?: (row: T) => void;
}

const cx = classNames.bind(styles);

export default function CustomerTable<T extends { id: string | number }>({
  columns,
  data = [],
  onRowSelect,
}: CustomerTableProps<T>) {
  const hasData = data.length > 0;

  return (
    <table className={cx("table")}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} style={{ textAlign: col.align || "left" }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {!hasData ? (
          <tr>
            <td colSpan={columns.length} className={cx("no-data")}>
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowSelect?.(row)}
              className={cx({
                row: !!onRowSelect,
              })}
            >
              {columns.map((col, idx) => {
                const val = col.render(row);
                return (
                  <td
                    key={idx}
                    style={{ textAlign: col.align || "left" }}
                    data-label={col.label}
                  >
                    {val === null || val === undefined || val === ""
                      ? "---"
                      : val}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
