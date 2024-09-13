import Image from "next/image"
import Link from "next/link"

const Explore = () => {

    return (
        <div className='bg-[#333]  mt-40 relative h-[450px] lg:h-[600px] grid place-items-center'>

            <Image width={1920} height={1280} loading="lazy" alt="banner" src='/img/10.jpg' className=" absolute top-0 left-0 w-full h-full object-cover brightness-50" />

            <div className="text-center text-[#fdfdfd] relative space-y-4 px-[5%]">
                <span className='text-[#eee]'>Descubra-se</span>
                <h2 className="text-2xl lg:text-4xl ">Explore seus desejos femininos</h2>
                <Link href='/products' className="mainBtn w-[150px] py-4 block mx-auto border-b border-[#fff4] hover:tracking-widest duration-300">Saiba Mais</Link>
            </div>

        </div>
    )
}

export default Explore