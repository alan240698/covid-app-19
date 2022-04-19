import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const Highlight = () => {
    /*
    1. spacing là khoảng cách giữa các card trong component 
    2. sm={4} là ở trên màn hình small trở lên chia làm 3 column, 4*3=12
    3. xs={12} là ở màn hình điện thoại sẽ chia làm 3 hàng, với mỗi hàng kích thước 12 chiếm toàn bộ màn hình điện thoại
    */
    return <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Số ca mắc</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Số ca khỏi</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            
            </Grid>
            <Grid item sm={4} xs={12}>
                <Card>
                    <CardContent>
                        <Typography component="p" variant="body2">Số ca tử vong</Typography>
                        <Typography component="span" variant="body2">3000</Typography>
                    </CardContent>
                </Card>
            </Grid>
           </Grid>
}

export default Highlight;
