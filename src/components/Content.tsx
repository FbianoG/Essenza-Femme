'use client'

import Card from "./Card"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import { useEffect, useRef, useState } from "react"
import { FaShippingFast } from "react-icons/fa"
import { MdLiveHelp } from "react-icons/md"
import { GiPayMoney } from "react-icons/gi"
import { ProductApi } from "@/interfaces/products"


const Content = () => {

    const listCards = useRef<HTMLDivElement | null>(null);



    const [products, setProducts] = useState<ProductApi[]>()

    const [categorys, setCategorys] = useState<Array<string>>()

    const [categoryFilter, setCategoryFilter] = useState<ProductApi[]>()

    useEffect(() => { getProducts() }, [])

    const getProducts = () => {
        fetch('/json/products.json')
            .then(res => res.json())
            .then(data => {
                setCategorys(Array.from(new Set(data.map((e: ProductApi) => e.category).sort((a: string, b: string) => a.localeCompare(b)))))
                setProducts(data)
            })
            .catch(err => console.log({ message: 'Error ao buscar produtos.', err }))
    }

    const handleFilter = (e: string) => {
        const filter = products?.filter(element => element.category === e)
        setCategoryFilter(filter)
    }

    const handlePrev = () => {
        if (!listCards.current) return
        const target = listCards.current
        if (target.scrollLeft === 0) target.scrollLeft = target.clientWidth - target.scrollLeft
        else target.scrollLeft -= target.clientWidth

    }

    const handleNext = () => {
        if (!listCards.current) return
        const target = listCards.current
        if (target.scrollLeft === target.scrollWidth - target.clientWidth) target.scrollLeft = 0
        else target.scrollLeft += target.clientWidth
    }

    return (
        <div className=' pt-14'>
            <div className=" px-[5%] flex flex-col text-center lg:py-12">
                <span className="">Compre Conosco</span>
                <h2 className="text-2xl font-medium text-neutral-800 mt-4 lg:text-4xl lg:w-[700px] lg:mx-auto">Cuide da sua pela, previna rugas e manchas por efeito do sol com Essenza Femme</h2>
            </div>

            <div className="flex gap-4 px-4 w-full overflow-auto mt-8 pb-4 lg:flex-wrap lg:justify-center lg:px-[10%]  ">
                <button onClick={() => setCategoryFilter(undefined)} className="bg-neutral-100 text-neutral-800 px-4 py-3 min:w-max text-nowrap border rounded-3xl font-medium hover:border-neutral-800 duration-300 ">Todos</button>
                {categorys && categorys.map((element: string, index) => <button key={index} onClick={() => handleFilter(element)} className="bg-neutral-100 text-neutral-800 px-4 py-3 min:w-max text-nowrap border rounded-3xl font-medium hover:border-neutral-800 duration-300 ">{element}</button>)}

            </div>

            <div className="flex gap-6 w-full px-[2%] overflow-auto mt-8 pb-4 lg:pb-6 lg:flex-row lg:overflow-hidden relative" ref={listCards}>

                {!categoryFilter && products && products.map((e, index) => index < 10 && <Card key={e.id} product={e} />)}
                {categoryFilter && categoryFilter.map((e, index) => index < 10 && <Card key={e.id} product={e} />)}

            </div>

            {listCards.current && listCards.current.scrollWidth > listCards.current.clientWidth && (

                <div className="hidden gap-4 justify-center lg:flex">

                    <button onClick={handlePrev} className="bg-neutral-100 border text-neutral-800 w-12 h-12 rounded-full grid place-items-center group-hover:bg-neutral-800 group-hover:text-neutral-100 duration-300">
                        <HiArrowLeft />
                    </button>

                    <button onClick={handleNext} className="bg-neutral-100 border text-neutral-800 w-12 h-12 rounded-full grid place-items-center group-hover:bg-neutral-800 group-hover:text-neutral-100 duration-300">
                        <HiArrowRight />
                    </button>

                </div>)
            }


            <div className="flex flex-col  px-[5%] mt-24 gap-y-6 py-6 border-b border-t border-[#ccc] justify-around md:flex-row ">
                <div className="flex gap-4 items-center text-[#333] ">
                    <FaShippingFast className="text-3xl" />
                    <div className="">
                        <h3 className="font-semibold">Entrega grátis</h3>
                        <span className="text-sm ">Grátis a partir de R$50</span>
                    </div>
                </div>

                <div className="h-[50px] w-[1px] bg-[#0003] hidden md:block "></div>

                <div className="flex gap-4 items-center text-[#333]">
                    <MdLiveHelp className="text-3xl" />
                    <div className="">
                        <h3 className="font-semibold">Suporte 24/7</h3>
                        <span className="text-sm ">Acesso ao ao nosso suporte</span>
                    </div>
                </div>

                <div className="h-[50px] w-[1px] bg-[#0003] hidden md:block "></div>

                <div className="flex gap-4 items-center text-[#333]">
                    <GiPayMoney className="text-3xl" />
                    <div className="">
                        <h3 className="font-semibold">Devolução</h3>
                        <span className="text-sm ">Devolvemos o seu dinheiro</span>
                    </div>
                </div>
            </div>



        </div >
    )
}

export default Content