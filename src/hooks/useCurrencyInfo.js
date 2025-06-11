import { useEffect, useState } from "react";


function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    // Fetch the currency data from a API
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.rates) {
          setData(res); // Save the response data (rates)
        }
      })
      .catch((error) => {
        console.error("Error fetching currency data: ", error);
      });
  }, [baseCurrency]);

  return data;
}

export default useCurrencyInfo;
