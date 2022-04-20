import { Grid} from '@material-ui/core';
import React from 'react';
import Highlightcart from './HighlightCart';
// Nhận props reportProps truyền từ App.jss cha đến
const Highlight = ({reportProps}) => {
    /*
    1. Lấy ra dữ liệu report của ngày cuối cùng, vì đến ngày cuối cùng nó tổng hợp dữ liệu, biến data
    */
    const data = reportProps && reportProps.length ? reportProps[reportProps.length -  1] : [];
    /*
    2. Tạo ra biến summary là một mảng obj với dữ liệu tương ứng trong 3 column, số ca khỏi, số ca nhiểm và số ca tử vong
    */
    const summary = [
        {
            title: 'Số ca nhiểm',
            count: data.Confirmed,  // Tổng số ca nhiểm đến thời điểm hiện tại
            type: 'confirmed'      // type này mình có thể dặt giá trị nào cho nó cũng được, miễn sao tạo ra State dựa vào type mang nghĩa dễ hiểu
        },
        {
            title: 'Số ca khỏi',
            count: data.Recovered,  // Tổng số ca khỏi đến thời điểm hiện tại
            type: 'recovered'     // type này mình có thể dặt giá trị nào cho nó cũng được, miễn sao tạo ra State dựa vào type mang nghĩa dễ hiểu
        },
        {
            title: 'Số ca tử vong',
            count: data.Deaths,  // Tổng số ca tử vong đến thời điểm hiện tại
            type: 'death'   // type này mình có thể dặt giá trị nào cho nó cũng được, miễn sao tạo ra State dựa vào type mang nghĩa dễ hiểu
        },
    ]


    /*-------------------------------------------------------------------------------------------------------------------
    1. spacing là khoảng cách giữa các card trong component 
    2. sm={4} là ở trên màn hình small trở lên chia làm 3 column, 4*3=12
    3. xs={12} là ở màn hình điện thoại sẽ chia làm 3 hàng, với mỗi hàng kích thước 12 chiếm toàn bộ màn hình điện thoại
    */
    return <Grid container spacing={3}>
            {
                summary.map((item)=> 
                    <Grid item sm={4} xs={12} key={item.type}>
                        <Highlightcart  titleProps={item.title} countProps={item.count} typeProps={item.type}/>
                    </Grid>
                )
            }
           </Grid>
}

export default Highlight;
