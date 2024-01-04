"use client"
import { FC, useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Heading from '../components/Heading';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: FC<TripsClientProps> = ({reservations,currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>("");
  const onCancel =  useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success("Reservation cancelled")
      router.refresh()
    })
    .catch(() => {
      toast.error("Something went wrong")
    })
    .finally(() => {
      setDeletingId("")
    })
  },[router])
  return (
    <Container >
      <Heading title="Trips"/>
      {/* <div className='text-xl mt-6 font-semibold'>Where you've been</div> */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">

      {reservations.map(reservation => (
        <ListingCard
        key={reservation.id}
        data={reservation.listing}
        reservation={reservation}
        onAction={onCancel}
        actionLabel="Cancel Reservation"
        actionId={reservation.id}
        disabled={deletingId === reservation.id}
        currentUser={currentUser}
        />
        ))
      }
      </div>

    </Container>
  )
}

export default TripsClient