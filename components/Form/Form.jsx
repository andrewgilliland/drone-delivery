import { useContext } from "react";
import router from "next/router";
import SmartyStreetsSDK from "smartystreets-javascript-sdk";

import { DroneDeliveryContext } from "@/state/Context";

import useForm from "@/utils/hooks/useForm";
import Button from "@/components/Button";

export default function Form() {
  const { values, updateValue } = useForm({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const { user, handleChangeUser } = useContext(DroneDeliveryContext);

  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;

  let key = process.env.NEXT_PUBLIC_SMARTY_WEBSITE_KEY;
  const credentials = new SmartyStreetsCore.SharedCredentials(key);

  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials)
    .withBaseUrl("/")
    .withLicenses(["us-rooftop-geocoding-cloud"]);
  let client = clientBuilder.buildUsStreetApiClient();

  function handleSubmit(e) {
    e.preventDefault();
    // Check db to see if user exists
    // If user exists, display error message and exit
    // Else
    // Verify address with SmartyStreet API

    let lookup = new Lookup();

    lookup.street = values.street;
    lookup.urbanization = ""; // Only applies to Puerto Rico addresses
    lookup.city = values.city;
    lookup.state = values.state;
    lookup.zipCode = values.zipcode;
    lookup.maxCandidates = 3;
    lookup.match = "invalid";

    client.send(lookup).then(handleSuccess).catch(handleError);

    function handleSuccess(response) {
      console.log(response.result);
      //   response.lookup.result;
    }

    function handleError(response) {
      console.log(response);
    }

    // If address does not exists, display error message and exit
    // Else
    // Geocode address with Mapbox API
    // Put User data into context
    handleChangeUser({
      name: values.name,
      street: values.street,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
    });
    // Redirect to verify page
    router.push("/verify");
  }

  return (
    <form className="flex flex-col border border-gray-100 shadow-md p-5 rounded-sm mt-5">
      <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 rounded-md px-2 py-1"
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={updateValue}
      />
      <div className="flex flex-col mt-3">
        <label htmlFor="street">Street</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="street"
          id="street"
          value={values.street}
          onChange={updateValue}
        />
        <label htmlFor="city">City</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={updateValue}
        />
        <label htmlFor="State">State</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="State"
          id="State"
          value={values.State}
          onChange={updateValue}
        />
        <label htmlFor="zipcode">Zipcode</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="zipcode"
          id="zipcode"
          value={values.zipcode}
          onChange={updateValue}
        />
      </div>
      <Button handleSubmit={handleSubmit}>Get Started</Button>
    </form>
  );
}

// `https://www.smartystreets.com/products/apis/us-street-api?key=21102174564513388&candidates=${values.street}&city=${values.city}&state=${values.state}&zipcode=${values.zipcode}&match=enhanced&license=us-rooftop-geocoding-cloud&method=get`;
