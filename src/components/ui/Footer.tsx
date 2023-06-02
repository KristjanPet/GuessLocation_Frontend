import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className=" bg-primary flex flex-row justify-between p-4">
      <img src="/images/logo.svg" alt="Geotagger" width={123} />
      <p className=" text-white">All Right Reserver | skillupmentor.com</p>
    </footer>
  )
}

export default Footer
