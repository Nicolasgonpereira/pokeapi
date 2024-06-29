
import {Box, Modal} from '@mui/material';
import Image from 'next/image';
import PokeTabs from './lib/PokeTabs/PokeTabs';
import { useEffect, useState } from 'react';
import { fetchSpeciesInfo } from './lib/data';

export default function PokeDetails({pokeColors,pokemon,onClose,open,selectedPokemon}:{pokemon:any,onClose:any,open:any,selectedPokemon:any,pokeColors:any[]}) {

    const [pokeSpeciesInfo,setPokeSpeciesInfo] = useState<any>(null);
    
    function fristLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };
    
    async function fetchData() {
        try {
            const response = await fetchSpeciesInfo(pokemon);
            setPokeSpeciesInfo(response);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    useEffect(() => {
        if(selectedPokemon) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon]);



    const isMobile=window.innerWidth<=600;

    return(
        <>
            {selectedPokemon ? (
                <Modal
                    open={open}
                    onClose={onClose}>
                    <Box sx={{width:(isMobile?'70%':'70%'),height:(isMobile?'80%':'80%'),boxShadow:20, backgroundColor:pokeColors[pokemon.types[0].type.name],borderRadius:'20px',textAlign:'center',outline:'none',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)','@media (orientation: landscape)': {overflowY:'auto',width: '50%',height:'80%'},}}>
                        <Image src={pokemon.sprites.other.dream_world.front_default?pokemon.sprites.other.dream_world.front_default:(pokemon.sprites.other.home.front_default?pokemon.sprites.other.home.front_default:(pokemon.sprites.front_default?pokemon.sprites.front_default:'https://static.vecteezy.com/ti/vetor-gratis/p1/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg'))} alt={pokemon.name} width={200} height={200} style={{marginTop:'20px', left:'50%',maxWidth:'10rem',width:'100%',maxHeight:'10rem',height:'100%'}}/>
                        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'2px'}}>{fristLetterBig(pokemon.name)}</h1>
                        <PokeTabs
                        pokemon={pokemon}
                        pokeSpeciesInfo={pokeSpeciesInfo}/>
                    </Box>
                </Modal>):null}
        </>
    )
    }