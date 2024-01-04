import useCountries from '@/app/hooks/useCountries';
import { FC } from 'react'
import Select from 'react-select'
import Flag from 'react-world-flags'
import makeAnimated from 'react-select/animated';
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const animatedComponents = makeAnimated();
const CountrySelect: FC<CountrySelectProps> = ({value, onChange}) => {

  const {getAll} = useCountries()

  return (<div>
    <Select
      value={value}
      components={animatedComponents}
      onChange={(value) => onChange(value as CountrySelectValue)}
      options={getAll()}
      // getOptionLabel={(option) => option.label}
      // getOptionValue={(option) => option.value}
      placeholder="Anywhere"
      isClearable
      isSearchable
      formatOptionLabel={(option:any)=>(
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 cover flex justify-center">
          <Flag code={option.value} fallback={ <div>{option.flag}</div> }/>
          </div>
          <div className="">
          {option.label},
          <span className="text-neutral-500 ml-1">
            {option.region}
            </span>
          </div>
          </div>
          )}
          classNames={{
            control: () => "p-3 border-2",
            input: () => "text-lg",
            option: () => "text-lg",
          }}
          theme={(theme)=> ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6',
              primary50: '#ffccd2',
            },
          })}
    />
  </div>)
}

export default CountrySelect