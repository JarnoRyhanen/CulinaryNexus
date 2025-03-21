import React from 'react'
import ButtonSvg from '../assets/ButtonSvg';

type ButtonProps = {
    className?: string,
    href?: string,
    onClick?(): void,
    children?: React.ReactNode,
    px?: string,
    white?: boolean,
}

const Button: React.FC<ButtonProps> = ({ className, href, onClick, children, px, white }) => {

    const classes = `font-code text-xs font-bold uppercase tracking-wider relative inline-flex items-center
     justify-center h-11 transition-colors hover:text-sky-600 ${px || "px-7"
        } ${white ? "text-white" : "text-black"} ${className || ""}`;

    const spanClasses = "relative z-10";

    const renderButton = () => (
        <button className={classes} onClick={onClick}>
            <span className={spanClasses}>{children}</span>
            {ButtonSvg(white)}
        </button>
    );


    const renderLink = () => (
        <a href={href} className={classes}>
            <span className={spanClasses}>{children}</span>
            {ButtonSvg(white)}
        </a>
    );

    return href ? renderLink() : renderButton();
};
export default Button;