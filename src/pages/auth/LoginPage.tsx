import Video from "@/assets/videos/video.mp4";
import Logo from "@/assets/images/logo.png";
import SignInForm from "./LoginForm";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <main className="relative flex h-screen w-full flex-row bg-black">
            <video
                className="hidden h-screen w-[60%] object-cover opacity-50 xl:block"
                autoPlay
                loop
                muted
                preload="auto"
            >
                <source src={Video} type="video/mp4" />
                <track
                    src={Video}
                    kind="subtitles"
                    srcLang="pt-br"
                    label="Português"
                />
                Seu navegador não suporta reprodução de vídeo.
            </video>
            
            <div className="relative z-10 flex h-screen w-[100%] flex-col items-center justify-center bg-background lg:bg-background xl:w-[40%]">
                <div className="w-[90%] rounded-2xl bg-card px-8 py-4 shadow-lg xl:w-[600px]">
                    {/* Logo com melhor acessibilidade */}
                    <div className=" flex w-full justify-center">
                        <img 
                            src={Logo} 
                            alt="DroneFlow - Sistema de Gestão de Drones"
                            width={150} 
                            height={70}
                            className="object-contain"
                        />
                    </div>

                    <div className="text-center mb-6 space-y-2">
                        <CardTitle className="text-3xl font-bold text-foreground">
                            Acesse sua conta
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground leading-relaxed">
                           Entre na plataforma para gerenciar suas operações
                        </CardDescription>
                    </div>

                    <SignInForm />

                    <Separator className="mt-8" />

                    <div className="mt-8 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                            <a 
                                href="/suporte" 
                                className="hover:text-primary text-muted-foreground transition-colors underline underline-offset-4 hidden lg:block"
                            >
                                Precisa de ajuda?
                            </a>
                            <span className="hidden sm:inline">•</span>
                             <Link to="/forgot-password" className="hover:text-primary text-muted-foreground transition-colors underline underline-offset-4">
                                Esqueceu sua senha?
                            </Link>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                               ©2025 - Dronix - Gestor . Todos os Direitos Reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}