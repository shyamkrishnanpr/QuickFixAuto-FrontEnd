import React, { useEffect, useState } from 'react'

const AddressSelection = ({onAddressSelect,onContinue}) => {


    const [selectedAddress, setSelectedAddress] = useState(null);
    const [locality, setLocality] = useState('');
    const [flatNameNumber, setFlatNameNumber] = useState('');
    const [addresses, setAddresses] = useState([]); 
    const [availableAddresses, setAvailableAddresses] = useState([]); 
    const [addingNewAddress, setAddingNewAddress] = useState(true); 
  
   
    const initialAvailableAddresses = [
     
    ];
  
    useEffect(() => {
   
      setTimeout(() => {
        setAvailableAddresses(initialAvailableAddresses);
      }, 1000);
    }, []);
  
    const handleAddressClick = (address) => {
      setSelectedAddress(address);
      setAddingNewAddress(false); 
    };
  
    const handleNewAddressChange = (e) => {
      setLocality('');
      setFlatNameNumber(e.target.value);
    };
  
    const handleLocalityChange = (e) => {
      setLocality(e.target.value);
    };
  
    const handleAddNewAddress = () => {
      if (locality.trim() !== '' && flatNameNumber.trim() !== '') {
        const newAddress = `${flatNameNumber}, ${locality}`;
        setAddresses([...addresses, newAddress]); 
        setSelectedAddress(newAddress);
        setFlatNameNumber('');
        setLocality('');
      } else {
        
      }
    };
  
    const handleContinueClick = () => {
      if (selectedAddress) {
        onAddressSelect(selectedAddress);
        onContinue()
      } else {
        // Handle address selection error (e.g., display an error message)
      }
    };
   
  
         
  return (
    <>
    <div className="mt-2 ml-2 p-4 rounded-lg shadow-lg flex flex-col w-full h-full">
      <h3 className="text-xl font-semibold mb-2">Select Pickup Address</h3>
  

      <div className="mt-4">
        <input
          className="border rounded-md px-2 py-1 w-full mb-2"
          type="text"
          placeholder="Flat Name/Number"
          value={flatNameNumber}
          onChange={handleNewAddressChange}
        />
        <input
          className="border rounded-md px-2 py-1 w-full mb-2"
          type="text"
          placeholder="Locality"
          value={locality}
          onChange={handleLocalityChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md self-end"
          onClick={handleAddNewAddress}
        >
          Add Address
        </button>
      </div>

      <div className="mt-4 flex-grow">
        {availableAddresses.map((address, index) => (
          <div
            key={index}
            className={`border rounded-md px-3 py-2 mb-2 cursor-pointer ${
              address === selectedAddress ? 'bg-blue-200' : 'bg-white'
            }`}
            onClick={() => handleAddressClick(address)}
          >
            {address}
          </div>
        ))}
        {addresses.map((address, index) => (
          <div
            key={index}
            className={`border rounded-md px-3 py-2 mb-2 cursor-pointer ${
              address === selectedAddress ? 'bg-blue-200' : 'bg-white'
            }`}
            onClick={() => handleAddressClick(address)}
          >
            {address}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleContinueClick}
        >
          Continue
        </button>
      </div>
    </div>

    </>
  )
}

export default AddressSelection
