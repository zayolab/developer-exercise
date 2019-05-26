import { shape, string, number } from "prop-types"

export const transactionProp = shape({
  id: number.isRequired,
  name: string.isRequired,
  one_time: string.isRequired,
  monthly: string.isRequired
})
