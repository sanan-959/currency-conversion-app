import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencyInfo = useCurrencyInfo();

  const convert = () => {
    if (!amount || isNaN(amount)) return;
    if (!currencyInfo || !currencyInfo.rates) return; // Check if data is loaded
    const rate = currencyInfo?.rates?.[to];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  
  const options = currencyInfo && currencyInfo.rates ? Object.keys(currencyInfo.rates) : [];

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Currency Converter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onAmountChange={(val) => setAmount(val)}
            onCurrencyChange={(val) => setFrom(val)}
          />

          <div className="my-2">
            <button
              type="button"
              onClick={swap}
              className="bg-yellow-400 text-white py-1 px-4 rounded font-medium"
            >
              🔁 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={(val) => setTo(val)}
            amountDisable
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded font-medium"
          >
            Convert {from} to {to}
          </button>
        </form>

        {convertedAmount && (
          <p className="mt-4 text-green-700 font-semibold">
            {amount} {from} = {convertedAmount} {to}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
