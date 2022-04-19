import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  /* Khai báo một state để lưu trữ dữ liệu trả về từ api 
  1. Giá trị khởi tạo mặc định là một empty array
  */
  const [countries, setCountries] = useState([]);  
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);
  /*-----------------------------------------------------*/
  /*Để thực hiện gọi một api trong một function component ta cần bọc nó trong một useEffect vì nó là một side effect 
  UseEffect nhận vào hai tham số, tham số thứ nhất là một function và tham số thứ hai là một array dependency
  1. Để một empty array denpendemcy vì muốn gọi hàm getCountries một lần thôi, ở lần render đầu tiên
  2. axios là một promise nên dùng method then để lấy response trả về từ api
  */
  useEffect(() => {
    getCountries()
    .then(res=>{
      // console.log({res});
      setCountries(res.data);
    });

  }, []);
  /*-----------------------------------------------------------------------------------------------------------------*/

  /*
  1. Tạo một handleOnChange cho CountrySelector 
  */
  const handleOnChange = (e) =>{
    setSelectedCountryId(e.target.value);

  }
  useEffect(()=>{
    // Tìm country, return contry với country.ISO2 === e.target.value (dữ liệu người dùng chọn)
    // Tiếp theo sử dụng tính năng object diractory lấy ra Slug
    // const country = countries.find(country => country.ISO2 === e.target.value mà e.target.value đã được setState cho selectedCountryId );
    const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);

    //call api
    getReportByCountry(Slug)
    .then(res=> {
      // xóa bỏ item cuối trong array data vì đó là dữ liệu của ngày hiện, dữ liệu này chưa hoàn thiện vì nó chưa hết ngày
      res.data.pop();
      setReport(res.data);
    })
  }, [countries, selectedCountryId])

  /*-----------------------------------------------------------------------------------------------------------------*/
  
    return (
      <>
        <CountrySelector countriesProps = {countries} handleOnChangeProps={handleOnChange}/>
        <Highlight reportProps={report}/>
        <Summary reportProps={report}/>
      </>
    );
}

export default App;