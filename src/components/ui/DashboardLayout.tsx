import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode | ReactNode[]
}

const Dashboard: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="p-4">{children}</div>
    </>
  )
}

export default Dashboard
