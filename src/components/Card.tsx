import { price } from "@/assets/price"
import Image from "next/image"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"

interface CardProps {
    product: ProductApi
}

const Card: React.FC<CardProps> = ({ product }) => {

    return (
        <div className="min-w-[320px] group">
            <div className=" overflow-hidden rounded-3xl relative h-[400px] p-4 flex ">
                <Image width={900} height={700} loading="lazy" alt={product.name} src={product.src} className="absolute left-0 top-0 w-full h-full object-cover -z-10 group-hover:scale-105 duration-500" />

                <div className=" w-full flex justify-between gap-4 items-center mt-auto">

                    <Link href={`/product?id=${product.id}`} className=" flex-1 flex items-center justify-between bg-[#0003] backdrop-blur-md p-1 rounded-[40px] group hover:opacity-60 duration-300  ">
                        <span className="px-4 text-neutral-100 ">Comprar</span>
                        <span className="bg-slate-100 text-neutral-800 w-10 h-10 rounded-full grid place-items-center " ><HiArrowRight /></span>
                    </Link>

                    <span className="block bg-neutral-900 text-neutral-100 text-sm px-6 py-3 rounded-[40px]">{price(product.price)}</span>
                </div>
            </div>

            <div className="bg-neutral-100 p-3 rounded-3xl mt-2 ">
                <h4 className='font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{product.name}</h4>
                <span className="text-sm">{product.category}</span>
            </div>

        </div >
    )
}

export default Card