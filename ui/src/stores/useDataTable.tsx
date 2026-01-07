import { create } from "zustand";

type DataTableState = {
  limit: number;

  setLimit: (limit: number) => void;
};

export const useDataTable = create<DataTableState>((set) => ({
  limit: 10,

  setLimit: (limit: number) => {
    set({ limit });
  },
}));
