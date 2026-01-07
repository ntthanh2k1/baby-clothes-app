import React from "react";

export type Column = {
  // lấy key của column để map
  accessor_key?: string;

  // tên header
  header: string;

  // tùy chỉnh trong cell
  cell?: (row: any) => React.ReactNode;
};
