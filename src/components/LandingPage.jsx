import { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import 'animate.css';
import 'remixicon/fonts/remixicon.css'
const LandingPage = () => {
    const navigate = useNavigate()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [loader, setLoader] = useState(false)

    const navigateAi = () => {
        try {
            setTimeout(() => {
                setLoader(true)
                navigate('/ai')
            }, 300)
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoader(false)
        }

    }

    return (
        <div className="w-full h-screen bg text-white flex flex-col gap-20 md:gap-0 justify-center items-center p-8">

            {/* desktop */}
            <div className="w-full hidden md:block">
                <nav className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2 animate__animated animate__jackInTheBox">
                        <img src="/aiimage.png"
                            className="w-15 h-15 object-cover"
                        />
                        <h1 className="md:text-2xl text-sm font-semibold text-nowrap">AI Text To Speech</h1>
                    </div>

                    <ul className="flex gap-5 animate__jackInTheBox animate__animated">
                       
                        <li>
                            <NavLink
                                className={'px-4 py-2 bg-black/20 rounded-full opacity-80 hover:opacity-100 cursor-pointer'}
                                to='/ai'>
                                Chat Bot
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>


            {/* mobile */}
            <div className="w-full md:hidden">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center gap-2 ">
                        <img src="/aiimage.png"
                            className="w-15 h-15 object-cover"
                        />
                        <h1 className="md:text-2xl text-sm font-semibold text-nowrap">AI Text To Speech</h1>
                    </div>

                    <div>
                        {
                            isOpenMenu ?
                                <i
                                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                                    title="Close Menu"
                                    className="ri-close-large-line text-2xl opacity-80 hover:opacity-100 cursor-pointer"></i>
                                :
                                <i
                                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                                    title="Open Menu"
                                    className="ri-menu-line text-2xl opacity-80 hover:opacity-100 cursor-pointer"></i>
                        }
                    </div>


                    {/* condition for menu icons */}
                    {
                        isOpenMenu &&
                        <div className="absolute animate__animated animate__slideInLeft top-0 left-0 h-screen w-50 bg-black/80 z-10">

                            <ul className="flex flex-col items-center p-8 gap-5">
                                <li>
                                    <NavLink
                                        className={'px-4 py-2 select-none bg-black/20 rounded-full opacity-80 hover:opacity-100 cursor-pointer'}
                                        to='/ai'>
                                        ChatBot
                                    </NavLink>
                                </li>
                            </ul>

                        </div>
                    }

                </nav>
            </div>

            <div className="main flex animate__animated animate__bounceIn items-center gap-8 flex-col w-full max-w-2xl h-screen">
                <img src="/aiimage.png" />
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-center text-gray-400">Convert Text into Natural <span className="text-white animate__animated animate__flash animate__infinite animate__slower"> Human Voice </span>in Seconds</h1>

                <p className="text-2xl text-center text-gray-400">Turn any text into clear, realistic speech using our <span className="animate__animated animate__fadeOut animate__infinite ">AI-powered</span> Text to Speech tool.</p>

                <div>
                    <button
                        onClick={navigateAi}
                        className={'px-5 py-3 bg-black/20  focus:animate__animated cursor-pointer focus:animate__zoomIn text-white opacity-80 hover:opacity-100 rounded-full'}
                    >{
                            loader ? 'Loading...' : '▶ Try for Free'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage