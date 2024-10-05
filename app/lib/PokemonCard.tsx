//PokemonCard.tsx
'use client'

import { Box } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PokeDetails from './PokeDetails';

//interface Pokemon {name:string;url:string}

export default function PokemonCard (pokemon:any) {
    pokemon=pokemon.pokemon;
    const [pokemonData, setPokemonData] = useState<any>(null);
    const [selectedPokemon,setSelectedPokemon] = useState<any>(null);
    const pokeTypes:any={
        normal:'#a43000',
        fighting:'#eca6a6',
        flying:'#fae0e0',
        poison:'#e9c2d5',
        ground:'#cc7112',
        rock:'#bab2b2',
        bug:'#35910d',
        ghost:'#a093c5',
        steel:'#eeeeee',
        fire:'#f7685d',
        water:'#4399da',
        grass:'#8fce00',
        electric:'#fffa2a',
        psychic:'#e4e0ed',
        ice:'#eaf5ff',
        dragon:'#ffe8a4',
        dark:'#716d6d',
        fairy:'#ff92da',
    }

    function handleOpenPokemonCard(pokemon:any) {
        setSelectedPokemon(pokemon);
    };

    function handleClosePokemonCard() {
        setSelectedPokemon(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(pokemon.url);
                setPokemonData(response.data);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchData();
    }, [pokemon]);

    return (
        <>
        <div onClick={()=>handleOpenPokemonCard(pokemon)}>
            {pokemonData ? (
                <Box className="card" display='flex' flexDirection='row' sx={{justifyContent:'space-between', backgroundColor:pokeTypes[pokemonData.types[0].type.name]}}>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{width:'50%'}}>
                        <h3>{`${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`}</h3>
                        <Box display='flex' flexDirection='row' className="types">
                            {pokemonData.types.map((type:any, index:any) => (
                                <Box key={index} className="type" sx={{backgroundColor:pokeTypes[type.type.name],filter:'brightness(1.1)'}}>{type.type.name.charAt(0).toUpperCase()}{type.type.name.slice(1)}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{width:'50%', position:'relative'}}>
                        <Box sx={{position:'absolute',right:-5,top:-7}}>
                            #{pokemonData.id.toString().padStart(3,'0')}
                        </Box>
                        <Box sx={{position:'relative',width:'6rem', height:'6rem'}}>
                            <Image src='/pokebola.webp' alt='pokebola' width={100} height={100} style={{opacity:0.2,width:'6rem',height:'6rem'}}/>
                            <Image src={pokemonData.sprites.front_default?pokemonData.sprites.front_default:(pokemonData.sprites.other.home.front_default?pokemonData.sprites.other.home.front_default:'')} alt={pokemonData.name} width={100} height={100} style={{position:'absolute', left:'50%',transform:'translate(-50%)',width:'6rem',height:'6rem'}}/>
                        </Box>
                        
                    </Box>
                </Box>
            ) : (
                <p>Loading...</p>
            )}
        </div>
            <PokeDetails
                pokeColors={pokeTypes}
                selectedPokemon={selectedPokemon}
                open={handleOpenPokemonCard}
                onClose={handleClosePokemonCard}
                pokemon={pokemonData}/>
        </>
    );
};