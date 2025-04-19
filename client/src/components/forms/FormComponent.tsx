import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Copy, ArrowRight, RefreshCw, Users } from 'lucide-react'

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        const newRoomId = uuidv4()
        setCurrentUser({ ...currentUser, roomId: newRoomId })
        toast.success("Created a new Room ID")
        usernameRef.current?.focus()
    }

    const copyRoomId = () => {
        if (currentUser.roomId) {
            navigator.clipboard.writeText(currentUser.roomId)
            setCopied(true)
            toast.success("Room ID copied to clipboard")
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room ID")
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("Room ID must be at least 5 characters long")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        
        setIsLoading(true)
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            })
            setIsLoading(false)
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
            setIsLoading(false)
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    useEffect(() => {
        // Handle loading state when attempting to join fails
        if (status !== USER_STATUS.ATTEMPTING_JOIN && isLoading) {
            setIsLoading(false)
        }
    }, [status, isLoading])

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl">
            {/* <div className="flex items-center justify-center w-full">
                <img src={logo} alt="Logo" className="w-40 h-auto mb-4 drop-shadow-lg" />
            </div> */}
            
            <div className="w-full text-center mb-2">
                <h1 className="text-2xl font-bold text-white">Join Collaboration Room</h1>
                <p className="text-gray-400 mt-1">Connect with others and start coding together</p>
            </div>
            
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-5">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="roomId"
                        placeholder="Room ID"
                        className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all text-white"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                    {currentUser.roomId && (
                        <button
                            type="button"
                            onClick={copyRoomId}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                        >
                            {copied ? 
                                <span className="text-green-400 text-sm mr-1">Copied!</span> :
                                <Copy className="w-5 h-5" />
                            }
                        </button>
                    )}
                </div>
                
                <input
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all text-white"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Joining...
                        </>
                    ) : (
                        <>
                            Join Room
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
            
            <div className="w-full flex justify-center">
                <button
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    onClick={createNewRoomId}
                >
                    <RefreshCw className="w-4 h-4" />
                    Generate New Room ID
                </button>
            </div>
            
            <div className="w-full border-t border-gray-700 pt-4 text-center">
                <p className="text-gray-400 text-sm">
                    By joining, you agree to collaborate responsibly with others.
                </p>
            </div>
        </div>
    )
}

export default FormComponent