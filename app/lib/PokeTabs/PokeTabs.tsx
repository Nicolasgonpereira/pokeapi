'use client'

//imports
import {Box} from '@mui/material';
import { useState } from 'react';
import {Button} from '@mui/material';
import PokeComponentAbout from './Components/PokeComponentAbout';
import PokeComponentStats from './Components/PokeComponentStats';
import PokeComponentEvolution from './Components/PokeComponentEvolution';



export default function PokeTabs({pokemon,pokeSpeciesInfo}:any){

    const [tabSelected, setTabSelected] = useState('Stats');
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
            component:<PokeComponentEvolution pokemon={pokemon} pokeSpeciesInfo={pokeSpeciesInfo}/>
        }
    ];


    
    return (
        <Box>
            {tabs.map((inter:any)=>(
                    <Button key={'tabButton'+inter.label} variant='text' sx={{color:'black', backgroundColor:tabSelected===inter.label?'rgba(211, 211, 211, 0.5)':'transparent','&:hover':{backgroundColor:tabSelected===inter.label?'rgba(211, 211, 211, 0.5)':'transparent'}}} onClick={()=>setTabSelected(inter.label)}>{inter.label}</Button>
            ))}
            {tabs.map(inter=>(
                <Box key={'tabComponent'+inter.label}>{inter.label===tabSelected?inter.component:null}</Box>))}
        </Box>
    );
};