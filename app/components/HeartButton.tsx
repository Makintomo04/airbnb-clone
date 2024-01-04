"use client"
import { FC } from 'react'
import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavourite from '../hooks/useFavourite';

interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({listingId,currentUser}) => {
  const {toggleFavourite,hasFavourited} = useFavourite({listingId,currentUser})
  // const toggleFavourite = (e:React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation()
  // }
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer" onClick={toggleFavourite}>
      <AiOutlineHeart 
        size={28}
        className={`
        fill-white
          absolute
          -top-[2px] 
          -right-[2px]
        `}/>
        <AiFillHeart
        size={24}
        className={
         hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }/>
    </div>
  )
}

export default HeartButton