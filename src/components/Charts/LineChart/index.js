import HighchartsReact from 'highcharts-react-official'
import Highchart from 'highcharts';
import React from 'react'
import {useState,useEffect} from 'react';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';
// Tạo một generate opiton default
const generateOptions = (data) => {
  // Cái categories là cái ngày ở dưới trục x, giờ từ cục data ta sẽ lấy ra Date, và nhờ fotmat bằng moment
    const categories = data.map((item)=>moment(item.Date).format('DD/MM/YYYY'));
    return {
        chart: {
          height: 500,
        },
        title: {
          text: 'Tổng ca nhiễm',
        },
        xAxis: {
          categories: categories,
          crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
          min: 0,
          title: {
            text: null,
          },
          labels: {
            align: 'right',
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: 'Tổng Ca nhiễm',
            data: data.map((item) => item.Confirmed),
          },
        ],
      };
    }
    
/*
Linechart sẽ nhận dataProps truyền từ thằng cha Summary
*/

const LineChart = ({dataProps}) => {
    // Tạo một state option để chứa các option 
    const [options, setOptions] = useState({});
    // Tạo một state như bên dưới để nhận biết các button đó là gì, để làm hiệu ứng selected active khi người dùng nhấn vào
    const [reportType, setReportType] = useState('');
    // Tạo một useEffect để nếu có sự thay đổi vể data thì nó sẽ gọi đến hàm generateOptions() để render ra một option mới và gán option mới vào state options
    // Và lưu ý ta đang truy xuất đến biến data nằm ngoài useEffect nên cần đưa biến data vào array denpendecy, để khi có sự thay đổi data thì useEffect sẽ được thực thi
    useEffect(()=>{
      /*
      Dựa vào các reportType là all, 30Day, 7Day để lọc data truyền vào 
      Tạo ra một biến chứa các data theo các reportType khi người dùng chọn đó là biến customData
      */
     // Nhớ phải đặt là let customData = []; xài const bị lỗi
     let customData = [];
      switch (reportType) {
        case 'All':
          customData = dataProps;  // all dữ liệu
          break;
        case '30Day':
          customData = dataProps.slice(dataProps.length - 30);  // data cho 30Day gần nhất
          break;
        case '7Day':
          customData = dataProps.slice(dataProps.length - 7);  // data cho 7Day gần nhất
          break;
      
        default:
          customData = dataProps;  // default nó sẽ hiện thị all data
          break;
      }
        setOptions(generateOptions(customData));
        // chỗ switch có truy xuất đến biến reportType từ bên ngoài nên cần đưa nó vào một array dependency, để khi reportType có sự thay đổi nó sẽ chạy lại useEffect
    }, [dataProps, reportType])
  return (
    <div>
        {/* Button Group này sẽ Group by các thông tin theo số lượng này như 30, 7...  
        justifyContent: 'flex-end' -> di chuyển sang phải */}
      <ButtonGroup size='small' style={{display:'flex', justifyContent: 'flex-end'}}>
        <Button color={reportType === 'All' ? 'secondary' : ''} onClick={()=>setReportType('All')}>Tất cả</Button>
        <Button color={reportType === '30Day' ? 'secondary' : ''} onClick={()=>setReportType('30Day')}>30 ngày</Button>
        <Button color={reportType === '7Day' ? 'secondary' : ''} onClick={()=>setReportType('7Day')}>7 ngày</Button>
      </ButtonGroup>

      <HighchartsReact 
            highcharts={Highchart}
            options={options}
      />

    </div>
  )
}

// Bọc LineChart trong react.memo để nó ghi nhớ component, chỉ khi nào có sự thay đổi props thì LineChart mới re-render, giúp tối ưu performance
export default React.memo(LineChart);
