 import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = 'USD',
  amountDisable = false,
  currencyDisable = false,
}) {
  const amountInputId = useId();

  return (
    <div className="flex mb-4">
      <div className="w-1/2 mr-2">
        <label htmlFor={amountInputId} className="text-sm text-gray-600 block mb-1">
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          value={amount}
          disabled={amountDisable}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Amount"
        />
      </div>

      <div className="w-1/2">
        <label className="text-sm text-gray-600 block mb-1">Currency</label>
        <select
          value={selectCurrency}
          disabled={currencyDisable}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
