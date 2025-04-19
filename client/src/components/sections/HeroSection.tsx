import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Users, GitBranch } from "lucide-react"
import { SignInButton, useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
    const elementsRef = useRef<(HTMLDivElement | null)[]>([])
    const { isSignedIn } = useUser();
  const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible")
                    }
                })
            },
            { threshold: 0.1 },
        )

        elementsRef.current.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => {
            elementsRef.current.forEach((el) => {
                if (el) observer.unobserve(el)
            })
        }
    }, [])

    return (
        <section className="overflow-hidden pb-20 pt-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center lg:flex-row">
                    <div className="mb-12 w-full text-center lg:mb-0 lg:w-1/2 lg:text-left">
                        <div
                            ref={(el) => (elementsRef.current[0] = el)}
                            className="animate-on-scroll"
                        >
                            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wider text-primary">
                                COLLABORATIVE DEVELOPMENT
                            </span>
                            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                Code Together,{" "}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Solve Together
                                </span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground lg:mx-0">
                                A real-time collaborative code editor designed
                                for seamless team development. Write, share, and
                                build together like never before.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                {/* <a href="/join"> */}
                                    {" "}
                                    {isSignedIn ? (
                                    <Button onClick={() => navigate("/join")} size="lg" className="group">
                                        Start Coding{" "}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                    ) : (
                                    <Button size="lg" className="group">
                                         <SignInButton />{" "}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                       
                        )}
                                {/* </a> */}
                                <a href="/">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="border-primary/20"
                                    >
                                        Learn More
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div
                            ref={(el) => (elementsRef.current[1] = el)}
                            className="animate-on-scroll mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
                        >
                            <div className="flex items-center">
                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Code className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        Syntax Highlighting
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        20+ languages
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        Real-time Collaboration
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Unlimited users
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <GitBranch className="h-5 w-5 text-primary" />
                                </div>
                              
                            </div>
                        </div>
                    </div>

                    <div
                        ref={(el) => (elementsRef.current[2] = el)}
                        className="animate-on-scroll w-full pl-0 lg:w-1/2 lg:pl-12"
                    >
                        <div className="relative">
                            <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-accent/30 blur-xl filter"></div>
                            <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-primary/20 blur-xl filter"></div>

                            <div className="glass-card relative overflow-hidden rounded-xl border border-white/20 p-4 shadow-xl">
                                <div className="mb-3 flex items-center rounded-lg bg-slate-800/90 px-3 py-2">
                                    <div className="flex space-x-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="ml-4 text-xs text-slate-400">
                                        main.py
                                    </div>
                                </div>
                                <pre className="overflow-x-auto rounded-lg bg-slate-900/90 p-4 text-xs text-slate-200 sm:text-sm">
                                    <code>
                                        <span className="text-blue-400">
                                            def
                                        </span>{" "}
                                        <span className="text-purple-400">
                                            welcome
                                        </span>
                                        (): {"\n"}
                                        {"    "}
                                        <span className="text-green-400">
                                            print
                                        </span>
                                        (
                                        <span className="text-yellow-300">
                                            "Welcome to the code editor!"
                                        </span>
                                        ) {"\n"}
                                        {"    "}time ={" "}
                                        <span className="text-red-400">10</span>{" "}
                                        {"\n"}
                                        {"    "}
                                        <span className="text-green-400">
                                            for
                                        </span>{" "}
                                        i{" "}
                                        <span className="text-blue-400">
                                            in
                                        </span>{" "}
                                        range(time): {"\n"}
                                        {"        "}print(
                                        <span className="text-yellow-300">
                                            f"Starting coding in seconds..."
                                        </span>
                                        ) {"\n"}
                                        {"        "}time -={" "}
                                        <span className="text-red-400">1</span>{" "}
                                        {"\n"}
                                        {"    "}
                                        <span className="text-green-400">
                                            print
                                        </span>
                                        (
                                        <span className="text-yellow-300">
                                            "Let's start coding!"
                                        </span>
                                        ) {"\n"}
                                        {"\n"}
                                        <span className="text-blue-400">
                                            if
                                        </span>{" "}
                                        __name__ =={" "}
                                        <span className="text-yellow-300">
                                            "__main__"
                                        </span>
                                        : {"\n"}
                                        {"    "}welcome(){"\n"}
                                    </code>
                                </pre>
                                <div className="absolute bottom-16 right-12 flex items-center">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-medium text-white shadow-sm">
                                        PY
                                    </div>
                                    <div className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-[10px] font-medium text-white shadow-sm">
                                        VS
                                    </div>
                                    <div className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-[10px] font-medium text-white shadow-sm">
                                        TP
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
