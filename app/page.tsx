//page.tsx
'use client'

import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { fetchMorePokemon, fetchPokemon, fetchPokemonSearch } from './lib/data';
import PokemonCard from './lib/PokemonCard';

interface PokemonList {
  name:string;
  url:string;
}

export default function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
    const [loading, setLoading] = useState(false);
    const [listComplete, setListComplete] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [allPokemonList,setAllPokemonList] = useState<any[]>();

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const res = await fetchPokemon();
            const resallPokemonList = await fetchPokemonSearch();
            setAllPokemonList(resallPokemonList);
            setPokemonList(res);
        };
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
        if(pokemonList.length>=1288){
            setListComplete(true);
        } else {
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
        }}
    }, [pokemonList,loading,loadMorePokemon]);

    return (
        <section>
        <p style={{color:'lightgray',fontSize:'1rem', fontWeight:'bold',display:'flex',position:'absolute',top:'.25rem',margin:'0px'}}>Powered by: Nicolas Gonçalves Pereira</p>
        <div className="container" style={{textAlign:'center',padding:'0px'}}>
            <Image src='/pokedexlogo.png' alt='Pokedex Logo' width={250} height={80} priority style={{marginBottom:'10px'}}/>
            <div style={{marginBottom:'1rem'}}>
                <TextField variant='outlined' size='small' placeholder='search' sx={{maxWidth:'10rem'}} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="pokemon-grid">
                {!!(search && allPokemonList)? (allPokemonList.filter((pokemon:any)=>pokemon.name.toLowerCase().includes(search.toLowerCase())).map((pokemon:any) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.name} />
                ))) : (pokemonList.map((pokemon:any) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.name} />
                )))}
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-modal">
                            <p>Loading more Pokémon...</p>
                        </div>
                    </div>
                )}
            </div>
            {!listComplete && (
                <div className="load-more-button" style={{marginTop:'10px'}}>
                    <Button variant="contained" color='primary' onClick={loadMorePokemon}>Load more</Button>
                </div>
            )}
        </div>
        </section>
    );
}
