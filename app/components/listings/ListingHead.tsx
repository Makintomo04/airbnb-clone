"use client"
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { FC } from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc:string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({id,title,imageSrc,locationValue,currentUser}) => {
  const {getByValue} = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
    <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
      <Image alt="airbnb image" fill src={imageSrc} className='w-full' objectFit='cover' objectPosition='top'/>
      <div className="absolute top-5 right-5">
        <HeartButton listingId={id} currentUser={currentUser!}/>
      </div>
    </div>
    </>
    )
}

export default ListingHead