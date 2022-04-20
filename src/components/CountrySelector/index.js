import React from 'react';
import { FormControl, FormHelperText, InputLabel, NativeSelect, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
    }
}));
// Component con này sẽ nhận vào hai props từ cha là : value, handleOnChange
// Lấy props countries truyền từ cha qua
const CountrySelector = ({valueProps, handleOnChangeProps, countriesProps}) => {
    const styles = useStyles();
    return  <FormControl className={styles.formControl}>
                <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
                <NativeSelect
                    value={valueProps}
                    onChange={handleOnChangeProps}
                    inputProps={{
                        name: 'country',
                        id: 'country-selector'
                        // country-selector đem lên đặt cho htmlFor để hai cái nó gộp với nhau làm một
                    }}
                >
                {/* map sẽ loop qua countriesProps với các index 0..., với các giá trị là một object tương ứng */}
                  {
                        countriesProps.map((country) => {
                            return <option key={country.ISO2} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                        })
                  }
                </NativeSelect>
                <FormHelperText>Lựa chọn quốc gia</FormHelperText>
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