import icon1 from "../../assets/icons/icon1.svg";
import icon2 from "../../assets/icons/icon2.svg";
import icon3 from "../../assets/icons/icon3.svg";
import icon4 from "../../assets/icons/icon4.svg";

const Footer = () =>{
    return(
        <div className="bg-[#F4F6F9] text-black py-8 px-4">
       <div className="w-[98%] md:w-[92%] lg:w-[90%] max-w-[1920px] m-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 lg:gap-16 text-left justify-between">
             <div>
                <h2 className="font-bold text-2xl">Drivado</h2>
                <p className="mt-4 text-sm">
                Drivado delivers an unparalleled customer 
                service through dedicated customer teams, engaged people working in an
                 agile culture, and a global footprint
                </p>
             </div>
             <div>
                <h4 className="font-bold">Explore</h4>
                <ul className="mt-4">
                    <li>About Us</li>
                    <li>Our warehoueses</li>
                    <li>Blog</li>
                    <li>News and Media</li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold">Legal</h4>
                <ul className="mt-4">
                    <li>Terms</li>
                    <li>Privacy</li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold">social media</h4>
                <div className="flex gap-4 items-center mt-4">
                    <img src={icon1} alt="img"/>
                    <img src={icon2} alt="img"/>
                    <img src={icon3} alt="img"/>
                    <img src={icon4} alt="img"/>
                </div>
             </div>
          </div>

          <div className="w-full border-[1px] solid-[#E5E5E5] mt-10"></div>

          <h1 className="text-center text-xl md:text-3xl text-[var(--red)] font-bold mt-6">Drivado</h1>
       </div>
      </div>
    )
}

export default Footer;