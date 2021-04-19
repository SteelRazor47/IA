import React, { useState, useEffect } from "react"

function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window && window.localStorage.getItem(key)
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export const context = React.createContext({
  isDark: false,
  changeTheme: () => {},
})

const ProviderImpl = props => {
  const [isDark, setTheme] = useStickyState(false, "isDark")

  return (
    <context.Provider
      value={{
        isDark,
        changeTheme: () => setTheme(!isDark),
      }}
    >
      {props.children}
    </context.Provider>
  )
}

export default function Provider({ element }) {return <ProviderImpl>{element}</ProviderImpl>}
