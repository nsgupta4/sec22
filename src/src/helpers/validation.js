const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined 
const minLength = min => value => 
  value && value.length < min ? `Must be ${min} characters or greater` : undefined 
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const REQUIRED = value => value ? undefined : 'Required'
export  const MAX_LENGTH_15 = maxLength(15)
export  const MIN_LENGTH_6 = minLength(6)
export  const NUMBER = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export  const MIN_VALUE_18 = minValue(18)
export  const EMAIL = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
export const PASSWORD_MATCH = (value,allValues) => allValues.password === value ? undefined : 'Password mismatch'