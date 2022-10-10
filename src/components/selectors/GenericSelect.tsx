import { InputLabel, MenuItem, Select } from '@mui/material'


interface GenericSelectProps {
    label: string
    handleChange: (value: any) => void
    value: number | string
    options: {value: string | number, label: string}[]
    placeholder?: string
}

export default function GenericSelect({label, handleChange, value, options, placeholder}: GenericSelectProps) {
  return (
    <>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Attributes"
            onChange={handleChange}
            placeholder={placeholder}
            fullWidth
        >
            {options.map((obj, index) => {
               return ( <MenuItem key={index} value={obj.value}>{obj.label}</MenuItem> )}
                )}
        </Select>
      </>
  )
}