import React from 'react';
import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';
// Component con này sẽ nhận vào hai props từ cha là : value, handleOnChange
const CountrySelector = ({value, handleOnChange}) => {
    return  <FormControl>
                <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
                <NativeSelect>
                    value={value}
                    onChange={handleOnChange}
                    inputProps={{
                        name: 'country',
                        id: 'country-selector'
                        // country-selector đem lên đặt cho htmlFor để hai cái nó gộp với nhau làm một
                    }}
                </NativeSelect>
            </FormControl>
        
}

export default CountrySelector;

/* https://mui.com/material-ui/getting-started/installation/ */
/*  Choose component api */

/* 
COVID-19 API: https://documenter.getpostman.com/view/10808728/SzS8rjbc
Highcharts: https://www.highcharts.com/demo
Highcharts React: https://github.com/highcharts/highcharts-react
Material-UI: https://mui.com/material-ui/getting-started/installation/
*/