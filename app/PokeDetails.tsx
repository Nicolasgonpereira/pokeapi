
import {Box, Modal} from '@mui/material';
import Image from 'next/image';
import PokeTabs from './lib/PokeTabs/PokeTabs';

export default function PokeDetails({pokeColors,pokemon,onClose,open,selectedPokemon}:{pokemon:any,onClose:any,open:any,selectedPokemon:any,pokeColors:any[]}) {
    function fristLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };
    
    const isMobile=window.innerWidth<=600?true:false;

    return(
        <>
            {selectedPokemon ? (
                <Modal
                    open={open}
                    onClose={onClose}>
                    <Box sx={{width:isMobile?'80%':'40%',minHeight:'60%',boxShadow:20, backgroundColor:pokeColors[pokemon.types[0].type.name],borderRadius:'20px',textAlign:'center',outline:'none',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)','@media (orientation: landscape)': {width: '60%',height:'80%'},}}>
                        <Image src={pokemon.sprites.other.dream_world.front_default?pokemon.sprites.other.dream_world.front_default:(pokemon.sprites.other.home.front_default?pokemon.sprites.other.home.front_default:(pokemon.sprites.front_default?pokemon.sprites.front_default:'https://static.vecteezy.com/ti/vetor-gratis/p1/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg'))} alt={pokemon.name} width={200} height={200} style={{marginTop:'20px', left:'50%'}}/>
                        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'2px'}}>{fristLetterBig(pokemon.name)}</h1>
                        <PokeTabs
                        pokemon={pokemon}/>
                    </Box>
                </Modal>):null}
        </>
    )
    }