"use client"
import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react'
import HeartButton from '../HeartButton';
import Button from '../Button';


interface ListingCardProps {
  data:SafeListing;
  reservation?: SafeReservation
  onAction?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({data,reservation,onAction,disabled,actionId = "",actionLabel,currentUser}) => {
  const router = useRouter();
  const {getByValue} = useCountries();
  const location = getByValue(data?.locationValue);

  const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(disabled) return
    onAction?.(actionId)
  },[onAction,actionId,disabled])

  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice
    }
    return data?.price
  },[reservation,data?.price])


  const reservationDate = useMemo(() => {
    if(!reservation){
     return null
    }
    const start = new Date(reservation?.startDate)
    const end = new Date(reservation?.endDate)
    return `${format(start,'PP')} - ${format(end,'PP')}`

  }
  ,[reservation])

  return (
    <div className="group col-span-1 cursor-pointer" onClick={()=>window.open(`/listings/${data.id}`,"_blank")}>
      <div className="flex flex-col gap-2 w-full">
      <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
        <Image
         fill
         className="
           object-cover 
           h-full 
           w-full 
           group-hover:scale-110 
           transition
         "
         src={data.imageSrc}
         alt="Listing"
        />
        <div className="absolute top-3 right-3">
          <HeartButton
          listingId={data.id}
          currentUser={currentUser as SafeUser}
          />
        </div>
        </div>
        <div className="font-semibold text-md">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            £ {price}
          </div>
          {!reservation && (
            <div className="font-light">
              / night
              </div>
              )}
        </div>
        {onAction && actionLabel && (
          <Button
          small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
            // className="w-full"
          />
          )}
      </div>
    </div>
  )
}

export default ListingCard