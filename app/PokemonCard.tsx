//PokemonCard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {Box} from '@mui/material'
import PokeDetails from './PokeDetails';

//interface Pokemon {name:string;url:string}

export default function PokemonCard (pokemon:any) {
    pokemon=pokemon.pokemon;
    const [pokemonData, setPokemonData] = useState<any>(null);
    const [selectedPokemon,setSelectedPokemon] = useState<any>(null);
    const pokeTypes:any={
        normal:{card:'#a43000',type:'#a43737'},
        fighting:{card:'#eca6a6',type:'#ea9999'},
        flying:{card:'#fae0e0',type:'#f4cccc'},
        poison:{card:'#e9c2d5',type:'#d5a6bd'},
        ground:{card:'#cc7112',type:'#b45f06'},
        rock:{card:'#bab2b2',type:'#999999'},
        bug:{card:'#35910d',type:'#38761d'},
        ghost:{card:'#a093c5',type:'#8e7cc3'},
        steel:{card:'#eeeeee',type:'#d4cdcd'},
        fire:{card:'#f7685d',type:'#f44336'},
        water:{card:'#4399da',type:'#2986cc'},
        grass:{card:'#8fce00',type:'#7baa11'},
        electric:{card:'#fffa2a',type:'#f4ee00'},
        psychic:{card:'#e4e0ed',type:'#d9d2e9'},
        ice:{card:'#eaf5ff',type:'#cfe2f3'},
        dragon:{card:'#ffe8a4',type:'#ffd966'},
        dark:{card:'#716d6d',type:'#444444'},
        fairy:{card:'#ff92da',type:'#ff71ce'},
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
                <Box className="card" display='flex' flexDirection='row' sx={{justifyContent:'space-between', backgroundColor:pokeTypes[pokemonData.types[0].type.name].card}}>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{width:'50%'}}>
                        <h3>{`${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`}</h3>
                        <Box display='flex' flexDirection='row' className="types">
                            {pokemonData.types.map((type:any, index:any) => (
                                <Box key={index} className="type" sx={{backgroundColor:pokeTypes[type.type.name].type}}>{type.type.name}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{width:'50%', position:'relative'}}>
                        <Box sx={{position:'absolute',right:-5,top:-7}}>
                            #{pokemonData.id.toString().padStart(3,'0')}
                        </Box>
                        <Box sx={{position:'relative',width:'100px', height:'100px'}}>
                            <Image src='/pokebola.webp' alt='pokebola' width={100} height={100} style={{opacity:0.2}}/>
                            <Image src={pokemonData.sprites.front_default?pokemonData.sprites.front_default:(pokemonData.sprites.other.home.front_default?pokemonData.sprites.other.home.front_default:'')} alt={pokemonData.name} width={100} height={100} style={{position:'absolute', left:'50%',transform:'translate(-50%)'}}/>
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