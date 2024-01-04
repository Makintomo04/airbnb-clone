import { FC, useState } from 'react';
import { create } from 'zustand';

interface ISearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchModal = create<ISearchModalStore>((set) =>({
  isOpen:false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
 
}));

export default useSearchModal;
