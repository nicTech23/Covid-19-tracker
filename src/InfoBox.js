import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({tittle, cases, total}) => {
  return (
    <Card>
        <CardContent>
            <Typography className='infoBox__tittle' color="textSecondar" fontSize="12px">{tittle}</Typography>
            
            <Typography className='infoBox__cases' color="green" fontSize="24px">Today: {cases}</Typography>

            <Typography className='infoBox__total' color="textSecondar" fontSize="12px">{total} total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox