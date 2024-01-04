import { FC } from 'react'
import EmptyState from '../components/EmptyState'
import getFavoriteListings from '../actions/getFavouriteListings'
import getCurrentUser from '../actions/getCurrentUser'
import FavouritesClient from './FavouritesClient'

interface FavouritesPageProps {
  
}

const FavouritesPage: FC<FavouritesPageProps> = async ({}) => {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()
  if(!currentUser) {
    return (
      <EmptyState
      title="You have to be logged in to view your favourites"
      subtitle="Login or register to view your favourites"
      />
    )
  }
  if(listings.length === 0){
  return (
    <EmptyState
    title="No favourites found"
    subtitle='Looks like you have no favourite listings.'
    />
  )}
  return (
    <FavouritesClient
    listings={listings}
    currentUser={currentUser}
    />
  )
}

export default FavouritesPage