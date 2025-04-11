import Header from './Header';
import Hero from './Hero';

const Landing = () => {
    return (
        <div className='pt-[4.75rem] lg:pt-[6.5rem] overflow-hidden'>
        <Header isFromHome={false}/>
        <Hero />
        </div>
    )
}

export default Landing;