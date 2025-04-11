import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { slideShow } from '../constants';

const SlideShow = () => {
    return (
        <div className='relative w-full md:h-[30rem] md:w-3/5 m-auto list-image-none'>
            <Slide easing='ease' duration={30_000} infinite autoplay>
                {slideShow.map((slide) => (
                    <div key={slide.id} className='w-full h-[12.5rem] md:h-[30rem]'>
                        <img
                            src={slide.imageUrl}
                            alt={`Slide ${slide.id}`}
                            className='md:rounded-xl object-cover h-full w-full'
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/15 to-transparent md:rounded-b-xl"></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SlideShow;