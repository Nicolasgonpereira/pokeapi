
import {Box, Modal} from '@mui/material';
import Image from 'next/image';
import { About, Evolution, Stats} from './lib/PokeTabs';

export default function PokeDetails({pokeColors,pokemon,onClose,open,selectedPokemon}:{pokemon:any,onClose:any,open:any,selectedPokemon:any,pokeColors:any[]}) {
    function fristLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };

    const tabs =[
        {
            label:'About',
            component:<About/>
        },
        {
            label:'Stats',
            component:<Stats/>
        },
        {
            label:'Evolution',
            component:<Evolution/>
        }
    ]

    return(
        <>
            {selectedPokemon ? (
                <Modal
                    open={open}
                    onClose={onClose}>
                    <Box sx={{width:'40%',height:'70%',boxShadow:20, backgroundColor:pokeColors[pokemon.types[0].type.name].card,top:'15vh',left:'30vw',transform:'translate(30vw,15vh)',borderRadius:'20px',textAlign:'center',outline:'none'}}>
                        <Image src={pokemon.sprites.other.dream_world.front_default?pokemon.sprites.other.dream_world.front_default:(pokemon.sprites.other.home.front_default?pokemon.sprites.other.home.front_default:(pokemon.sprites.front_default?pokemon.sprites.front_default:'https://static.vecteezy.com/ti/vetor-gratis/p1/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg'))} alt={pokemon.name} width={200} height={200} style={{marginTop:'20px', left:'50%'}}/>
                        <h1 style={{fontSize:'24px',fontWeight:'bold',marginBottom:'2px'}}>{fristLetterBig(pokemon.name)}</h1>
                        <p style={{marginTop:'5px'}}><span style={{fontWeight:'bold'}}>Experiência básica:</span> {pokemon.base_experience}</p>
                        <p><span style={{fontWeight:'bold'}}>Altura:</span> {(pokemon.height/10).toFixed(2)} m</p>
                        <p><span style={{fontWeight:'bold'}}>Peso:</span> {(pokemon.weight/10).toFixed(2)} kg</p>
                        <p><span style={{fontWeight:'bold'}}>Habilidades</span><br></br>{pokemon.abilities.map((inter:any,index:number)=>(<span key={inter.ability.name}>{fristLetterBig(inter.ability.name)}{index<pokemon.abilities.length-1?', ':''} </span>))}</p>
                        <h3>Stats:</h3>
                        {pokemon.stats.map((inter:any,index:any)=>(
                            <Box key={index}>
                            <p><span style={{fontWeight:'bold'}}>{fristLetterBig(inter.stat.name)}</span>: {inter.base_stat}</p>
                            </Box>
                        ))}
                    </Box>
                </Modal>):null}
        </>
    )
    }