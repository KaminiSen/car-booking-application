import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchCarOptions, setAddresses } from "../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import addressData from "../../data/address.json";
import heroImg from "../../assets/images/hero-sectionImg.svg";
import bgImg from "../../assets/images/hero-bg-img.png";
import { Button, Card, CircularProgress, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import truckIcon from "../../assets/icons/truck-img.svg";
import warehouseIcon from "../../assets/icons/warehouse-icon.svg";
import globalIcon from "../../assets/icons/global-icon.svg";
import packageIcon from "../../assets/icons/package-icon.svg";
import mode1 from "../../assets/images/mode1.svg";
import mode2 from "../../assets/images/mode2.svg";
import mode3 from "../../assets/images/mode3.svg";
import num1 from "../../assets/icons/num1.svg";
import num2 from "../../assets/icons/num2.svg";
import num3 from "../../assets/icons/num3.svg";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: "",
    paxCount: "",
    currency: "",
  });
  const [loading, setLoading] = useState(false);
  const currencyTab = ["USD", "EUR", "INR", "GBP", "NGN", "KES", "GHS", "ZAR"];

  useEffect(() => {
    dispatch(setAddresses(addressData));
  }, [dispatch]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !form.origin.trim() ||
      !form.destination.trim() ||
      !form.date.trim() ||
      !form.paxCount ||
      !form.currency.trim()
    ) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const originObj = addressData.find((item) => item.address === form.origin);
    const destinationObj = addressData.find(
      (item) => item.address === form.destination
    );

    const requestData = {
      origin: { latitude: originObj.latitude, longitude: originObj.longitude },
      destination: {
        latitude: destinationObj.latitude,
        longitude: destinationObj.longitude,
      },
      paxCount: form.paxCount,
      currency: form.currency,
      date: form.date,
      originLocation: form.origin || 'na',
      destinationLocation: form.destination || 'na',

    };
    localStorage.setItem("addressData", JSON.stringify(requestData));

    dispatch(fetchCarOptions(requestData))
      .then(() => {
        toast.success("Form submitted successfully!");
        setForm({
          origin: "",
          destination: "",
          date: "",
          paxCount: "",
          currency: "",
        });
        navigate("/vehicle-selection");
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (

    <div className="w-full font-sans max-w-[1920px] m-auto">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16" style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "contain",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="w-[94%] m-auto">
          <div className=" flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight">
                We Offer Exceptional Comfort With 24/7 Access To Our
                <span className="text-[#FB4156]"> Top-Tier </span> Chauffeur Services.
              </h1>
              <button className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleScrollToForm}>
                Book Now
              </button>
            </div>
            <div className="lg:w-1/2">
              <img
                src={heroImg}
                alt="Hero Illustration"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-[90%] m-auto " ref={formRef}>
        <Card sx={{ p: 5, mt: 6, boxShadow: '0px 0px 4px 0px lightgray' }}>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>

            <Grid item xs={12} sm={4} md={4} lg={2}>

              <TextField
                focused
                select
                fullWidth
                color="var(--grey)"
                label="Origin"
                name="origin"
                onChange={handleInput}
                placeholder="Select origin"
                variant="outlined"
                value={form.origin}
                defaultValue='Select origin'
              >
                <MenuItem disabled value="Select origin">
                  <em>Select origin</em>
                </MenuItem>
                {addressData.map((item) => (
                  <MenuItem key={item.address} value={item.address} >
                    {item.address}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>

              <TextField
                focused
                select
                fullWidth
                color="var(--grey)"
                label="Destination"
                name="destination"
                onChange={handleInput}
                value={form.destination}
                placeholder="Select destination"
                defaultValue='Select destination'
              >
                <MenuItem disabled value="Select destination">
                  <em>Select destination</em>
                </MenuItem>
                {addressData.map((item) => (
                  <MenuItem key={item.address} value={item.address} >
                    {item.address}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                fullWidth
                color="var(--grey)"
                label="Date"
                focused
                type="date"
                name="date"
                value={form.date}
                onChange={handleInput}
                placeholder="Enter date"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                fullWidth
                color="var(--grey)"
                label="Pax Count"
                focused
                type="number"
                name="paxCount"
                value={form.paxCount}
                onChange={handleInput}
                placeholder="Enter pax count"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                fullWidth
                select
                color="var(--grey)"
                label="Currency"
                focused
                name="currency"
                type="text"
                value={form.currency}
                onChange={handleInput}
                placeholder="Enter currency"
              >
                {currencyTab.map((item) => (
                  <MenuItem key={item} value={item} >
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              {loading ? (
                <Typography sx={{ textAlign: 'center' }} color="var(--red)">
                  <CircularProgress size={24} color="var(--red)" />
                </Typography>
              ) : (
                <Button
                  sx={{
                    bgcolor: "var(--red)",
                    color: "white",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    width: "100%",
                    height: '56px',
                    "&:hover": { bgcolor: "darkred" },
                  }}
                  onClick={handleSubmit}
                >

                  Search
                </Button>
              )}
            </Grid>
          </Grid>
        </Card>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FAFB] py-12 mt-12">
        <div className="w-[90%] m-auto">
          <div className="flex  md:flex-row lg:flex-row items-center justify-between">
            <div className="text-left mb-8">
              <h2 className="text-xl md:text-3xl font-600 text-gray-800 flex gap-2">
                <b>Services <p className="width:100 bg-[var(--red)] h-[3px]"></p></b> We Offer
              </h2>
            </div>
            <div>
              <img
                src={truckIcon}
                alt="Connect"
                className="w-[100px] md:w-auto"
              />

            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <img
                src={warehouseIcon}
                alt="Connect"

              />
              <h3 className="text-xl font-semibold mb-2 text-[var(--red)] ml-4">
                warehousing services
              </h3>
              <p className="text-gray-600 ml-4">
                A pay as-you-go solution for: pallet storage, inventory management, fulfillment(e.g. pick and pack), in/out-bound solutions, and more.
              </p>
            </div>
            <div>
              <img
                src={globalIcon}
                alt="Connect"

              />
              <h3 className="text-xl font-semibold mb-2 text-[var(--red)] ml-4">
                Global Freight
              </h3>
              <p className="text-gray-600 ml-4">
                Search and compare the best shipping rates among dozens of trusted logistic partners for the last mile delivery and freight.
              </p>
            </div>
            <div >
              <img
                src={packageIcon}
                alt="Connect"

              />
              <h3 className="text-xl font-semibold mb-2 text-red-500 ml-4">
                Packaging Solutions
              </h3>
              <p className="text-gray-600 ml-4">
                Our packaging solutions are optimized for each individual customer and are selected based on on the customer’s specific needs and requirements.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mt-12">
            <button className="border-[1px] border-solid border-[var(--red)] bg-white text-[var(--red)]
         px-6 py-3 rounded-[8px] font-bold">request quote</button>
            <button className="bg-[var(--red)] text-white px-8 py-3 rounded-[8px] font-bold">join now</button>

          </div>
        </div>
      </section>

      {/* Operation Mode Section */}
      <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
        <div className="w-[80%] m-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end sm:gap-12 md:gap-32 lg:gap-32 ">
            <img
              src={truckIcon}
              alt="Connect"
              className="w-[100px] md:w-auto"
            />
            <div className="text-center mb-8 ">
              <h2 className="text-2xl md:text-3xl font-600 text-gray-800 flex gap-2 justify-center">
                <b>Operation <p className="width:100 bg-[var(--red)] h-[3px]"></p></b> mode
              </h2>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
            <div className="text-left md:w-1/3">
              <div className="flex gap-4 items-center">
                <img src={num1} /><h3 className="text-2xl md:text-3xl font-semibold text-[var(--red)]">Connect</h3>
              </div>
              <p className="text-gray-600 mt-4">
                You’re currently running your store on Shopify, WooCommerce, or any other platform.
                As a first step, you’ll connect your store with our platform.
              </p>
            </div>
            <div> <img src={mode1} alt="img" /></div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
            <div> <img src={mode2} alt="img" /></div>
            <div className="text-left md:w-1/3">
              <div className="flex gap-4 items-center">
                <img src={num2} /><h3 className="text-2xl md:text-3xl font-semibold text-[var(--red)]">Store</h3>
              </div>
              <p className="text-gray-600 mt-4">
                Then, you can send us your inventory and the fun begins. We’ll choose a
                delivery day together so your fulfilment is not interrupted.
              </p>
            </div>

          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
            <div className="text-left md:w-1/3">
              <div className="flex gap-4 items-center">
                <img src={num3} /><h3 className="text-2xl md:text-3xl font-semibold text-[var(--red)]">Ship</h3>
              </div>
              <p className="text-gray-600 mt-4">
                We pick, pack and ship all incoming orders directly from our own warehouse until 12pm on the same day,
              </p>
            </div>
            <div> <img src={mode3} alt="img" /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
