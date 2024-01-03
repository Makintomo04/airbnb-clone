"use client"
import React,{Suspense} from "react"
import Image from 'next/image'
import dynamic from 'next/dynamic'
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false});

export default function Home() {
  return (
    <div className="h-screen w-full  pt-20 ">
     
    </div>
  )
}
