import { React } from "react";

export default function CurrencyRow({ codes,selectedCurr,onChangeCurrency,value,onChangeValue }) {
  return (
    <div className="row">
      <input type="number" value={value} onChange={onChangeValue}/>
      <select name="currency" id="currency" value={selectedCurr} onChange={onChangeCurrency}>
        {codes.map((code) => {
          return (
            <option key={code} value={code}>
              {code}
            </option>
          );
        })}
      </select>
    </div>
  );
}
