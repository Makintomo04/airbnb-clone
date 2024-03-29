"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from "query-string"
interface CategoryBoxProps {
  icon:IconType;
  label:string;
  selected?:boolean;
  description?:string;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  icon:Icon,label,selected
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}
    if(params){
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery:any = {
      ...currentQuery,
      category: label
    }

    if(params?.get('category') === label){
      delete updatedQuery.category
    }
    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery
    },{skipNull:true})

    router.push(url)
  },
  [params,router,label])
  


  return (<div
  onClick={handleClick}
  className={`
  ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
  flex
  flex-col
  items-center
  justify-center
  gap-2 p-3 border-b-2 hover:border-neutral-200 hover:text-neutral-800 cursor-pointer`}>
    <Icon size={26}/>
    <div className="font-medium text-sm">
    {label}
    </div>
  </div>)
}

export default CategoryBox