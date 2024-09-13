'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IoCloseOutline, IoMenu } from 'react-icons/io5'

const Header = () => {
  const [menu, setMenu] = useState<boolean>(false)

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header className="lg:fix relative z-50 flex h-[70px] items-center justify-between gap-2 px-[5%] lg:top-0">
      <Link href='/' className="flex items-center gap-2">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-neutral-800">
          <Image height={50} width={50} alt="logo" src="/img/logo.png" />
        </div>
        <div className="flex flex-col leading-none">
          <h3 className="font-semibold text-neutral-800">Essenza</h3>
          <span className="pl-4">Femme</span>
        </div>
      </Link>

      <button
        onClick={handleMenu}
        className="grid h-10 w-10 place-items-center rounded-full border text-2xl text-neutral-800 duration-300 hover:bg-neutral-700 hover:text-neutral-100 lg:bg-neutral-100"
      >
        {menu && <IoCloseOutline />}
        {!menu && <IoMenu />}
      </button>

      <nav
        className={`absolute left-0 top-0 -z-10 flex h-0 w-full justify-center gap-8 overflow-hidden bg-[#fff9] backdrop-blur-md duration-300 ${menu && 'h-[130px] border-b pb-4 pt-[90px]'} `}
      >
        <Link
          href="/"
          className="relative font-medium tracking-widest text-neutral-800 duration-300 hover:opacity-50"
        >
          Home
        </Link>
        <Link
          href="products"
          className="relative font-medium tracking-widest text-neutral-800 duration-300 hover:opacity-50"
        >
          Produtos
        </Link>
        <Link
          href=""
          className="relative font-medium tracking-widest text-neutral-800 duration-300 hover:opacity-50"
        >
          Contato
        </Link>
      </nav>
    </header>
  )
}

export default Header
