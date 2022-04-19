import HighchartsReact from 'highcharts-react-official'
import Highchart from 'highcharts';
import React from 'react'
import {useState,useEffect} from 'react';
// Tạo một generate opiton default
const generateOptions = (data) => {
    const categories = [];
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
    


export default function LineChart({data}) {
    // Tạo một state option để chứa các option 
    const [options, setOptions] = useState({});
    // Tạo một useEffect để nếu có sự thay đổi vể data thì nó sẽ gọi đến hàm generateOptions() để render ra một option mới và gán option mới vào state options
    // Và lưu ý ta đang truy xuất đến biến data nằm ngoài useEffect nên cần đưa biến data vào array denpendecy, để khi có sự thay đổi data thì useEffect sẽ được thực thi
    useEffect(()=>{
        setOptions(generateOptions(data));
    }, [data])
  return (
    <div>
       <HighchartsReact 
            highcharts={Highchart}
            options={options}
       />

    </div>
  )
}
