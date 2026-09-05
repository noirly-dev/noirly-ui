import type { ReactNode } from "react";
import { cn } from "../../lib/utils.js";

export interface DataTableColumn<T> {
  /** Stable key, also used for the React key on cells. */
  id: string;
  header: ReactNode;
  /** Cell renderer. Return a string for plain text. */
  cell: (row: T, index: number) => ReactNode;
  /** Right-aligns and tabularises. Use for money, counts, dates. */
  numeric?: boolean;
  /** The identifying column — rendered at full contrast and semibold. */
  primary?: boolean;
  /** Hidden below `md`. Lets a wide table degrade instead of scrolling. */
  hideOnMobile?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  /** Shown in place of the table body when `rows` is empty. */
  empty?: ReactNode;
  onRowClick?: (row: T, index: number) => void;
  caption?: string;
  className?: string;
}

/**
 * Hairline-separated rows, no zebra striping and no vertical grid — see
 * `.data-table` in styles.css.
 *
 * The wrapper scrolls horizontally on its own so a wide table never makes the
 * page scroll sideways, and `hideOnMobile` lets a table shed its secondary
 * columns before it gets there.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty,
  onRowClick,
  caption,
  className,
}: DataTableProps<T>) {
  if (rows.length === 0 && empty) return <>{empty}</>;

  const interactive = Boolean(onRowClick);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="data-table">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  col.numeric && "text-right",
                  col.hideOnMobile && "hidden md:table-cell",
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={rowKey(row, index)}
              onClick={interactive ? () => onRowClick?.(row, index) : undefined}
              className={interactive ? "cursor-pointer" : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.id}
                  data-numeric={col.numeric ? "" : undefined}
                  data-primary={col.primary ? "" : undefined}
                  className={col.hideOnMobile ? "hidden md:table-cell" : undefined}
                >
                  {col.cell(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
