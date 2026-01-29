import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import 'animate.css';

const AiTextToSpeach = () => {
    const [text, setText] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')
    const [isReady, setIsReady] = useState(false)
    const [currentAudio, setCurrentAudio] = useState(null)


    useEffect(() => {
        const checkReady = setInterval(() => {
            if (
                window.puter &&
                window.puter.ai &&
                typeof window.puter.ai.txt2speech === 'function'
            ) {
                setIsReady(true)
                clearInterval(checkReady)
            }
        }, 300);

        return () => clearInterval(checkReady)
    }, [])

    const speakText = async () => {
        if (text.length > 3000) {
            setError('Text must be less then 3000 characters');
            return
        }

        setLoader(true)
        setError('')

        if (currentAudio) {
            currentAudio.pause()
            // eslint-disable-next-line react-hooks/immutability
            currentAudio.currentTime = 0;
        }

        try {
            const audio = await window.puter.ai.txt2speech(text, {
                engine: 'standard',
                language: 'hi-IN'
            })
            setCurrentAudio(audio)
            audio.play()
            audio.addEventListener('ended', () => setLoader(false))
            audio.addEventListener('error', () => setLoader(false))
        }
        catch (err) {
            setError(err.message || 'Somthing went wrong with text-to-speech')
            setLoader(false)
        }
    }

    const stopAudio = () => {
        if (currentAudio) {
            currentAudio.pause()
            // eslint-disable-next-line react-hooks/immutability
            currentAudio.currentTime = 0;
            setCurrentAudio(null)
            setError('')
            setLoader(false)
        }
    }

    if(!isReady)
        return <div className="w-full h-screen flex justify-center items-center">
            <img 
            className="w-20 h-20 md:w-30 md:h-30"
            src="/carregando.gif" />
        </div>

    return (
        <div className="bg">
            <div className='flex flex-col items-center  gap-7 animate__animated animate__zoomIn  w-full h-screen justify-center'>
                <div className="flex gap-3 items-center">
                    <img src="/aiimage.png"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <h1 className='md:text-5xl text-2xl text-white/50'>Ai Text To Speech</h1>
                </div>
                <div className={`text-sm px-4 py-2 rounded-full ${isReady ? 'bg-green-500/30 text-green-500 border border-green-500/50' : 'bg-yellow-500/30 text-yellow-500 border border-yellow-500/50'

                    }`}>
                    {
                        isReady ? '🟢 AI Ready' : '🟡 Wating for Ai...'
                    }
                </div>

                <div className="w-full max-w-2xl shadow border p-6 bg-black/30 rounded-2xl">
                    <textarea
                        type="text"
                        className="w-full h-40 shadow outline-none p-3 bg-black/40 rounded-2xl focus:ring-1 focus:ring-indigo-500 focus:shadow-gray-400 focus:shadow-xl border border-gray-500/30 text-white transition-all duration-300 disabled:opacity-80 placeholder:text-sm"
                        placeholder="Enter text to speech... (max 3000 characters)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={!isReady}
                        maxLength={3000}
                    >
                    </textarea>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-400">
                            {text.length}/3000
                        </span>
                    </div>


                    <div className="flex gap-3 mt-4">
                        <button className="flex-1 bg-linear-to-r from-pink-500/30 to-indigo-500/40 px-6 py-4 rounded-2xl cursor-pointer  disabled:opacity-80"
                            onClick={speakText}
                            disabled={!isReady || loader || !text.trim()}
                        >
                            {
                                loader ?
                                    <div className="flex justify-center items-center text-white font-semibold gap-2">
                                        <div className="animate-spin w-4 h-4 border-2 border-white/40 border-t-white rounded-full"></div>
                                        Speaking...
                                    </div>
                                    :
                                    <div className="font-semibold text-white cursor-pointer">
                                        🗣️ Speak !
                                    </div>
                            }
                        </button>

                        {
                            currentAudio && (
                                <button
                                    onClick={stopAudio}
                                    className="px-4 py-2 bg-linear-to-r from-pink-500/30 to-indigo-500/40 rounded-2xl text-white cursor-pointer"
                                >🛑 Stop</button>
                            )
                        }

                    </div>


                    {
                        error && (
                            <div className=" mt-4 w-full px-6 py-3 bg-white/40 text-rose-600 font-semibold text-sm  rounded-2xl ">
                                {error}
                            </div>
                        )
                    }
                </div>

                <div className="absolute top-8 opacity-80 hover:opacity-100 right-5">
                    <NavLink
                        className={'px-5 py-3 bg-black/30 text-white rounded-full'}
                        to='/'>Go To Home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AiTextToSpeach