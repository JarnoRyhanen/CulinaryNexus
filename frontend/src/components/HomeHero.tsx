import Button from "./Button";
import SlideShow from "./SlideShow";

const HomeHero = () => {
    return (
        <div className='bg-[#FFF8E1] mt-[6rem] md:px-4 z-100 h-fit flex flex-col'>
            <h2 className='mt-6 p-4 font-semibold text-xl md:text-3xl text-orange-800 bg-orange-400/30 text-center rounded-2xl'>Browse the greatest recipies on the planet!</h2>

            <div className="block md:flex flex-row mt-4 md:p-2 bg-amber-800/80 rounded-2xl">
                <SlideShow />
                <div className="flex flex-col items-center max-md:border-b-2 border-orange-700 md:p-4 m-4 rounded-2xl bg-white 
                 md:w-2/5 h-fit md:h-full">
                    <h3 className="text-orange-800 font-semibold text-center mt-4">Contribute to our collection!</h3>
                    <div className="flex flex-col items-center md:space-x-2 gap-3 m-3">
                        <span>Create your own recipes</span>
                        <Button className="w-fit" href="/create-recipes">Here!</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHero;