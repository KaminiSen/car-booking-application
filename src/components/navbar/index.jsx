import logo from "../../assets/icons/logo.svg";
import hemBurgur from "../../assets/icons/hemBurger.svg";
const Navbar = () => {
    return (
        <div className="bg-black p-4">
            <div className="w-[98%] md:w-[90%] max-w-[1920px] m-auto">
                <div className="w-full flex items-center justify-between">
                    <img className="w-[80px] md:w-auto" src={logo} alt="img" />

                    <div className="flex gap-4 md:gap-10">
                        <button className="text-white bg-black rounded-full px-4 md:px-6 py-1 md:py-2 text-sm md:text-md
                shadow-[-2px_0px_2px_0px_rgba(239,68,68,1)] hover:shadow-[-2px_0px_2px_0px_rgba(220,38,38,1)] 
                transition-all duration-300">
                            Client Login
                        </button>
                        <img className="w-[20px] md:w-[30px]" src={hemBurgur} alt="img" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;