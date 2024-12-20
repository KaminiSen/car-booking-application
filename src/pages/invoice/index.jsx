import React, { useRef } from "react";
import { useSelector } from "react-redux";
import success from "../../assets/icons/success-img.svg";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { VscMail } from "react-icons/vsc";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import scanner from "../../assets/images/scanner.svg";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const { bookingDetails } = useSelector((state) => state.booking);

  const data = JSON.parse(localStorage.getItem("addressData"));
  const bookingData = JSON.parse(localStorage.getItem("booking"));

  const invoiceRef = useRef();

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    };
    return date.toLocaleDateString(undefined, options); 
  };

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      filename: "invoice.pdf",
      margin: 0.5,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden" ref={invoiceRef}>
      <div className="bg-green-100 text-green-600 text-center py-6 px-4">
        <div className="flex justify-center"><img src={success} alt="img"/></div>
        <div className="text-lg md:text-2xl font-semibold mt-4">Thank you for your payment. Your booking is CONFIRMED.</div>
      </div>

      <div className="px-6 py-4 border-b bg-[#F9F9F9] w-[90%] m-auto rounded-xl mt-5">
        <p className="text-gray-700 text-sm md:text-md">
          Dear <strong>{bookingData?.bookingDetails?.passengerDetails?.firstName}</strong>,<br />
          Thank you for booking with drivado. You will receive driver details at least 1 hour prior to pickup time.
          You can find the summary of your booking below.
        </p>
      </div>

      <div className="px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-gray-900 font-bold text-lg">Invoice</h2>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Booking ID: </p>
            <p className="font-bold text-lg">{bookingData?.bookingDetails?.bookingId}</p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 space-y-3">
          <div className="flex items-center">
            <span className="text-red-500">&#9679;</span>
            <span className="ml-2 font-semibold text-sm md:text-md">{data?.originLocation}</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-500">&#9679;</span>
            <span className="ml-2 font-semibold text-sm md:text-md">{data?.destinationLocation}</span>
          </div>
          <p className="text-sm text-gray-500 font-semibold">115 km &gt; 2 hr 54 min &gt; Oneway</p>
          <p className="text-sm text-gray-500 font-semibold flex gap-2 items-center"><MdOutlineCalendarMonth fontSize={'18px'}/> {formatDateWithTime(data.date)}</p>
        </div>
      </div>

      <div className="px-6 py-4 border-b">
        <h2 className="text-gray-900 font-bold">Passenger Details</h2>
        <div className="mt-4 text-gray-700 space-y-2 text-sm md:text-md">
          <p className="flex items-center gap-2"><HiUser/>{bookingData?.bookingDetails?.passengerDetails?.title}. {bookingData?.bookingDetails?.passengerDetails?.firstName} {bookingData?.bookingDetails?.passengerDetails?.lastName}</p>
          <p className="flex items-center gap-2"><VscMail/> {bookingData?.bookingDetails?.passengerDetails?.email}</p>
          <p className="flex items-center gap-2"><MdOutlinePhoneInTalk/> IND(+91) {bookingData?.bookingDetails?.passengerDetails?.contactNumber}</p>
          <p className="flex items-center gap-2"><MdFlight/> {bookingData?.bookingDetails?.passengerDetails?.flightNumber}</p>
          <p className="flex items-center gap-2"><BsPeople/> {bookingData?.bookingDetails?.paxCount}</p>
          <p >Special Request: </p>
          <p className="font-semibold">One Water Bottle One Water Bottle One Water Bottle</p>
        </div>
      </div>

    
      <div className="px-6 py-4">
        <h2 className="text-gray-900 font-bold">Vehicle Details</h2>
        <div className="mt-4 flex  sm:flex-row sm:items-center justify-between">
          <p className="text-black text-lg md:text-2xl  font-semibold">{bookingData?.bookingDetails?.carType}</p>
        
        <div className=" text-right text-lg md:text-xl font-semibold text-red-500">
         <strong className="text-[#808080] font-normal"> Total : </strong> {data?.currency} {bookingData?.bookingDetails?.currency}
        </div>
        </div>
       <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
       <div className=" sm:mt-0 flex items-center space-x-4 ">
            <div className=" rounded">
              <img
                src={scanner}
                alt="QR Code"
                className="h-20 w-20"
              />
            </div>
            <p className="text-gray-500">Scan the code to view in any device</p>
          </div>
          <div >
        <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 flex gap-2 items-center"
        onClick={downloadPDF}
        >
        <FaRegFilePdf/>  Download Invoice
        </button>
      </div>
       </div>
      </div>

     
    </div>
  </div>
  );
};

export default Invoice;
