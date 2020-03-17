import React from 'react'
import Navigation from './Navigation'

const Page = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Page
