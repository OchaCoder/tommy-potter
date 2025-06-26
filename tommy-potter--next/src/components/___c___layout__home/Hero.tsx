import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="lg:grid lg:grid-cols-[6fr_7fr] lg:h-[65vh]">
        {/* Image section */}
        <div className="relative h-[60vh] lg:h-full lg:m-10 lg:mr-0 lg:mt-6">
          <Image
            src="/img/hero.webp"
            alt="Hero banner"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Overlay for small screens */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-neutral-900/20 lg:hidden">
            <h1 className="text-5xl sm:text-6xl text-white font-thin fade-in-up theme-font" style={{ animationDelay: "200ms" }}>
              <span>Timeless, Every Curve.</span>
            </h1>
          </div>
        </div>

        {/* Text block for large screens only */}
        <div className="hidden lg:flex flex-col justify-center w-full">
          <h1 className="text-6xl font-thin theme-font text-center fade-in-up" style={{ animationDelay: "200ms" }}>
            <span>Timeless, Every Curve.</span>
          </h1>

          <p className="font-serif text-sm px-10 pt-3 font-thin text-center">Woven from the heart of Tommy Potter</p>
        </div>
      </div>
    </div>
  )
}
