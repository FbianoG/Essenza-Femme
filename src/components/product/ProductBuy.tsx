'use client'
import { price } from "@/assets/price"
import { useMyContext } from "@/context/myProducts"
import { ProductApi } from "@/interfaces/products"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import { MdAddShoppingCart, MdOutlineSell } from "react-icons/md"


const ProductBuy = () => {


   const { state, setState } = useMyContext()
   const [amount, setAmount] = useState<number>(1)
   const [product, setProduct] = useState<ProductApi>()

   const searchParams = useSearchParams()


   const increaseAmount = () => {
      setAmount(prev => prev + 1)
   }

   const decreaseAmount = () => {
      setAmount(prev => prev - 1 <= 0 ? 1 : prev - 1)
   }

   useEffect(() => {
      const ProductId = Number(searchParams.get("id"))
      if (ProductId) fetch('/json/products.json')
         .then(res => res.json())
         .then(data => {
            const prod = data.find((e: ProductApi) => e.id == ProductId)
            if (!prod) throw new Error("Nenhum produto encontrado.")
            setProduct(prod)
         })
         .catch(err => console.log({ message: 'Ocorreu algum erro.', err }))
      setAmount(1)
   }, [searchParams])

   const calculeRating = (rating: number) => {

      return Array.from({ length: 5 }, (_, index) => {
         if (rating < index + 1) return <FaRegStar key={index} />
         else return <FaStar key={index} />
      })

   }


   const addToCart = () => {
      if (!product) return
      if (state.find(e => e.id === product.id)) return
      setState([...state, { ...product, amount }])
   }


   return (

      <div className=" mt-10 flex flex-col px-[5%] md:flex-row gap-x-8 max-w-screen-lg md:mx-auto">

         {product &&
            <>

               <div className=" h-[350px] overflow-hidden rounded-xl md:h-[550px] md:min-w-[400px]">
                  <Image width={1000} height={1000} alt={product.name} src={product.src} className="w-full h-full object-cover " />
               </div>

               <div className="w-full mt-6 md:mt-0 md:flex flex-col">
                  <span className='text-[#555]'>{product.category}</span>
                  <h3 className="text-[#333] text-lg font-semibold">{product.name}</h3>
                  <div className="flex gap-2 items-center my-2">
                     <div className=" flex text-yellow-400">
                        {calculeRating(product.rating)}
                     </div>
                     <span className="text-[#555] text-sm">{product.review} reviews</span>
                  </div>
                  <h4 className="text-[#333] font-semibold mt-4">{price(product.price)}</h4>

                  <div className="flex justify-between items-center gap-4 mt-4 md:justify-start">
                     <span className="text-[#333] font-medium text-sm">Quantidade</span>
                     <div className="w-[100px] border flex rounded-lg overflow-hidden">
                        <button onClick={decreaseAmount} className='w-[30px] border-r font-bold active:bg-[#0001]'>-</button>
                        <span className="w-[40px] text-center text-[#333] cursor-default">{amount}</span>
                        <button onClick={increaseAmount} className='w-[30px] border-l font-bold active:bg-[#0001]'>+</button>
                     </div>
                  </div>

                  <div className="mt-4 text-[#555]">
                     {product.description}
                  </div>

                  <div className="flex justify-center gap-4 mt-8 md:justify-start md:mt-auto ">
                     <button onClick={addToCart} className="flex items-center  p-1 rounded-[40px] group hover:opacity-70 duration-300 border ">
                        <span className="px-4 text-[#333]">Carrinho</span>
                        <span className="bg-slate-100 text-[#333] w-10 h-10 rounded-full grid place-items-center" >
                           <MdAddShoppingCart /></span>
                     </button>
                     <button className="flex items-center bg-neutral-800 p-1 rounded-[40px] group hover:bg-slate-100 duration-300 border ">
                        <span className="px-4 text-neutral-100 group-hover:text-neutral-800 duration-300">Comprar</span>
                        <span className="bg-slate-100 text-neutral-800 w-10 h-10 rounded-full grid place-items-center group-hover:bg-neutral-800 group-hover:text-neutral-100 duration-300" >
                           <MdOutlineSell /></span>
                     </button>
                  </div>

               </div>

            </>
         }

      </div>

   )
}

export default ProductBuy