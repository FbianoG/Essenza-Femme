import Image from "next/image"
import Link from "next/link"


const Footer = () => {

    return (
        <footer className='mt-52' id="footer">
            
            {/* banner */}
            <div className="flex flex-col  gap-y-8 px-[5%] py-8 lg:flex-row lg:justify-between lg:items-center">
                <h2 className=" text-xl lg:text-3xl lg:w-2/5">Descubra o melhor da mulher em uma seção exclusiva para você</h2>
                <Link href='/products' className='w-max  bg-[--color1] text-[--color2] px-6 py-3 border border-neutral-400 rounded-[40px]'>Quero Ver</Link>
            </div>

            {/* conteudo */}
            <div className="px-[5%] pt-8">

                {/* logo */}
                <div className="flex items-center gap-2  ">
                    <div className="w-12 h-12 bg-[--color1] rounded-full overflow-hidden">
                        <Image height={50} width={50} alt='logo' src='/img/logo.png' />
                    </div>
                    <div className="flex flex-col leading-none">
                        <h3 className="text-[--color1] font-semibold ">Essenza</h3>
                        <span className="pl-4">Femme</span>
                    </div>
                </div>

                {/* links */}
                <div className="lg:flex lg:space-x-20">

                    <div className="flex flex-col text-[--color1] gap-2 mt-8 lg:w-1/2 ">
                        <h4 className="font-semibold text-lg border-b border-neutral-300">Rede Social</h4>
                        <Link className="footerLink" href='https://github.com/FbianoG' target="_blank">GitHub</Link>
                        <Link className="footerLink" href='https://www.instagram.com/fbiano.1/' target="_blank">Instagram</Link>
                        <Link className="footerLink" href='https://www.linkedin.com/in/fbianog/' target="_blank">Linkedin</Link>
                    </div>

                    <div className="flex flex-col text-[--color1] gap-2 mt-8 lg:w-1/2">
                        <h4 className="font-semibold text-lg border-b border-neutral-300">Legal</h4>
                        <Link className="footerLink" href='/'>Política de Privacidade</Link>
                        <Link className="footerLink" href='/'>Licença</Link>
                        <Link className="footerLink" href='/'>Termos & Condições</Link>
                    </div>

                </div>

                {/* copyright */}
                <span className="text-neutral-700 text-center text-sm mt-12 pb-2 block" >© 2024 Essenza Femme™. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}

export default Footer