import { FC, useState } from 'react';
import { create } from 'zustand';

interface IRentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRentModal = create<IRentModalStore>((set) =>({
  isOpen:false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
 
}));

export default useRentModal;
