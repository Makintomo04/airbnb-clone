import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ListingCard from "../components/listings/ListingCard";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()
  
  if(!currentUser) {
    return(
      <EmptyState
      title="You have to be logged in to view your properties"
      subtitle="Login or register to view your properties"
      />
      )
    }
    const listings = await getListings({
      userId: currentUser.id
    })
    const noListings= listings.length === 0
    
    if(noListings) {
      return(
        <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
        />
        )
      }

  return (
    <PropertiesClient
    listings={listings}
    currentUser={currentUser}
    />
  )
}
export default PropertiesPage