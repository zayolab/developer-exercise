import React, { useState, useEffect } from 'react'

const EditRevenueForm = props => {

  useEffect(() => {
    setRevenue(props.currentRevenue)
  }, [props])

  const [revenue, setRevenue] = useState(props.currentRevenue)

  const handleInputChange = event => {
    const { name, value } = event.target

    setRevenue({ ...revenue, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateRevenue(revenue.id, revenue)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={revenue.name} onChange={handleInputChange} />
      <label>One-Time Amount</label>
      <input type="text" name="oneTime" value={revenue.oneTime} onChange={handleInputChange} />
      <label>Monthly Amount</label>
      <input type="text" name="monthly" value={revenue.monthly} onChange={handleInputChange} />
      <button>Update Revenue</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditRevenueForm
