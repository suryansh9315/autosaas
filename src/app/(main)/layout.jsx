import React from 'react'
import Sidebar from '@/components/Sidebar'
import InfoBar from '@/components/Infobar'

const Layout = (props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout