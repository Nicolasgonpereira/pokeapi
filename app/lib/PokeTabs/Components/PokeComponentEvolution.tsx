'use client'

import {Box} from '@mui/material';
import { fetchSpeciesInfo } from '../../data';
import { useEffect, useState } from 'react';


export default function PokeComponentEvolution({pokemon}:any){

    const [pokeSpeciesInfo,setPokeSpeciesInfo] = useState<any>(null);

    function firstLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };

    function findSpecies(obj:any){
        let Evolves:any[]=[];
        function search(obj:any,depth:number=0){
            if(typeof obj==='object') {
                for (let inter in obj) {
                    if (inter==="species" && typeof obj[inter]==='object' && "name" in obj[inter]){
                        Evolves.push({species:obj[inter],depth});
                    } else if (typeof obj[inter] === 'object') {
                        search(obj[inter],depth+1);
                    }
                }
            }
        }
        search(obj);
        return (Evolves);
    };

    function checkStageEvolveChain(evolves:any[],pokemon:any){//Verificar
        const currentDepth = evolves.find(e=>e.species.name===pokemon.name);
        if(currentDepth){
            const evolvesFiltered= evolves.filter(e=>e.depth>currentDepth.depth);
            return evolvesFiltered;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchSpeciesInfo(pokemon);
                setPokeSpeciesInfo(response);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const foundEvolves = findSpecies(pokeSpeciesInfo);
    const evolves=(checkStageEvolveChain(foundEvolves,pokemon))?.reverse();

    if (!evolves) {
        return <Box>Loading...</Box>;}

    return (
        <Box sx={{paddingBottom:'1rem'}}>
            {(evolves.length>0?evolves.map((evolve: any, index: number) => (
                <Box key={index} sx={{marginTop:'16px'}}>
                    {firstLetterBig(evolve.species.name)}
                </Box>
            )):<Box>This Pokémon has reached its final evolution stage.</Box>)}
        </Box>
    )
}