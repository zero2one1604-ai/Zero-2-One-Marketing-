"use client";

import { createShippingOrder, getShippingRates } from "@/utils/helper";
import { useState, useEffect } from "react";

const Order = () => {
  const [checkoutForm, setCheckoutForm] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [shippingRate, setShippingRate] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [courierId, setCourierId] = useState("");
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState();

  const handleChange = (changeId, changeValue) => {
    setCheckoutForm({
      ...checkoutForm,
      [changeId]: changeValue,
    });
  };

  const checkShippingRates = async () => {
    setLoader(true);
    const shippingDetails = await getShippingRates(checkoutForm.postalCode);
    setDeliveryDate(shippingDetails.estimateDate);
    setShippingRate(shippingDetails.totalRate);
    setCourierId(shippingDetails.recommendedCourier.id);
    setLoader(false);
  };

  const order_items = [
    {
      name: "Jeans",
      sku: "#J3432",
      units: 1,
      selling_price: 100,
      discount: "0",
      tax: "0",
      hsn: "",
    },
  ];


  const createOrder = async () => {
    setLoader(true);
    console.log(checkoutForm);

    const request = {
      courierId: courierId,
      shipmentRequest: {
        order_id: "12345",
        order_date: new Date(),
        pickup_location: "warehouse",
        billing_customer_name: checkoutForm.fname,
        billing_last_name: checkoutForm.lname,
        billing_address: checkoutForm.address,
        billing_address_2: "",
        billing_city: checkoutForm.city,
        billing_pincode: checkoutForm.postalCode,
        billing_state: checkoutForm.state,
        billing_country: checkoutForm.country,
        billing_email: checkoutForm.email,
        billing_phone: checkoutForm.phone,
        shipping_phone: checkoutForm.phone,
        shipping_is_billing: 1,
        order_items: order_items,
        payment_method: "Prepaid",
        shipping_charges: shippingRate,
        sub_total: 100 + shippingRate,
        length: "10",
        breadth: "10",
        height: "10",
        weight: "0.200",
      },
    };

    const orderDetails = await createShippingOrder(request);
    setOrder(orderDetails);
    console.log(orderDetails);
    setLoader(false);
  };

  return (
    <div className="flex items-center justify-center px-6 pt-10 h-full">
      <div className="bg-white grid grid-cols-2 w-full max-w-6xl h-full p-2 border border-gray-300 rounded-2xl">
        <div className="w-full p-10 justify-center h-full overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900">
            Product Details
          </h3>

          <ul>
            <ol>Name: {order_items[0].name}</ol>
            <ol>Quantity: {order_items[0].units}</ol>
            <ol>Price: {order_items[0].selling_price}</ol>
            <ol>Approx Shipping Rate : &#8377; {shippingRate}</ol>
            <ol>Expected Delivery Date : {deliveryDate}</ol>
            <ol>Order Details</ol>
            <ol>Order: {JSON.stringify(order?.order)}</ol>
            <ol>AWB  : {JSON.stringify(order?.awb)}</ol>
          </ul>
        </div>

        <div className="w-full bg-gray-50 dark:bg-gray-800 p-10 h-full overflow-y-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.fname}
                  onChange={(e) => handleChange("fname", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.lname}
                  onChange={(e) => handleChange("lname", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={checkoutForm.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={checkoutForm.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Address
              </label>
              <textarea
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={checkoutForm.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  City
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  State
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Pincode
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  value={checkoutForm.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
                onClick={createOrder}
              >
                Create Shiprocket Order
              </button>
              <button
                className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
                onClick={checkShippingRates}
              >
                Check Shipping Rates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
