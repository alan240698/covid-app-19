import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts  from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import {useState, useEffect, useRef}  from 'react'
import { cloneDeep } from 'lodash';
// Để sử dụng được highcharstmap thì chúng ta cần load modules này
highchartsMap(Highcharts );
// Tương tự cái generateOption, thì ta tạo một initOptions
const initOptions = {
    chart: {
      height: '500',
    },
    title: {
      text: null,
    },
    // mapNavigation với enabled: true có thể di chuyển phóng to, kéo thả bản đồ
    mapNavigation: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
      stops: [
        [0.2, '#FFC4AA'],
        [0.4, '#FF8A66'],
        [0.6, '#FF392B'],
        [0.8, '#B71525'],
        [1, '	#7A0826'],
      ],
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
    },
    series: [
      {
        // Để map có thể hoạt động cần truyền vào một mapData, và mapData là một một obj json tương tứng với tưng đất nước
        mapData: {},
        name: 'Dân số',
        joinBy: ['hc-key', 'key'],
      },
    ],
  };

/*
Nhận một mapDataProps từ cha là Summary
*/
const HighMaps = ({mapDataProps}) => {
    // Tạo một state options để lưu trữ các option
    const [options, setOptions] = useState({});
    // Tạo ref
    const chartRef = useRef(null);
    // Tạo flag loaded
    const [configLoaded, setConfigLoaded] = useState(false);
    /*
    Tạo một useEffect để khi mà mapDataProps thay đổi thì nó setOptions lại
    */
   useEffect(()=> {
       // Kiêm tra nếu mapDataProps có dữ liệu thì mới thực hiện map và các đoan còn lại trong useEffect này
       if(mapDataProps && Object.keys(mapDataProps).length) {
           
           const fakeData = mapDataProps.features.map((feature, index) => ({

            key: feature.properties['hc-key'],
            value: index,

           }));

        
            // Khi mà mapDataProps chỉ cần set lại mapData trong series thuộc thằng initOptions
            setOptions({
                ...initOptions, // giữ nguyên các obj khác thuộc initOptions
                series:[   // set lại obj series
                    {
                        ...initOptions.series[0], // set lại thằng mapData thôi
                        mapData: mapDataProps,
                        // Do không có dữ liệu data cho từng tỉnh nên ta phải fakeData
                        data: fakeData
                    }, 
                ],
            });


            if(!configLoaded){
                setConfigLoaded(true);
            }

       }

    // và do mapDataProps, configLoaded được truy xuất từ bên ngoài nên cần thêm nó vào một array denpendecy, và thêm vào để khi mapDataProps có sự thay đổi thì useEffect sẽ được thực thi
   }, [mapDataProps, configLoaded])


   /*
   Vì ta cần phải update cái country đến hàm update của HighchartMap để nhận biết được thay đổi của country, thi chartMap mới hiện thị đúng bản đồ của country đó,
   tạo useEffect này để nếu mapDataProps thay đổi thì useEffect sẽ được gọi thực thi

   */
   useEffect(()=> {
    // Kiểm tra có dữ liệu hay không
    // Nếu có thì truy xuất như bên dưới
    if(chartRef && chartRef.current){
        chartRef.current.chart.series[0].update(
            // nếu key và value giống nhau thì viết gọn 
            // {mapData,}
            // Do khác nhau nên mapData: mapDataProps nên viết như bên dưới
            {
                mapData: mapDataProps,  
            }
        )
    }

   }, [mapDataProps])

   if(!configLoaded) return null;
   
    return (
        <HighchartsReact
            highcharts={Highcharts}
            // Sử dụng cái cloneDeep của lodash để copy ra một options để tránh cái component HighchartsReact làm thay đổi object options
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    );
}
// Bọc LineChart trong react.memo để nó ghi nhớ component, chỉ khi nào có sự thay đổi props thì HighMaps mới re-render, giúp tối ưu performance

export default React.memo(HighMaps);
