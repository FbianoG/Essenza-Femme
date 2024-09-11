'use client'
import { ProductApi } from "@/interfaces/products"
import { useEffect, useState } from "react"
import Card from "../Card"
import { useSearchParams } from "next/navigation"



const Similar: React.FC = () => {

    const [similar, setSimilar] = useState<ProductApi[] | null>(null)

    const searchParams = useSearchParams()

    useEffect(() => {
        fetch('/json/products.json')
            .then(res => res.json())
            .then(data => {
                const ProductId = Number(searchParams.get("id"))
                const category = data.find((product: ProductApi) => product.id === ProductId).category
                const prodsSimilar: ProductApi[] = data.filter((product: ProductApi) => product.category === category && product.id !== ProductId)
                setSimilar(prodsSimilar.filter((_, index) => index < 10))
            })
            .catch(err => console.log({ message: 'Ocorreu algum erro.', err }))
    }, [searchParams])


    return (


            <div className='px-[5%] lg:px-[10%] mt-40'>

                <h2 className="text-2xl text-[#333] font-semibold mb-10 ">Produtos Similares</h2>

                <ul className='flex gap-6 justify-center flex-wrap lg:justify-between '>

                    {similar && similar.map((product: ProductApi) => <Card key={product.id} product={product} />)}

                </ul>

            </div>
 
    )
}

export default Similar