"use client"
import { price } from "@/assets/price"
import { ProductApi } from "@/interfaces/products"
import { useState } from "react"
import { FiMinus } from "react-icons/fi"
import { IoChevronDown } from "react-icons/io5"

interface Props {
    products: ProductApi[] // produtos
    setCategory: React.Dispatch<string> // setar a categoria do filtro
    category: string // categoria do filtro
    setFilterPrice: React.Dispatch<number> // setar o preço do filtro
    filterPrice: number // preço do filtro
    handleFilter: () => void // aplicar filtro nos produtos
}

const Filter: React.FC<Props> = ({ products, setCategory, category, setFilterPrice, filterPrice, handleFilter }) => {

    const [showCategory, setshowCategory] = useState<boolean>(false) // mostrar ou não a lista de filtro da categoria

    return (
        <div className="max-w-[400px]">

            <h4>Filtrar por:</h4>

            {/* categorias */}
            <div onClick={() => setshowCategory(!showCategory)} className="border-b  relative cursor-pointer px-4 py-2 flex justify-between items-center">
                <span className="text-[--color1] text-xl font-medium ">
                    {category ? category : 'Todos'}
                </span>
                <span className="text-[--color1]">
                    {showCategory ? <FiMinus /> : <IoChevronDown />}
                </span>
                <ul className="bg-[#fff5] backdrop-blur-[15px] absolute z-40 top-[100%] left-0 max-h-0 duration-300 overflow-hidden border w-full border-t-0" style={{ maxHeight: showCategory ? '400px' : '0' }}>
                    <li onClick={() => setCategory('')} className='hover:bg-[#0001] duration-300 p-4'>Todos</li>
                    {products && Array.from(new Set(products.map(product => product.category))).map((category: string) => (
                        <li key={category} onClick={() => setCategory(category)} className='hover:bg-[#0001] duration-300 p-4'>{category}</li>
                    ))}
                </ul>
            </div>

            {/* preço */}
            <div className="text-xl font-medium p-4 border-b">
                <span>Valor até: {price(filterPrice)}</span>

                {/* slider de preço */}
                <div className="flex items-center gap-2 text-[--color1] text-sm mt-2 ">
                    <span>R$ 0,00</span>
                    <input type="range" max={1000} min={0} step={5} defaultValue={1000} onChange={(e) => setFilterPrice(Number(e.target.value))} className="flex-1 bg-[#0001] rounded-[10px] h-[5px] cursor-pointer" />
                    <span>R$ 1.000,00</span>
                </div>
            </div>

            {/* botão de aplicar filtro */}
            <button onClick={handleFilter} className="mt-4 text-[--color1] font-semibold hover:opacity-70 border p-4 rounded-[40px]">Aplicar Filtro</button>

        </div>
    )
}

export default Filter