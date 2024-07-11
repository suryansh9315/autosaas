'use client'
import React from 'react'

const initialValues = {
  credits: '',
  setCredits: () => undefined,
  tier: '',
  setTier: () => undefined,
}

const context = React.createContext(initialValues)
const { Provider } = context

export const BillingProvider = ({ children }) => {
  const [credits, setCredits] = React.useState(initialValues.credits)
  const [tier, setTier] = React.useState(initialValues.tier)

  const values = {
    credits,
    setCredits,
    tier,
    setTier,
  }

  return <Provider value={values}>{children}</Provider>
}

export const useBilling = () => {
  const state = React.useContext(context)
  return state
}