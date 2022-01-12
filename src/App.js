import "./App.css";
import CurrencyRow from "./CurrencyRow";
import { React, useEffect, useState } from "react";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=b5caffe8026245d9d11e8068fa53e53d";
let currData;

function App() {
  const [codes, setCodes] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(1);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (done) return;
    let from = parseFloat(fromValue);
    if (isNaN(from)) return;
    let fromCur = fromCurrency;
    let toCur = toCurrency;

    let exchange = currData.rates[toCur] / currData.rates[fromCur];
    console.log(exchange);
    setToValue(from * exchange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency, fromValue]);

  useEffect(() => {
    document.title = "Currency convertor";
    fetch(BASE_URL)
      .then((data) => data.json())
      .then((data) => {
        currData = data;
        setCodes([...Object.keys(data.rates)]);
        setFromCurrency("USD");
        setToCurrency("INR");
        setFromValue(1);
        setToValue(data.rates['INR']/data.rates['USD']);
        setDone(false);
      });
  }, []);

  return (
    <>
      <h1>Convert Currency values</h1>
      <div className="input-cont">
        <CurrencyRow
          codes={codes}
          selectedCurr={fromCurrency}
          value={fromValue}
          onChangeCurrency={(e) => {
            setFromCurrency(e.target.value);
          }}
          onChangeValue={(e) => {
            setFromValue(e.target.value);
          }}
        />
        <p className="eq">=</p>
        <CurrencyRow
          codes={codes}
          selectedCurr={toCurrency}
          value={toValue}
          onChangeCurrency={(e) => {
            setToCurrency(e.target.value);
          }}
          onChangeValue={(e) => {
            setToValue(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default App;
