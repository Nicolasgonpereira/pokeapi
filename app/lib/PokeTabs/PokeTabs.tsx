'use client'

//imports
import {Box} from '@mui/material';
import { useState } from 'react';
import {Button} from '@mui/material';
import PokeComponentAbout from './Components/PokeComponentAbout';
import PokeComponentStats from './Components/PokeComponentStats';


export default function PokeTabs({pokemon}:any){
    const tabs =[
        {
            label:'About',
            component:<PokeComponentAbout pokemon={pokemon}/>
        },
        {
            label:'Stats',
            component:<PokeComponentStats pokemon={pokemon}/>
        },
        {
            label:'Evolution',
            component:'none'
        }
    ];

    const [tabSelected, isTabSelected] = useState('Stats');
    
    return (
        <Box>
            {tabs.map((inter:any)=>(
                    <Button key={'tabButton'+inter.label} variant='text' sx={{color:'black', backgroundColor:inter.label===tabSelected?'rgba(211, 211, 211, 0.5)':'transparent'}} onClick={()=>isTabSelected(inter.label)}>{inter.label}</Button>
            ))}
            {tabs.map(inter=>(
                <Box key={'tabComponent'+inter.label}>{inter.label===tabSelected?inter.component:null}</Box>))}
        </Box>
    );
};