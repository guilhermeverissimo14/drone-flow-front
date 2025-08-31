import video from "@/assets/videos/video.mp4";
import SignInForm from "./LoginForm";

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
                <source src={video} type="video/mp4" />
                <track
                    src={video}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 flex h-screen w-[100%] flex-col items-center justify-center bg-[#255037] lg:bg-gray-100 xl:w-[40%]">
                <div className="w-[90%] rounded-lg bg-white p-8 shadow-lg xl:w-[600px]">
                     <div className="text-center mb-6">
						<h1 className="text-2xl font-bold text-gray-800 mb-2">
							Bem-vindo de volta!
						</h1>
						<p className="text-gray-600 text-sm">
							Faça login para acessar sua conta
						</p>
					</div>

                    <SignInForm />
                </div>
            </div>
        </main>
    );
}