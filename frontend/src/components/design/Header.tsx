import logo from "../../assets/herobanner.jpg";

export const HambugerMenu = () => {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden">
      <div className="absolute inset-0 opacity-[.15]">
        <img
          className="w-full h-full object-cover"
          src={logo}
          width={688}
          height={953}
          alt="Background"
        />
      </div>
    </div>
  );
};
