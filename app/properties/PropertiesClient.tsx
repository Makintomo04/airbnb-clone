"use client"
import { FC, useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import Heading from '../components/Heading';
import Container from '../components/Container';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({listings=[],currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>("");
  const onCancel =  useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success("Listing Deleted")
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
      <Heading title="Properties"/>
      {/* <div className='text-xl mt-6 font-semibold'>Where you've been</div> */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">

      {listings.map(listing => (
        <ListingCard
        key={listing.id}
        data={listing}
        onAction={onCancel}
        actionLabel="Delete property"
        actionId={listing.id}
        disabled={deletingId === listing.id}
        currentUser={currentUser}
        />
        ))
      }
      </div>

    </Container>
  )
}

export default PropertiesClient