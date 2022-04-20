import React from 'react';
import LineChart from '../Charts/LineChart';
import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import HighMaps from '../Charts/HighMaps';
// Nhận reportProps từ cha App.js truyền vào
const Summary = ({reportProps, selectedCountryIdProps}) => {
    // Tạo một state chứa dữ liệu từ map
    const [mapData, setMapData] = useState({});

    // Tạo một useEffect load dataMap tương tứng với country nhận được từ selectedCountryIdProps
    useEffect(() => {
        // Và phải kiểm tra xem selectedCountryIdProps có dữ liệu gì không thì mới thực hiện các đoạn code bên trong useEffect
        if(selectedCountryIdProps){
            // Đoạn này chỉ đơn giản là import map tương ứng với selectedCountryIdProps người dùng select
            // Và lưu ý import là một promise nên cần dùng method then để lấy data response về
            import (`@highcharts/map-collection/countries/${selectedCountryIdProps}/${selectedCountryIdProps}-all.geo.json`)
            .then((res)=>setMapData(res));
        }
    // Cần thêm vào arrayDependency vì nó là biến truy xuất từ bên ngoài useEffect và đề nếu selectedCountryIdProps thay đổi thì load dataMap tương ứng
    }, [selectedCountryIdProps])
    return <div style={{marginTop: 10}}>
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {/* Truyền dataProps này cho Linchart con  */}
                <LineChart dataProps={reportProps}/>
            </Grid>
            <Grid item sm={4} xs={12}>
                {/* Truyền mapDataProps */}
                <HighMaps mapDataProps={mapData}/>
            </Grid>
        </Grid>
    </div>
}
export default Summary;
