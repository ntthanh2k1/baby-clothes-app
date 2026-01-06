import React from "react";

export type Column<T> = {
  header: string;

  accessor_key?: keyof T;

  cell?: (row: T) => React.ReactNode;
};
