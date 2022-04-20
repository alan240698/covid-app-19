import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';
/*
Để thêm style với @material-ui/core ta sử dụng
1. makeStyles
2. Sau đó chúng ta tạo một biến chứa styles
*/
const useStyles = makeStyles({
    /* Đầu tiên ta style cho các card nhiểm, khỏi, tử vong với các màu khác nhau
       Do ta muốn sử một props đó là typeProps để định dạng màu theo các type đó, nên hàm wrapper đó sẽ nhận một props */
    wrapper: (props) => {
        if(props.typeProps === 'confirmed')  return {borderLeft: '5px solid red'};
        if(props.typeProps === 'recovered')   return {borderLeft: '5px solid green'};
        else return {borderLeft: '5px solid gray'};
    },
    /*
    Giờ tạo một obj chứ không phải function như trên vì thông tin title và count là cùng định dạng 
    */
   title: {
       fontSize: 18, marginBottom: 5
   },
   count: {
       fontWeight: 'bold', fontSize: 18
   } 
});
/*
    Component được thiết kế để chứa các phần card chung trong index.js của HighLight
    1. Nhận props từ cha của nó với các props titleProps, countProps, typeProps
*/
const Highlightcart = ({titleProps, countProps, typeProps}) => {
    // Để sử dụng style thì ta cần làm như bên dưới
    // Xong đưa vào thẻ cần style
    const styles = useStyles({typeProps});
    return (
        <Card className={styles.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={styles.title}>{titleProps}</Typography>
                <Typography component="span" variant="body2" className={styles.count}><CountUp end={countProps} duration={2} separator=' '/></Typography>
            </CardContent>
        </Card>
    );
}

export default Highlightcart;
