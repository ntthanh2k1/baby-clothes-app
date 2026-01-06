import { create } from "zustand";

type LoadingState = {
  loading: boolean;
  setLoading: (a: boolean) => void;
};

export const useLoading = create<LoadingState>((set) => ({
  loading: false,

  setLoading: (a) => set({ loading: a }),
}));
