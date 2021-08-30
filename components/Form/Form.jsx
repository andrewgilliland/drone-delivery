import { useContext } from "react";
import router from "next/router";

import { DroneDeliveryContext } from "@/state/Context";

import useForm from "@/utils/hooks/useForm";
import Button from "@/components/Button";

export default function Form() {
  const { values, updateValue } = useForm({
    name: "",
    address: "",
  });

  const { user, handleChangeUser } = useContext(DroneDeliveryContext);

  function handleSubmit(e) {
    console.log(`clicked!`);
    e.preventDefault();
    // Check db to see if user exists
    // If user exists, display error message and exit
    // Else
    // Verify address with SmartyStreet API
    // If address does not exists, display error message and exit
    // Else
    // Geocode address with Mapbox API
    // Put User data into context
    handleChangeUser({ name: values.name, address: values.address });
    // Redirect to verify page
    router.push("/verify");
  }

  return (
    <form
      className="flex flex-col border border-gray-100 shadow-md p-5 rounded-sm mt-5"
      action=""
    >
      <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 rounded-md"
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={updateValue}
      />
      <label htmlFor="address">Address</label>
      <input
        className="bg-gray-100 rounded-md"
        type="text"
        name="address"
        id="address"
        value={values.address}
        onChange={updateValue}
      />
      <Button handleSubmit={handleSubmit}>Get Started</Button>
    </form>
  );
}
