import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ListingCard from "../components/listings/ListingCard";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  
  if(!currentUser) {
    return(
      <EmptyState
      title="You have to be logged in to view your trips"
      subtitle="Login or register to view your trips"
      />
      )
    }
    const reservations = await getReservations({
      userId: currentUser.id
    })
    const noReservations = reservations.length === 0
    
    if(noReservations) {
      return(
        <EmptyState
        title="You have no trips planned"
        subtitle="You can book a trip by clicking on the listings"
        />
        )
      }

  return (
    <TripsClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}
export default TripsPage