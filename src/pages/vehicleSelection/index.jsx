import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCar } from "../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/vehicleImages/black_sand_pearl 1.svg";
import image4 from "../../assets/vehicleImages/Escalade copy 1.svg";
import image3 from "../../assets/vehicleImages/Frame_2608615-removebg-preview 1.svg";
import image5 from "../../assets/vehicleImages/image-removebg-preview (2) copy 1.svg";
import image2 from "../../assets/vehicleImages/image-removebg-preview 2.svg";
import icon1 from "../../assets/icons/vIcon1.svg";
import icon2 from "../../assets/icons/vIcon2.svg";
import icon3 from "../../assets/icons/vIcon3.svg";
import people from "../../assets/icons/People.svg";
import location from "../../assets/icons/location.svg";
import location2 from "../../assets/icons/location2.svg";
import arrow from "../../assets/icons/down-arrow.svg";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const VehicleSelection = () => {
  const vehicles = [
    {
      id: 1,
      type: "STANDARD SEDAN",
      passengers: "3 Pax",
      luggage: "2 Luggage",
      price: 239.74,
      img: image1,
      desc: '(Corolla, Toyota Prius, Camry, Ford Taurus or similar)',
    },
    {
      id: 2,
      type: "PREMIUM SEDAN",
      passengers: "3 Pax",
      luggage: "2 Luggage",
      price: 259.74,
      img: image2,
      desc: '(Mercedes E Class, BMW 5 Series, Audi A6, VW Passat, Lexus or similar)',
    },
    {
      id: 3,
      type: "ECONOMY VAN",
      passengers: "5 Pax",
      luggage: "5 Luggage",
      price: 279.74,
      img: image3,
      desc: '(Opel Vivaro, Ford, Volkswagen Caravelle, Honda Odyssey or similar)',
    },
    {
      id: 4,
      type: "PREMIUM VAN",
      passengers: "5 Pax",
      luggage: "5 Luggage",
      price: 299.74,
      img: image4,
      desc: '(Mercedes Viano/V Class, Cadillac Escalade, Toyota Alphard, GMC or similar)',
    },
    {
      id: 5,
      type: "LUXURY SEDAN",
      passengers: "5 Pax",
      luggage: "5 Luggage",
      price: 299.74,
      img: image5,
      desc: '(Mercedes S Class, BMW 7 Series, Audi A8 or similar)'
    },
  ];

  const { cars, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressData = JSON.parse(localStorage.getItem("addressData"));
  console.log("addressDataaddressData", addressData);


  const selectCar = (car) => {
    dispatch(setSelectedCar(car));
    localStorage.setItem("carData", JSON.stringify(car));
    navigate("/passenger-information");
    console.log("selectCar", car);
  };

  return (
    <div className="w-[98%] md:w-[92%] font-sans max-w-[1920px] m-auto  p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row items-center w-full">
                <img
                  src={vehicle.img}
                  alt={vehicle.type}
                  className="w-[200px] h-auto rounded-md "
                />
                <div className="w-full ">
                  <div className="pt-4 pr-4 pl-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {vehicle.type}
                    </h3>
                    <p className="text-[#6D6D6D]">{vehicle.desc}</p>
                    <p className="text-md font-semibold text-black mt-3 flex gap-6 items-center">
                      <div className="flex gap-2"> <img src={people} />  {vehicle.passengers} </div>
                      <div className="flex gap-2"><img src={icon1} /> {vehicle.luggage} </div>
                    </p>
                    <p className=" text-sm md:text-md text-[#1B911F] mt-2 flex gap-6 items-center">
                      <div className="flex gap-2"> <img src={icon2} /> Free Cancellation</div>  <div className="flex gap-2"><img src={icon3} /> Free Waiting Time</div>
                    </p>
                  </div>
                  <div className="flex justify-between w-full mt-3 items-end">
                    <div className="text-left pl-4 pb-4">
                      <p className="text-sm text-[#6D6D6D]">
                        Includes VAT, Gratuities, Meet & Greet services
                      </p>
                      <p className="text-xl md:text-2xl lg:text-3xl  font-bold text-[var(--red)]">
                        {addressData?.currency} {vehicle.price.toFixed(2)}
                      </p>
                    </div>
                    <button className=" px-6 md:px-8 py-2 lg:px-12 bg-red-600 text-white font-medium 
                rounded-tl-xl rounded-br-xl w-[50%] md:w-[32%]
                hover:bg-red-700 transition text-sm md:text-md"
                      onClick={() => selectCar(vehicle)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Booking Details
            </h3>
            <hr className="mb-4" />
            <div className="flex items-center gap-2">
              <img src={location2} alt="img" />
              <p className="text-black mb-2 font-semibold">
                {addressData?.originLocation}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src={arrow} alt="img" />
              <div className="flex items-center justify-between w-full">
                <p className="flex gap-1 items-center text-[#9D9D9D]"><FaRegClock />13:45 PM </p>
                <p className="flex gap-1 items-center text-[#9D9D9D]"><FaRegCalendarAlt />15 Aug 2024 </p>
                <p className="flex gap-1 items-center text-[#9D9D9D]"><BsPeople />2 Pax</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={location} alt="img" />
              <p className="text-black mb-2 font-semibold">
                {addressData?.destinationLocation}
              </p>
            </div>
            <div className="flex items-center justify-between w-full pl-5">
              <p className="flex gap-1 items-center text-[#9D9D9D]"><GiPathDistance />115 km</p>
              <p className="flex gap-1 items-center text-[#9D9D9D]"><PiClockCounterClockwiseBold />1H 16M </p>
              <p className="flex gap-1 items-center text-[#9D9D9D]"><GrTransaction />Oneway</p>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Inclusions For All
            </h3>
            <hr className="mb-4" />
            <ul className="space-y-4">
              {[
                "Free 60 minutes waiting time for airport pickups, 15 minutes waiting time for all other pickups.",
                "Free cancellation up to 24 hours prior to time for both one-way transfer and hourly disposals.",
                "Flight No./Train No. is mandatory for airport/station pickup and dropoff.",
                "The vehicle images are just for reference; you may get a different vehicle of similar quality depending on destination.",
                "Guest/luggage capacities must be abided by for safety reasons.",
              ].map((inclusion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="mt-2">
                    <FaCheck fontSize={'15px'} color="var(--red)" />
                  </div>

                  <p className="text-sm text-gray-600">{inclusion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;

