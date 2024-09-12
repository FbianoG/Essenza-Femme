'use client'
import { CommentsApi } from "@/interfaces/comments"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"




const Comments = () => {

    const [comments, setComments] = useState<CommentsApi[]>()

    useEffect(() => {
        getComments()
    }, [])

    const getComments = () => {
        fetch('/json/comments.json')
            .then(res => res.json())
            .then(data => setComments(data))

            .catch(err => console.log({ message: 'Ocorreu algum erro', err }))
    }


    return (
        <div className=' px-[5%] mt-40'>
            <div className="flex flex-col justify-center w-max text-[#333] mx-auto text-center">
                <p className="font-light">O que dizem</p>
                <h3 className='text-3xl lg:text-5xl'>Nossos Clientes</h3>
            </div>

            <ul className="flex gap-6 mt-20 pb-4 overflow-auto lg:flex-wrap lg:justify-evenly">
                {comments && comments.map(e => (
                    <div key={e.id} className=" border rounded-xl min-w-[280px] w-[280px] h-auto p-4  flex lg:w-[400px] ">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <div className="text-yellow-400 flex">
                                    <span><FaStar /></span>
                                    <span><FaStar /></span>
                                    <span><FaStar /></span>
                                    <span><FaStar /></span>
                                    <span><FaStar /></span>
                                </div>
                                <span>{e.rating.toFixed(1)}</span>
                            </div>
                            <p className="text-[#555] text-sm mt-2 mb-2">{e.comment}</p>
                            <div className="flex gap-4 items-center mt-auto">
                                <Image width={50} height={50} alt={'Foto de perfil ' + e.name} src={e.src} loading="lazy" className="w-[50px] h-[50px] rounded-full object-cover lg:hidden" />
                                <h5 className='font-semibold text-[#333]'>{e.name}</h5>
                            </div>
                        </div>
                        <Image width={150} height={200} alt={'Foto de perfil ' + e.name} src={e.src} className=" hidden w-[150px] h-[200px] rounded-xl object-cover lg:block" />
                    </div>
                ))}

            </ul>
        </div>
    )
}

export default Comments