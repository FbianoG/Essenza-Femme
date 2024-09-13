'use client'

import { price } from "@/assets/price"
import { ProductApi } from "@/interfaces/products"
import { useEffect, useRef, useState } from "react"
import Card from "../shared/Card"

const ListProducts = () => {

    const [page, setPage] = useState<number>(1)

    const [products, setProducts] = useState<ProductApi[]>([]) // produtos

    const [category, setCategory] = useState<string>('') // categoria do filtro

    const [filterPrice, setFilterPrice] = useState<number>(1000) // valor do valor para filtro

    const [showCategory, setshowCategory] = useState<boolean>(false) // mostrar ou não a lista de filtro da categoria

    const [productsFiltered, setProductsFiltered] = useState<ProductApi[]>([]) // produtos filtrados ou não

    const [spanPrice, setspanPrice] = useState<number>(1000) // valor do badge de filtro de preço

    const [spanCategory, setSpanCategory] = useState<string>('') // valor do badge de filtro de categoria

    const list = useRef<HTMLDivElement>(null)

    useEffect(() => { // carrega os produtos
        fetch('/json/products.json')
            .then(res => res.json())
            .then(data => { setProducts(data), setProductsFiltered(data) }) // seta os produtos
            .catch(err => console.log({ message: 'Ocorreu algum erro.', err }))
    }, [])

    const handleFilter = () => { // filtra os produtos
        if (!category) { // se a categoria estiver vazia filtra pelo preço
            setProductsFiltered(products?.filter(element => element.price <= filterPrice))
        } else { // se a categoria estiver preenchida filtra pelo preço e categoria
            setProductsFiltered(products?.filter(element => element.category === category && element.price <= filterPrice))
        }
        setspanPrice(filterPrice) // seta o valor do badge de filtro de preço
        setSpanCategory(category) // seta o valor do badge de filtro de categoria
        setPage(1) // seta a pagina para 1
    }

    const nextPage = () => {
        if (page + 1 > Math.ceil(productsFiltered.length / 8)) return
        else setPage(page + 1)
        if (!list.current) return
        list.current.scrollIntoView({ behavior: 'smooth' })
    }

    const prevPage = () => {
        if (page - 1 < 1) return
        else setPage(page - 1)
        if (!list.current) return
        list.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className='px-[5%] mt-10 lg:flex lg:gap-8'>

            <div className="max-w-[400px]">
                <h4>Filtrar por:</h4>

                <div onClick={() => setshowCategory(!showCategory)} className="border-b  relative cursor-pointer px-4 py-2">
                    <span className="text-[--color1] text-xl font-medium ">{category ? category : 'Categoria'}</span>
                    <ul className="bg-[#fff5] backdrop-blur-[15px] absolute z-40 top-[100%] left-0 max-h-0 duration-300 overflow-hidden border w-full border-t-0" style={{ maxHeight: showCategory ? '400px' : '0' }}>
                        <li onClick={() => setCategory('')} className='hover:bg-[#0001] duration-300 p-4'>Todos</li>
                        {products && Array.from(new Set(products.map(product => product.category))).map((category: string) => (
                            <li key={category} onClick={() => setCategory(category)} className='hover:bg-[#0001] duration-300 p-4'>{category}</li>
                        ))}
                    </ul>
                </div>

                <div className="text-xl font-medium p-4 border-b">
                    <span>Valor até: {price(filterPrice)}</span>
                    <div className="flex items-center gap-2 text-[--color1] text-sm mt-2 ">
                        <span>R$ 0,00</span>
                        <input type="range" max={1000} min={0} step={5} defaultValue={filterPrice} onChange={(e) => setFilterPrice(Number(e.target.value))} className="flex-1 bg-[#0001] rounded-[10px] h-[5px] cursor-pointer" />
                        <span>R$ 1.000,00</span>
                    </div>
                </div>

                <button onClick={handleFilter} className="mt-4 text-[--color1] font-semibold hover:opacity-70 border p-4 rounded-[40px]">Aplicar Filtro</button>

            </div>

            <div className="mt-20 lg:mt-0" ref={list}>

                <h2 className="text-3xl text-[--color1] ">Todos os produtos</h2>

                <div className="mt-2 flex gap-2">
                    {category && productsFiltered && <span className="border rounded-[40px] p-2 text-sm text-[--color1]">{spanCategory}</span>}
                    <span className="border rounded-[40px] p-2 text-sm text-[--color1]">Até {price(spanPrice)}</span>
                </div>

                <ul className='flex flex-wrap gap-6 mt-8 justify-center lg:justify-normal'>

                    {productsFiltered.length > 0 && productsFiltered.map((product, index) => index <= (page * 7) && index >= ((page - 1) * 7) && <Card key={product.id} product={product} />)}

                    {productsFiltered.length === 0 && <p className="text-[--color1]">Nenhum resultado encontrado.</p>}

                </ul>

                {productsFiltered && productsFiltered.length > 7 &&
                    <div className="flex flex-col items-center mt-12">
                        <span className="text-sm text-[#555] ">
                            Página <span className="font-semibold text-[--color1] ">{page}</span> de <span className="font-semibold text-[--color1] ">{Math.ceil(productsFiltered.length / 8)}</span>
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0 border border-[#0004] rounded overflow-hidden">
                            <button onClick={prevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white  bg-[--color1] hover:bg-[#fdfdfd] hover:text-[--color1]">Ante</button>
                            <button onClick={nextPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-[--color1] border-0 border-s hover:bg-[#fdfdfd] hover:text-[--color1]">Prox</button>
                        </div>
                    </div>
                }


            </div>





        </div>
    )
}

export default ListProducts