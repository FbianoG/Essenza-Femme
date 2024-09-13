'use client'
import { price } from "@/assets/price"
import { useMyContext } from "@/context/myProducts"
import Image from "next/image"
import { useState } from "react"
import { FaChevronRight } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"

const SideBar = () => {

    const { state, setState } = useMyContext() // context

    const [showCart, setShowCart] = useState<boolean>(false) // mostrar ou não o carrinho

    const increaseAmount = (id: number) => { // aumenta o amount do item
        const newState = state.map(element => {
            if (element.id === id) {
                return { ...element, amount: element.amount + 1 }
            } else return element
        })
        setState(newState)
    }

    const decreaseAmount = (id: number) => { // diminui o amount do item
        const newState = state.map(element => {
            if (element.id === id) {
                if (element.amount - 1 === 0) return element
                else return { ...element, amount: element.amount - 1 }
            } else return element
        })
        setState(newState)
    }

    const removeIten = (id: number) => { // remove o item do carrinho
        const newState = state.filter(element => element.id !== id)
        setState(newState)
    }

    return (
        <div className='fixed w-[320px] h-[100vh] bg-[#fffc] border-l backdrop-blur-[15px] z-50 top-0 right-0 p-4 pr-1 flex flex-col duration-500 ' style={{ transform: showCart ? 'translate(0)' : 'translate(100%)' }}>

            {/* fechar carrinho */}
            <button aria-label="Fechar Carrinho" title="Fechar Carrinho" onClick={() => setShowCart(false)} className='mb-4'><FaChevronRight className="text-[#555]" /></button>

            {/* mostrar carrinho */}
            <button onClick={() => setShowCart(true)} className='absolute bottom-3 md:bottom-8 left-[-60px] md:left-[-90px] bg-[--color1] text-[--color2] w-[50px] h-[50px] rounded-full grid place-items-center text-2xl shadow-xl' style={{ display: showCart ? 'none' : 'grid' }}>
                <MdOutlineShoppingCart />
                <span className='absolute top-[-5px] right-[-5px] text-xs bg-red-500 w-5 h-5 font-bold rounded-full text-[--color2] grid place-items-center'>{state.length}</span>
            </button>

            <h3 className="text-[--color1] text-xl mb-4">Carrinho</h3>

            {/* lista de produtos */}
            <ul className="flex flex-col gap-4 overflow-auto overflow-x-hidden pr-1 pb-4">

                {state.length > 0 && state.map(e => (

                    <li key={e.id} className="flex  gap-4">

                        {/* imagem do produto */}
                        <div className=" min-w-[100px] w-[100px] h-[110px] overflow-hidden rounded">
                            <Image width={200} height={200} loading='lazy' alt={e.name} src={e.src} className='w-full h-full object-cover' />
                        </div>

                        {/* dados do produto */}
                        <div className="flex flex-col  w-full">
                            <h4 className="text-[--color1] text-sm font-semibold">{e.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-[#555] text-sm">{price(e.price * e.amount)}</p>
                                
                                {/* botão de quantidade */}
                                <div className="w-[90px] border flex rounded-lg overflow-hidden">
                                    <button onClick={() => decreaseAmount(e.id)} className='w-[30px] border-r font-bold active:bg-[#0001]'>-</button>
                                    <span className="w-[30px] text-center text-[--color1] cursor-default text-sm">{e.amount}</span>
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

                <div className="flex justify-between text-[--color1] my-4">

                    <span className="text-sm">Total:</span>

                    <span className="font-medium">{price(state.reduce((acc, e) => acc + e.price * e.amount, 0))}</span>

                </div>
                <button className='bg-[--color1] w-full text-[--color2] p-4 rounded-[40px] font-medium hover:bg-transparent hover:text-[--color1] hover:ring-1 hover:ring-[#0003] duration-300'>Finalizar Compra</button>
            </div>

        </div >
    )
}

export default SideBar