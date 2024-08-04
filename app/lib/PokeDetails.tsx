
import {Box, Modal} from '@mui/material';
import Image from 'next/image';
import PokeTabs from './PokeTabs/PokeTabs';
import { useEffect, useState } from 'react';
import { fetchSpeciesInfo } from './data';

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

    return(
        <>
            {selectedPokemon ? (
                <Modal
                    open={open}
                    onClose={onClose}>
                    <Box sx={{minWidth:'60%',maxWidth:'90%',minHeight:'40%',maxHeight:'90%',boxShadow:20, backgroundColor:pokeColors[pokemon.types[0].type.name],borderRadius:'20px',textAlign:'center',outline:'none',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',overflowY:(window.innerHeight<=600?'overlay':'none')}}>
                        <Image src={pokemon.sprites.other.dream_world.front_default?pokemon.sprites.other.dream_world.front_default:(pokemon.sprites.other.home.front_default?pokemon.sprites.other.home.front_default:(pokemon.sprites.front_default?pokemon.sprites.front_default:'https://static.vecteezy.com/ti/vetor-gratis/p1/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg'))} alt={pokemon.name} width={200} height={200} style={{marginTop:'20px', left:'50%',maxWidth:'8rem',width:'100%',maxHeight:'8rem',height:'100%'}}/>
                        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'2px'}}>{fristLetterBig(pokemon.name)}</h1>
                        <PokeTabs
                        pokemon={pokemon}
                        pokeSpeciesInfo={pokeSpeciesInfo}/>
                    </Box>
                </Modal>):null}
        </>
    )
    }