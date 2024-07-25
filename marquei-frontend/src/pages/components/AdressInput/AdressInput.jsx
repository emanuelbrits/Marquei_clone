import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function AddressInput({ setEndereco }) {
    const [address, setAddress] = useState('');

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setEndereco({ address: value, ...latLng });
        setAddress(value);
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input className="form-control" {...getInputProps({ placeholder: "Digite o endereço" })} required/>
                    <div>
                        {loading && <div>Carregando...</div>}
                        {suggestions.map((suggestion, index) => {
                            const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                            };
                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};