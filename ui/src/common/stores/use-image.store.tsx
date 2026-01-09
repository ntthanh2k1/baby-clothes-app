import { create } from "zustand";

type ImageState = {
  image: string | null;

  setPreviewImage: (image: string) => void;
};

export const useImageStore = create<ImageState>((set) => ({
  image: null,

  setPreviewImage: (image: string) => {
    set({ image });
  },
}));
