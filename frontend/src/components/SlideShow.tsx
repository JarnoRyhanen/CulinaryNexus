import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Import the default styles for the slideshow
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
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SlideShow;