'use client'
import { price } from "@/assets/price"
import { useMyContext } from "@/context/myProducts"
import { ProductApi } from "@/interfaces/products"
import Image from "next/image"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"
import { MdAddShoppingCart } from "react-icons/md"

interface CardProps {
    product: ProductApi // produto
}

const Card: React.FC<CardProps> = ({ product }) => {

    const { state, setState } = useMyContext()

    const addToCart = () => { // adicionar ao carrinho
        if (!product) return
        if (state.find(e => e.id === product.id)) return
        setState([...state, { ...product, amount: 1 }])
    }

    return (
        <div className="min-w-[320px] w-[320px] group">

            {/* conteúdo */}
            <div className=" overflow-hidden rounded-3xl relative h-[400px] p-4 flex ">

                <Image width={900} height={700} loading="lazy" alt={product.name} src={product.src} className="absolute left-0 top-0 w-full h-full object-cover -z-10 group-hover:scale-105 duration-500" />
                
                {/* botão carrinho */}
                <button aria-label="Adicionar ao carrinho" title="Adicionar ao carrinho" onClick={addToCart} className='absolute top-3 right-3 w-[50px] h-[50px] rounded-full grid 
                place-items-center bg-[--color1] text-[--color2] text-xl hover:bg-[--color2] hover:text-[--color1] duration-300'><MdAddShoppingCart /></button>

                {/* botão comprar e preco */}
                <div className=" w-full flex justify-between gap-4 items-center mt-auto">

                    <Link href={`/product?id=${product.id}`} className=" flex-1 flex items-center justify-between bg-[#0003] backdrop-blur-md p-1 rounded-[40px] group hover:opacity-60 duration-300  ">
                        <span className="px-4 text-neutral-100 ">Comprar</span>
                        <span className="bg-slate-100 text-neutral-800 w-10 h-10 rounded-full grid place-items-center " ><HiArrowRight /></span>
                    </Link>

                    <span className="block bg-neutral-900 text-neutral-100 text-sm px-6 py-3 rounded-[40px]">{price(product.price)}</span>
                </div>
            </div>

            {/* descrição */}
            <div className="bg-neutral-100 p-3 rounded-3xl mt-2 ">
                <h4 className='font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{product.name}</h4>
                <span className="text-sm">{product.category}</span>
            </div>

        </div >
    )
}

export default Card

