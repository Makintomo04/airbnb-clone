import getListingsById from '@/app/actions/getListingsById';
import EmptyState from '@/app/components/EmptyState';
import { FC } from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({params}:{params:IParams}) => {
  const listing = await getListingsById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  if(!listing) {
    return <EmptyState/>
  }
  return (
    <div className="">
      <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
      />
    </div>
  )
}

export default ListingPage