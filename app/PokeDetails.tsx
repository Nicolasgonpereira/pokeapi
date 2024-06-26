
import {Box, Modal} from '@mui/material';
import Image from 'next/image';

export default function PokeDetails({pokeColors,pokemon,onClose,open,selectedPokemon}:{pokemon:any,onClose:any,open:any,selectedPokemon:any,pokeColors:any[]}) {

    return(
        <>
            {selectedPokemon ? (
                <Modal
                    open={open}
                    onClose={onClose}>
                    <Box sx={{width:'40%',height:'70%',boxShadow:20, backgroundColor:pokeColors[pokemon.types[0].type.name].card,top:'15vh',left:'30vw',transform:'translate(30vw,15vh)',borderRadius:'20px',textAlign:'center',outline:'none'}}>
                        <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} width={200} height={200} style={{marginTop:'20px', left:'50%'}}/>
                        <p>${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</p>
                        <p>Experiência básica: {pokemon.base_experience}</p>
                        <p>{pokemon.base_experience}</p>
                        <p>{pokemon.weight}</p>
                        <p>Habilidades<br></br>{pokemon.abilities.map((inter:any,index:number)=>(<span key={inter.ability.name}>{inter.ability.name}{index<pokemon.abilities.length-1?', ':''} </span>))}</p>
                    </Box>
                </Modal>):null}
        </>
    )
    }