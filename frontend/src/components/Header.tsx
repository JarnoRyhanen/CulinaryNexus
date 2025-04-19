import { useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import { useLocation } from 'react-router-dom';
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from '../constants';
import { HambugerMenu } from './design/Header';
import MenuSvg from '../assets/MenuSvg';
import Button from './Button';


type HeaderTypes = {
    isFromHome: boolean;
}

const Header = ({ isFromHome }: HeaderTypes) => {

    const pathname = useLocation();
    const [openNavigation, setopenNavigation] = useState(false);

    const toggleNavigation = () => {
        if (openNavigation) {
            setopenNavigation(false);
            enablePageScroll();
        } else {
            setopenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;

        enablePageScroll();
        setopenNavigation(false);
    };

    useEffect(() => { }, []);

    return (
        <div className={` ${isFromHome ? "relative" : "fixed"} top-0 left-0 w-full z-50 lg:backdrop-blur-sm shadow-xl 
          ${openNavigation ? 'bg-black' : 'bg-black/90 backdrop-blur-sm'}`}>
            <div className=' flex items-center justify-between p-4 px-10 bg-green-600'>
                <a className="flex items-center justify-start gap-4" href="#hero">
                    <img src={logo} width={52} height={52} alt="culinary nexus" />
                    <h2 className='text-xl text-white'>CulinaryNexus</h2>
                </a>

                <nav className={` ${openNavigation ? 'flex' : 'hidden'} 
                fixed top-[5.9rem] left-0 right-0 bottom-0 bg-black text-white
                lg:static lg:flex lg:mx-auto lg:bg-transparent`}>

                    <div className="relative z-2 flex flex-col 
                    items-center justify-center m-auto lg:flex-row">
                        {navigation
                            .filter((item) => isFromHome ? item.showOnHome : true)
                            .map((item) => (
                                <a key={item.id} href={item.url} onClick={handleClick}
                                    className={`block relative text-2xl uppercase
                                text-n-1 transition-colors hover:text-color-1 

                                ${item.onlyMobile ? 'lg:hidden' : ''}
                                
                                px-6 py-4  md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                                ${item.url === pathname.hash ? 'z-2' : 'lg:text-n-1/50'} 
                                lg:leading-5 lg:hover:text-color-1 xl:px-12`}>
                                    {item.title}
                                </a>
                            ))}
                    </div>
                    <HambugerMenu />
                </nav>

                {!isFromHome ? (
                    <>
                        <a href='#signup' className='button hidden mr-8 text-black/1050 transition-colors hover:text-gray-500 lg:block'>
                            New Account
                        </a>
                        <Button className="hidden lg:flex" href="#login">
                            Sign in
                        </Button>
                    </>
                ) : (
                    <Button className="hidden lg:flex" href="#profile">
                        Profile
                    </Button>
                )}

                <Button className="ml-auto lg:hidden" px='px-3' onClick={toggleNavigation}>
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>
        </div>
    )
}

export default Header;