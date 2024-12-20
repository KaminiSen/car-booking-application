import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmBooking } from "../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import mapImg from "../../assets/images/Map.png";
import location1 from "../../assets/icons/location3.svg";
import location2 from "../../assets/icons/location4.svg";

const PassengerInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPassenger, setIsPassenger] = useState(true);
  const [tnc, setTnc] = useState(false);
  const [errors, setErrors] = useState({});
  const [passenger, setPassenger] = useState({
    title: "",
    fname: "",
    lname: "",
    contactNumber: "",
    email: "",
    flightNumber: "",
    request: "",
  });
  const vehicleData = useSelector((state) => state?.booking?.selectedCar);
  const selectedCar = JSON.parse(localStorage.getItem("carData"));
  const data = JSON.parse(localStorage.getItem("addressData"));

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPassenger({
      ...passenger,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!passenger.title) newErrors.title = "Please select a salutation.";
    if (!passenger.fname) newErrors.fname = "First name is required.";
    if (!passenger.lname) newErrors.lname = "Last name is required.";
    if (!passenger.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{10}$/.test(passenger.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits.";
    }
    if (!passenger.email) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(
        passenger.email
      )
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!tnc) newErrors.tnc = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validation()) {
      console.log("Form contains errors.");
      return; 
    };
    const payload = {
      termAndCondition: tnc,
      isPassenger: isPassenger,
      carType: selectedCar?.type,
      origin: "London Luton Airport (LTN) London Luton Airport (LTN) London Luton Airport",
      destination: "London Luton Airport (LTN) London Luton Airport (LTN) London Luton Airport",
      date: "2024-07-25",
      currency: selectedCar?.price,
      paxCount: selectedCar?.passengers,
      passengerDetails: {
        firstName: passenger?.fname,
        lastName: passenger?.lname,
        contactNumber: passenger?.contactNumber,
        email: passenger?.email,
        title: passenger?.title,
        flightNumber: passenger?.flightNumber || 'Na',
        request: passenger?.request || 'Na',
      }
    };
    localStorage.setItem("bookingData", JSON.stringify(payload));

    dispatch(confirmBooking(payload));
    navigate("/invoice");
  };

  return (
    <div className="w-[98%] md:w-[85%] font-sans max-w-[1920px] m-auto  p-4 md:p-6 mt-4">
     <div className="flex flex-col lg:flex-row gap-8 items-start">
     <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl md:text-3xl font-bold">{selectedCar?.type}</h1>
        <p>{selectedCar?.desc}</p>
        <div style={{
          backgroundImage:`url(${mapImg})`,
          backgroundRepeat:'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }} className="mt-4 shadow-md rounded-md">
<div className="flex flex-col md:flex-row justify-between w-full items-end p-2">
  <p className="bg-white rounded-full px-4 py-2 text-sm">37 km . 2 hr 35 min</p>
<img src={selectedCar?.img} alt="img" />
</div>
        </div>
<div className="flex flex-col md:flex-row justify-between font-semibold gap-6 mt-4">
  <p className="flex gap-2 text-sm items-start">
    <img src={location2} alt="img" />
   {data?.originLocation}
  </p>
  <p className="flex gap-2 text-sm items-start">
    <img src={location1} alt="img" />
    {data?.destinationLocation}
  </p>
</div>

<div className="border-[1px] solid-[#CFCFCF] w-full mt-6"></div>

<div className="w-full flex flex-col md:flex-row justify-between mt-4">
  <div>
    <h2 className="text-lg font-bold">Total Price</h2>
    <p className="text-sm text-[#6D6D6D]">Includes VAT, Gratuities, Meet & Greet services</p>
  </div>
  <h1 className="text-xl md:text-2xl lg:text-3xl  font-bold text-[var(--red)]">{data?.currency} {selectedCar?.price}</h1>
</div>
      </div>
      <div className="bg-white p-3 md:p-6 rounded-lg shadow-md w-full lg:w-[60%] ">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Passenger Details</h2>

      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Are you the passenger?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio text-red-600 bg-red focus:ring-red-500"
              checked={isPassenger}
              onChange={() => setIsPassenger(true)}
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              className="form-radio text-red-600"
              checked={!isPassenger}
              onChange={() => setIsPassenger(false)}
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select your Salutation <span className="text-red-500">*</span>
        </label>
        <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          name="title"
          value={passenger.title || ""}
          onChange={handleInput}
        >
          <option value="" disabled selected>
            Select title
          </option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            name="fname"
            value={passenger.fname || ""}
            onChange={handleInput}
          />
          {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            name="lname"
            value={passenger.lname || ""}
            onChange={handleInput}
          />
          {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
        </div>
      </div>

     
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your contact number <span className="text-red-500">*</span>
        </label>
        <div className="flex  w-full">
          <select className="border border-gray-300 rounded-l-lg p-2 bg-gray-50 text-sm md:text-md">
            <option value="IND">IND (+91)</option>
            <option value="USA">USA (+1)</option>
          </select>
          <input
            type="text"
            placeholder="Enter your contact number"
            className="flex-1 border border-gray-300 border-l-0 rounded-r-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            name="contactNumber"
            value={passenger.contactNumber || ""}
            onChange={handleInput}
          />
        </div>
        {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
      </div>

   
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your email address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          name="email"
          value={passenger.email || ""}
          onChange={handleInput}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

    
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your flight number (Optional)
        </label>
        <input
          type="text"
          placeholder="Enter your flight number"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          name="flightNumber"
          value={passenger.flightNumber}
          onChange={handleInput}
        />
      </div>

   
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your special request (Optional)
        </label>
        <textarea
          placeholder="Type here!"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          rows="3"
          name="request"
          value={passenger.request}
          onChange={handleInput}
        ></textarea>
      </div>

     
      <div className="mb-6">
        <label className="flex items-center text-sm text-gray-700">
          <input type="checkbox" className="form-checkbox text-red-600" name="tnc" value={tnc} onChange={() => setTnc(!tnc)} />
          <span className="ml-2">
            I agree to{" "}
            <a href="#" className="text-red-500 underline">
              Terms & Conditions, Booking Conditions, and Privacy Policy
            </a>
          </span>
        </label>
      </div>

     
      <button
        onClick={handleSubmit}
        className="w-full bg-red-500 text-white font-medium rounded-lg py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Confirm & Pay
      </button>
    </div>
     </div>
    </div>
  );
};

export default PassengerInfo;