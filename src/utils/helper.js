const getShiprocketAuthToken = async () => {
  const SHIPROCKET_TOKEN_KEY = "shiprocket_token";
  const SHIPROCKET_EXPIRY_KEY = "shiprocket_token_expiry";

  const token = localStorage.getItem(SHIPROCKET_TOKEN_KEY);
  const expiry = localStorage.getItem(SHIPROCKET_EXPIRY_KEY);

  if (token && expiry && Date.now() < parseInt(expiry)) {
    console.log("cache token");
    return token;
  } else {
    console.log("fetch token");

    const authResult = await fetch("/api/shiprocket/auth", {
      method: "POST",
    });

    const auth = await authResult.json();
    console.log(auth);

    const expiryTimestamp = Date.now() + 240 * 60 * 60 * 1000;

    localStorage.setItem(SHIPROCKET_TOKEN_KEY, auth.token);
    localStorage.setItem(SHIPROCKET_EXPIRY_KEY, expiryTimestamp.toString());

    return auth.token;
  }
};

const createShippingOrder = async (req) => {
  const authToken = await getShiprocketAuthToken();

  const createOrderResult = await fetch("/api/shiprocket/create", {
    method: "POST",
    body: JSON.stringify({
      token: authToken,
      orderData: req.shipmentRequest,
    }),
  });

  const createdOrder = await createOrderResult.json();
  console.log("--------------createResponse-----------");
  console.log(createdOrder);

  const assignAWBResult = await fetch("/api/shiprocket/assign", {
    method: "POST",
    body: JSON.stringify({
      token: authToken,
      reqData: {
        shipment_id: createdOrder.shipment_id,
        courier_id: req.courierId,
      },
    }),
  });

  const assignAWB = await assignAWBResult.json();
  console.log("--------------assignAWBResponse-----------");
  console.log(assignAWB);

  return { order: createdOrder, awb: assignAWB };
};

const getShippingRates = async (postalCode) => {
  const authToken = await getShiprocketAuthToken();
  let recommendedCourier;

  console.log("--------------get shipping rate----------");

  const queryParams = new URLSearchParams({
    token: authToken,
    pickup_postcode: "302017", // warehouse pin code
    delivery_postcode: postalCode,
    weight: "0.200",
  });

  const shippingRateResult = await fetch(
    `/api/shiprocket/checkRates?${queryParams.toString()}`,
    {
      method: "GET",
    }
  );

  if (shippingRateResult.ok) {
    const shippingRates = await shippingRateResult.json();
    console.log(shippingRates);

    if (shippingRates.status === 200) {
      const recommendedId =
        shippingRates.data.recommended_courier_company_id;

      recommendedCourier =
        shippingRates.data.available_courier_companies.find(
          (company) => company.courier_company_id === recommendedId
        );

      if (recommendedCourier) {
        console.log("Estimate date:", recommendedCourier.etd);
        console.log("Total shipping rate:", recommendedCourier.rate);
      }
    }
  }

  return {
    recommendedCourier: recommendedCourier,
    estimateDate: recommendedCourier.etd,
    totalRate: recommendedCourier.rate,
  };
};

export { getShiprocketAuthToken, createShippingOrder, getShippingRates };
