import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className=" bg-primary flex flex-row justify-between p-4">
      <img
        src="/images/logo.svg"
        alt="Geotagger"
        width={123}
        className=" hidden md:block"
      />
      <img
        src="/images/footerLogo.svg"
        alt="Geotagger"
        width={19}
        className="md:hidden mx-4 order-first"
      />
      <p className=" text-white">All Right Reserver | skillupmentor.com</p>
    </footer>
  )
}

export default Footer
