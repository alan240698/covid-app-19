import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import moment from "moment";
import '@fontsource/roboto';
// Thêm ngày tháng tiếng việt
import 'moment/locale/vi';
moment.locale('vi');
// Import fonts


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
      // Sắp sếp data theo field country
      const countriesData = sortBy(res.data, 'Country');
      setCountries(countriesData);
      /*
      Set như bên dưới để mặc định khi người dùng chưa select gì, để mặc định là của việt nam, nó sẽ get dữ liệu việc nam về
      Tuy nhiên cái select vẫn để nước khác nhé, vì vậy cần truyền valueProps cho countrySelector, để nó lấy value mặc định chọn việt nam
      */
      setSelectedCountryId('vn');
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
    /*
      Như đã biết useEffect luôn được thưc hiện trong lần render đầu tiên, tức là mới mở app ra là nó render thì lúc đó useEffect sẽ thực hiện
      Mà selectedCountryId là một state được setselectedCountryId ở hàm onChange với giá trị người dùng chọn, mà lần đầu tiên mới dô áp thì
      người dùng chưa cho nên đoạn slug sẽ bị lỗi liền vì ta đang so sánh như bên dưới, người dùng chưa chọn nên selectedCountryId == undefined
      => Giai pháp: là check biến selectedCountryId, nếu có dữ liệu thì mới thực hiện các đoạn bên đoạn bên trong useEffect
    */
   if(selectedCountryId){
    const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);
    //call api
    getReportByCountry(Slug)
    .then(res=> {
      // xóa bỏ item cuối trong array data vì đó là dữ liệu của ngày hiện, dữ liệu này chưa hoàn thiện vì nó chưa hết ngày
      res.data.pop();
      setReport(res.data);
    })
   }
  }, [countries, selectedCountryId])

  /*-----------------------------------------------------------------------------------------------------------------*/
  
    return (
      // Bọc toàn bộ các component vào container componet của thằng material, nó sẽ giúp thiết lập max-width
      <Container style={{marginTop: 20}}>
          <Typography variant="h2" component="h2">Số liệu COVID-19</Typography>
          <Typography>{moment().format('LLL')}</Typography>

          <CountrySelector countriesProps = {countries} handleOnChangeProps={handleOnChange} valueProps={selectedCountryId}/>

          <Highlight reportProps={report}/>

          <Summary reportProps={report} selectedCountryIdProps={selectedCountryId}/>

      </Container>
    );
}

export default App;