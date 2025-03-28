
const Footer = () => {
    return (
        <div className='px-5 py-5 bg-[#FFF8E1] rounded-xl border-1'>
            <div className='container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col'>
                <p className='text-black lg:block text-xs lg:text-base'> © {new Date().getFullYear()}. All rights reserved.</p>
                <p className="text-black lg:block text-xs lg:text-base">Jarno Ryhänen</p>
            </div>
        </div>
    )
}

export default Footer;