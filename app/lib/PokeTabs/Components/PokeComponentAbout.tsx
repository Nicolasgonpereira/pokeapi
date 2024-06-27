
import {Box} from '@mui/material';

export default function PokeComponentAbout({pokemon}:any){
    function fristLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };

    return (
        <Box>
            <p style={{marginTop:'5px'}}><span style={{fontWeight:'bold'}}>Experiência básica:</span> {pokemon.base_experience}</p>
            <p><span style={{fontWeight:'bold'}}>Altura:</span> {(pokemon.height/10).toFixed(2)} m</p>
            <p><span style={{fontWeight:'bold'}}>Peso:</span> {(pokemon.weight/10).toFixed(2)} kg</p>
            <p><span style={{fontWeight:'bold'}}>Habilidades</span><br></br>{pokemon.abilities.map((inter:any,index:number)=>(<span key={inter.ability.name}>{fristLetterBig(inter.ability.name)}{index<pokemon.abilities.length-1?', ':''} </span>))}</p>
        </Box>
    )
}