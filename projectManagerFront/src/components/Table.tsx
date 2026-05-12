import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type TableReusableProps<T> = {
  columns: Column<T>[];
  data: T[];
  selectableRows?: boolean;
  selectedRows?: (row: T) => boolean;
  onRowSelect?: (row: T, checked: boolean) => void;
  caption?: string;
};

export function TableReusable<T extends { id?: string | number }>({
  columns,
  data,
  selectableRows = false,
  selectedRows,
  onRowSelect,
  caption,
}: TableReusableProps<T>) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {selectableRows && <TableHead></TableHead>}
          {columns.map((col) => (
            <TableHead
              key={col.key as string}
              style={col.align ? { textAlign: col.align } : {}}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow
            key={row.id ?? idx}
            data-state={selectedRows?.(row) ? "selected" : undefined}
          >
            {selectableRows && (
              <TableCell>
                <input
                  type="checkbox"
                  checked={!!selectedRows?.(row)}
                  onChange={(e) => onRowSelect?.(row, e.target.checked)}
                  aria-label="Seleccionar fila"
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={col.key as string}
                style={col.align ? { textAlign: col.align } : {}}
              >
                {col.render
                  ? col.render(row)
                  : (row[col.key as keyof T] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default Table;
