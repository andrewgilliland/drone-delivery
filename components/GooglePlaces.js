import { useState, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function GooglePlaces() {
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {};

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {() => <div>Google</div>}
      </PlacesAutocomplete>
    </div>
  );
}
