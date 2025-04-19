import FormComponent from "@/components/forms/FormComponent"
import { useEffect, useState } from "react"
// import Footer from "@/components/common/Footer"

function HomePage() {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center justify-center overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI5IDBhMjkgMjkgMCAxIDAgNTggMCAyOSAyOSAwIDEgMC01OCAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMzAgMzBtLTI3IDBhMjcgMjcgMCAxIDAgNTQgMCAyNyAyNyAwIDEgMC01NCAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-20"></div>

            {/* Floating code symbols */}
            <div className={`absolute inset-0 overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                {['<>', '{}', '//', '()', '[]', '=>', '*', '#', '$.', 'fn'].map((symbol, index) => (
                    <div 
                        key={index}
                        className="absolute text-blue-400 text-opacity-10 font-mono font-bold"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 40 + 20}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    >
                        {symbol}
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-6 py-12 gap-12">
                {/* Left side - Value proposition */}
                <div className="w-full md:w-1/2 max-w-lg text-center md:text-left">
                    <div className={`transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700 ease-out`}>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            <span className="text-blue-400">Code Collab </span> 
                            Real-time Collaborative <span >Coding</span> 
                        </h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Connect with developers around the world and code together in real-time. 
                            Share ideas, solve problems, and build projects collaboratively.
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {[
                                { title: "Real-time Sync", desc: "See changes as they happen" },
                                { title: "Easy Sharing", desc: "One-click room creation" },
                                { title: "Secure", desc: "Private collaboration rooms" },
                                { title: "Cross-Platform", desc: "Works on any device" }
                            ].map((feature, index) => (
                                <div 
                                    key={index} 
                                    className={`bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 ease-out`}
                                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                                >
                                    <h3 className="text-blue-400 font-medium">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Right side - Form component */}
                <div className={`w-full md:w-1/2 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700 ease-out delay-300`}>
                    <FormComponent />
                </div>
            </div>
            
            {/* Animated cursor trail */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <svg className="absolute w-full h-full">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </div>
            
            {/* Footer space*/}
            {/* <div className="py-6 mt-auto text-center text-gray-500 text-sm">
                {/* <Footer /> */}
                {/* <p>© {new Date().getFullYear()} Code Collab. All rights reserved.</p> */}
            {/* </div>  */} 
            
            {/* CSS for animations */}
            <style>{`
                @keyframes float {
                    0% {
                        transform: translate(0px, 0px) rotate(0deg);
                    }
                    50% {
                        transform: translate(20px, 20px) rotate(180deg);
                    }
                    100% {
                        transform: translate(0px, 0px) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    )
}

export default HomePage