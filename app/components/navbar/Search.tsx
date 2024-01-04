"use client"
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
interface SearchProps {
  
}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const {getByValue} = useCountries()
  const locationValue = params?.get("locationValue")
  const guestCount = params?.get("guestCount")
  const startDate = params?.get("startDate")
  const endDate = params?.get("endDate")

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if(!startDate || !endDate) return "Any Week"
    const start = new Date(startDate as string)
    const end = new Date(endDate as string)
    let duration = differenceInDays(end,start)
    if(duration === 0){
      duration = 1
    }
    return `${duration} ${duration > 1 ? "days" : "day"}`
   
  },[startDate,endDate])

  const guestLabel = useMemo(() => {
    if(!guestCount) return "Add Guests"
    return `${guestCount} ${parseInt(guestCount) > 1 ? "guests" : "guest"}`
  },[guestCount])

  return <div 
  onClick={searchModal.onOpen}
  className='
  border-[1px]
  w-full
  md:w-auto
  py-2
  rounded-full
  shadow-sm
  hover:shadow-md
  transition
  cursor-pointer
  '>
    <div className="
    flex
    flex-row
    items-center
    justify-between
    ">
      <div className="
            text-sm 
            px-6 
            text-center"
      >{locationLabel}</div>
      <div className="
            hidden 
            sm:block 
            text-sm
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
      >{durationLabel}</div>
      <div className="  text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3"
      >
        <div className="hidden sm:block">{guestLabel}</div>
       <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div></div>
    </div>
  </div>
}

export default Search