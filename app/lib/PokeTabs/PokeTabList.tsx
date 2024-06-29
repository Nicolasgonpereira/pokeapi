'use client'

import {Box, Button} from '@mui/material';


export default function PokeTabList({tabs}:any){
    
    return (
        <Box>
            {tabs.map((inter:any)=>(
                    <Button key={inter.label} variant='text' sx={{color:'black'}}>{inter.label}</Button>
            ))}
        </Box>
    );
};