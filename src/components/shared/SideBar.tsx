'use client'

import { price } from "@/assets/price"
import { useMyContext } from "@/context/myProducts"
import Image from "next/image"
import { useState } from "react"
import { FaChevronRight } from "react-icons/fa"
import { MdAddShoppingCart } from "react-icons/md"

const SideBar = () => {


    const { state, setState } = useMyContext()



    const increaseAmount = (id: number) => {
        const newState = state.map(element => {
            if (element.id === id) {
                return { ...element, amount: element.amount + 1 }
            } else return element
        })
        setState(newState)
    }


    const decreaseAmount = (id: number) => {
        const newState = state.map(element => {
            if (element.id === id) {
                if (element.amount - 1 === 0) return element
                else return { ...element, amount: element.amount - 1 }
            } else return element
        })
        setState(newState)
    }



    const removeIten = (id: number) => {
        const newState = state.filter(element => element.id !== id)
        setState(newState)
    }

    const [showCart, setShowCart] = useState<boolean>(true)


    return (
        <div className='fixed w-[320px] h-[100vh] bg-[#fffc] border-l backdrop-blur-[15px] z-50 top-0 right-0 p-4 pr-1 flex flex-col duration-500 ' style={{ transform: showCart ? 'translate(0)' : 'translate(100%)' }}>


            <button onClick={() => setShowCart(false)} className='text-[#333] mb-4'><FaChevronRight/></button>
            <button onClick={() => setShowCart(true)} className='absolute bottom-8 left-[-70px] md:left-[-90px] bg-[#333] text-[#fdfdfd] w-[50px] h-[50px] rounded-full grid place-items-center text-2xl' style={{ display: showCart ? 'none' : 'grid' }}> <MdAddShoppingCart /></button>

            <h3 className="text-[#333] text-xl mb-4">Carrinho</h3>

            <ul className="flex flex-col gap-2 overflow-auto overflow-x-hidden pr-1">

                {state.length > 0 && state.map(e => (

                    <li key={e.id} className="flex  gap-1">

                        <div className=" min-w-[100px] w-[100px] h-[100px] overflow-hidden rounded">
                            <Image width={200} height={200} loading='lazy' alt={e.name} src={e.src} className='w-full h-full object-cover' />
                        </div>

                        <div className="flex flex-col  w-full">

                            <h4 className="text-[#333] text-sm font-semibold">{e.name}</h4>

                            <div className="flex justify-between items-center">

                                <p className="text-[#555] text-sm">{price(e.price * e.amount)}</p>
                                <div className="w-[90px] border flex rounded-lg overflow-hidden">
                                    <button onClick={() => decreaseAmount(e.id)} className='w-[30px] border-r font-bold active:bg-[#0001]'>-</button>
                                    <span className="w-[30px] text-center text-[#333] cursor-default text-sm">{e.amount}</span>
                                    <button onClick={() => increaseAmount(e.id)} className='w-[30px] border-l font-bold active:bg-[#0001]'>+</button>
                                </div>

                            </div>

                            <button onClick={() => removeIten(e.id)} className='text-red-400 text-sm mt-auto ml-auto hover:opacity-70 duration-300 w-max'>Remover</button>

                        </div>
                    </li>
                ))}

                {state.length === 0 && <p className="text-[#555] text-sm">Seu carrinho está vazio.</p>}

            </ul>


            <div className="mt-auto border-t">
                <div className="flex justify-between text-[#333] my-4">
                    <span className="text-sm">Total:</span>
                    <span className="font-medium">{price(state.reduce((acc, e) => acc + e.price * e.amount, 0))}</span>
                </div>
                <button className='bg-[#333] w-full text-[#fdfdfd] p-4 rounded-[40px] font-medium hover:bg-transparent hover:text-[#333] hover:ring-1 hover:ring-[#0003] duration-300'>Finalizar Compra</button>
            </div>

        </div >
    )
}

export default SideBar