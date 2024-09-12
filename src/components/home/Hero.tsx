
import Image from "next/image"
import { HiArrowRight } from "react-icons/hi"

const Hero = () => {

    return (
        <div className='lg:flex lg:h-dvh items-center lg:mt-[-70px]'>
            <div className="flex flex-col items-center text-center px-[2%] py-20 lg:h-full lg:justify-center lg:py-0 lg:flex lg:w-1/2 ">

                <span className="text-neutral-800  font-medium">Essenza Femme</span>

                <h1 className="text-neutral-800 text-4xl  font-normal leading-none mt-4 lg:text-6xl">Libere sua beleza com nossa coleção de produtos</h1>



                <button className="flex items-center bg-neutral-800 p-1 rounded-[40px] mt-16 group hover:bg-slate-100 duration-300 border ">
                    <span className="px-4 text-neutral-100 group-hover:text-neutral-800 duration-300">Ir às compras</span>
                    <span className="bg-slate-100 text-neutral-800 w-10 h-10 rounded-full grid place-items-center group-hover:bg-neutral-800 group-hover:text-neutral-100 duration-300" >
                        <HiArrowRight /></span>
                </button>

            </div>

            <div className="bg-neutral-100 h-96 mt-10 lg:w-1/2 lg:h-full lg:mt-0 flex overflow-hidden">
                <Image width={1000} height={1000} alt="" src='/img/2.jpg' className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default Hero