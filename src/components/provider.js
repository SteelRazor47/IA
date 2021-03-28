import React, { useState } from "react"

export const context = React.createContext({isDark: false, changeTheme: () => {}})

const ProviderImpl = props => {
  const [isDark, setTheme] = useState(false)

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
