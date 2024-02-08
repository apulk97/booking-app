import React from 'react'
import Header from '../components/Header'

interface Props {
    children: React.ReactNode
}

function Layout({children}: Props) {
  return (
    <div className="flex flex-col min-h-screen"><Header /></div>
  )
}

export default Layout