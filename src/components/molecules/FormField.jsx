import React from 'react'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { cn } from '@/utils/cn'

const FormField = ({ 
  label, 
  type = 'text', 
  options = [], 
  error, 
  className, 
  ...props 
}) => {
  const id = props.id || props.name

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
        </Label>
      )}
      {type === 'select' ? (
        <Select id={id} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input id={id} type={type} {...props} />
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormField