//page.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import Image from 'next/image';
import {Button} from '@mui/material';
import { fetchPokemon,fetchMorePokemon } from './lib/data';

interface Pokemon {
  name:string;
  url:string;
}

export default function Home() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const res = await fetchPokemon();
        setPokemonList(res)}
        fetchData();
        setLoading(false);
    }, []);

    const loadMorePokemon = useCallback(async () => {
        setLoading(true);
        const response = await fetchMorePokemon(pokemonList.length);
        setPokemonList(response);
        setLoading(false);
    },[pokemonList]);

    useEffect(() => {
        if(window.innerWidth >= 768){
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement || {};
                if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
                    loadMorePokemon();
                    setLoading(true);
                }
            }

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [pokemonList,loading,loadMorePokemon]);

    return (
        <>
        <p style={{color:'lightgray', fontWeight:'bold'}}>Powered by: Nicolas Gonçalves Pereira</p>
        <div className="container" style={{textAlign:'center'}}>
            <Image src='/pokedexlogo.png' alt='Pokedex Logo' width={250} height={80} priority style={{marginBottom:'10px'}}/>
            <div className="pokemon-grid">
                {pokemonList.map((pokemon:any) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.name} />
                ))}
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-modal">
                            <p>Loading more Pokémon...</p>
                        </div>
                    </div>
                )}
            </div>
            {!loading && (
                <div className="load-more-button" style={{marginTop:'10px'}}>
                    <Button variant="contained" color='primary' onClick={loadMorePokemon}>Load more</Button>
                </div>
            )}
        </div>
        </>
    );
}
