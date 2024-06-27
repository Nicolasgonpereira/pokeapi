'use client'

import {Box, Button} from '@mui/material';
import { useState } from 'react';


export default function PokeTabList({tabs}:any){
    const [tabSelected, isTabSelected] = useState(null);
    
    return (
        <Box>
            {tabs.map((inter:any)=>(
                    <Button key={inter.label} variant='text' sx={{color:'black'}}>{inter.label}</Button>
            ))}
        </Box>
    );
};