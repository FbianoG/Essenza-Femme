
import Image from "next/image"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"

const Hero = () => {

    return (
        <div className='lg:flex lg:h-dvh items-center lg:mt-[-70px]'>
            {/* conteudo */}
            <div className="flex flex-col items-center text-center px-[2%] py-20 lg:h-full lg:justify-center lg:py-0 lg:flex lg:w-1/2 ">

                <span className="text-[--color1] font-medium">Essenza Femme</span>

                <h1 className="text-[--color1] text-4xl  font-normal leading-none mt-4 lg:text-6xl">Libere sua beleza com nossa coleção de produtos</h1>

                <Link href='/products' className="flex items-center bg-[--color1] p-1 rounded-[40px] mt-16 group hover:bg-slate-100 duration-300 border ">
                    <span className="px-4 text-[--color2] group-hover:text-[--color1] duration-300">Ir às compras</span>
                    <span className="bg-slate-100 text-[--color1] w-10 h-10 rounded-full grid place-items-center group-hover:bg-[--color1] group-hover:text-[--color2] duration-300" >
                        <HiArrowRight /></span>
                </Link>

            </div>
            
            {/* imagem */}
            <div className="bg-[--color2] h-96 mt-10 lg:w-1/2 lg:h-full lg:mt-0 flex overflow-hidden">
                <Image width={1000} height={1000} alt="" src='/img/0.jpg' className="w-full h-full object-cover"  />
            </div>
        </div>
    )
}

export default Hero