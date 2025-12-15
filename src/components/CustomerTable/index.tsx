import type { ReactNode } from "react";
import styles from "./CustomerTable.module.scss";

export interface Column<T> {
  label: string;
  render: (row: T) => ReactNode;
}

interface CustomerTableProps<T> {
  columns: Column<T>[];
  customers: T[];
  onRowSelect?: (row: T) => void;
}

export default function CustomerTable<T extends { id: string | number }>({
  columns,
  customers,
  onRowSelect,
}: CustomerTableProps<T>) {
  const hasData = customers.length > 0;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {!hasData ? (
          <tr>
            <td colSpan={columns.length} className={styles.noData}>
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          customers.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowSelect?.(row)}
              style={{ cursor: onRowSelect ? "pointer" : "default" }}
            >
              {columns.map((col, idx) => (
                <td key={idx}>{col.render(row)}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
