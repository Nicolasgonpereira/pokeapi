'use server'

import { unstable_noStore as noStore } from 'next/cache';
import 'server-only'

import axios from 'axios'

export async function fetchPokemon() {
    noStore();
    try {
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