
import React,{Suspense, useEffect} from "react"
import Image from 'next/image'
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IListingsParams
}
export default async function  Home({searchParams}:HomeProps) {
  const listings = await getListings(searchParams)
  console.log(searchParams);
  const currentUser = await getCurrentUser()
  const isEmpty = listings.length === 0
  
  if(isEmpty) {
    return(
      <EmptyState showReset/>
      )
    }
    
    
    
    return (
      <Container>
      <div className="
      pt-24
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-6
      gap-8
      ">
        {
          listings.map((listing) => (
            <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            />
            ))}
      </div>
    </Container>
  )
}
