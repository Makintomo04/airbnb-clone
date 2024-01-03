"use client"
import { FC, use, useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from '../Avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

interface UserMenuProps {
  currentUser?:SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({currentUser}) => {
  const [isOpen,setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const onRent = useCallback(() => { 
    if(!currentUser){
      return loginModal.onOpen()
    }
    else{
      return rentModal.onOpen()
    }
  },[loginModal.onOpen,currentUser])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="relative">
    <div className="flex flex-row items-center gap-3">
      <div 
        onClick={onRent}
        className="
          hidden
          md:block
          text-sm  
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          duration-75
          cursor-pointer
        "
      >
        Airbnb your home
      </div>
      <div 
      onClick={toggleOpen}
      className="
        p-4
        md:py-1
        md:px-2
        border-[1px] 
        border-neutral-200 
        flex 
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:shadow-md 
        transition
        "
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image || "/images/placeholder.jpg"} />
        </div>
      </div>
    </div>
    {isOpen && (
      <div 
        className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
      >
        <div className="flex flex-col cursor-pointer">
           {currentUser ? <>
              <MenuItem 
                label="My trips" 
                onClick={()=>{}}
              />
              <MenuItem 
                label="My favourites" 
                onClick={()=>{}}
              />
              <MenuItem 
                label="My reservations" 
                onClick={()=>{}}
              />
              <MenuItem 
                label="My properties" 
                onClick={()=>{}}
              />
              <MenuItem 
                label="Airbnb my home" 
                onClick={()=>rentModal.onOpen()}
              />
              <hr/>
              <MenuItem 
                label="Logout" 
                onClick={()=>signOut()}
              />
            </> : <>
              <MenuItem 
                label="Login" 
                onClick={loginModal.onOpen}
              />
              <MenuItem 
                label="Sign up" 
                onClick={registerModal.onOpen}
              />
            </>}
        </div>
      </div>
    )
    }
  </div>
    )
}

export default UserMenu