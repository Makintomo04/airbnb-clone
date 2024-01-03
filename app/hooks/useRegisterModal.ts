import { FC, useState } from 'react';
import { create } from 'zustand';

interface IRegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModal = create<IRegisterModalStore>((set) =>({
  isOpen:false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
 
}));

export default useRegisterModal;
