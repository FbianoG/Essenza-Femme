'use client'

import { price } from "@/assets/price"
import { ProductApi } from "@/interfaces/products"
import { useEffect, useRef, useState } from "react"
import Card from "../shared/Card"
import Filter from "./Filter"

const ListProducts = () => {

    const [page, setPage] = useState<number>(1)

    const [products, setProducts] = useState<ProductApi[]>([]) // produtos

    const [category, setCategory] = useState<string>('') // categoria do filtro

    const [filterPrice, setFilterPrice] = useState<number>(1000) // valor do valor para filtro

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
        if (!category) {
            setProductsFiltered(products?.filter(element => element.price <= filterPrice))
        } else {
            setProductsFiltered(products?.filter(element => element.category === category && element.price <= filterPrice))
        }
        setspanPrice(filterPrice) // seta o valor do badge de filtro de preço
        setSpanCategory(category) // seta o valor do badge de filtro de categoria
        setPage(1) // seta a pagina para 1
    }

    const nextPage = () => { // paginação
        if (page + 1 > Math.ceil(productsFiltered.length / 8)) return
        else setPage(page + 1)
        if (!list.current) return
        list.current.scrollIntoView({ behavior: 'smooth' })
    }

    const prevPage = () => { // paginação
        if (page - 1 < 1) return
        else setPage(page - 1)
        if (!list.current) return
        list.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        // 
        <div className='px-[5%] mt-10 lg:flex lg:gap-8'>

            {/* Filtros */}
            <Filter products={products} setCategory={setCategory} category={category} setFilterPrice={setFilterPrice} filterPrice={filterPrice} handleFilter={handleFilter} />

            {/* container de produtos */}
            <div className="mt-20 lg:mt-0" ref={list}>
                <h2 className="text-3xl text-[--color1] ">Todos os produtos</h2>

                {/* badges de filtros */}
                <div className="mt-2 flex gap-2">
                    {spanCategory && productsFiltered && <span className="border rounded-[40px] p-2 text-sm text-[--color1]">{spanCategory}</span>}
                    <span className="border rounded-[40px] p-2 text-sm text-[--color1]">Até {price(spanPrice)}</span>
                </div>

                {/* lista de produtos  */}
                <ul className='flex flex-wrap gap-6 mt-8 justify-center lg:justify-normal'>
                    {productsFiltered.length > 0 && productsFiltered.map((product, index) => index <= (page * 7) && index >= ((page - 1) * 7) && <Card key={product.id} product={product} />)}
                    {productsFiltered.length === 0 && <p className="text-[--color1]">Nenhum resultado encontrado.</p>}
                </ul>

                {/* paginação */}
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