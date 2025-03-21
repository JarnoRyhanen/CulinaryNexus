import { features } from '../constants';
import Button from './Button';

const Hero = () => {

    const [firstFeature] = features;

    return (
        <div className='relative z-10 mt-2'>

            <div className='flex flex-col rounded-3xl mt-4 m-2 p-4 border bg-[#FFF8E1]'>

                <div className='my-8 mt-4 flex flex-col justify-center text-center'>
                    <h1 className='text-5xl font-semibold'>Welcome to CulinaryNexus</h1>
                    <p className='text-lg text-black/80 mt-4 '>Get ready to explore a world of flavors! Discover delicious recipes and unleash your inner chef with CulinaryNexus.</p>
                    <Button className='flex mx-auto mt-5'>Get Started</Button>
                </div>

                <div className='flex flex-wrap sm:flex-col lg:flex-row  gap-4 p-3'>
                    <img src={firstFeature.imageUrl} className='lg:max-h-[50rem] lg:w-screen xl:w-[45rem] sm:object-cover rounded-2xl' />
                    <ul className='flex xl:flex-col sm:gap-2 lg:max-h-[40rem] xl:max-w-[40rem] mx-auto'>
                        {features.map((item) => (
                            <li key={item.id}>
                                {item.id != "1" ?
                                    <img src={item.imageUrl} className='max-h-[22.5rem] xl:w-screen object-cover rounded-2xl' />
                                    : ""}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Hero;