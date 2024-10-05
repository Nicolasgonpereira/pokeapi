'use server'

import { unstable_noStore as noStore } from 'next/cache';
import 'server-only';

import axios from 'axios';

export async function fetchPokemon() {
    noStore();
    try {
        //const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=21');
        return (response.data.results);
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
};

export async function fetchMorePokemon(length:number) {
    noStore();
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${length+21}`);
        return (response.data.results);
    } catch (error) {
        console.error('Erro ao carregar a lista de Pokemon', error);
    }
};

export async function fetchSpeciesInfo(pokemon:any) {
    noStore();
    try {
        const urlEvolutionChain = await axios.get(`${pokemon.species.url}`).then(res=>res.data.evolution_chain.url);
        const response = await axios.get(urlEvolutionChain).then(res=>res.data);
        console.log(response);
        return (response);
    } catch (error) {
        console.error('Erro ao carregar as informações de Pokemon', error);
    }
};


export async function fetchPokemonSearch() {
    noStore();
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        return (response.data.results);
    } catch (error) {
        console.error('Erro ao carregar a lista de Pokemon', error);
    }
};

export async function fetchPokemonCard(url:string) {
    noStore();
    try {
        const response = await axios.get(url);
        return (response.data);
    } catch (error) {
        console.error('Erro ao carregar a lista de Pokemon', error);
    }
};