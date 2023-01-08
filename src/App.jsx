import { useState, useEffect } from 'react';
import axios from 'axios';

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint.
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then((response) => {

      const sortedList = sortAlphabetically(response.data.results);

      const promisesPokemons = sortedList.map(item => {
        return axios.get(item.url);
      })

      Promise.all(promisesPokemons).then(response => setList(response));
    });
  }, []);

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => (<Pokemon key={item.data.name} data={item.data} />))}
    </>
  );
}

const Pokemon = ({ data }) => {
  return (
    <section style={{ display: 'flex', alignItems: 'center' }}>
      <img src={data.sprites.front_default} style={{ width: 80, marginRight: 20 }} />
      <div>
        <strong>Name:</strong> {data.name} - <strong>Experience:</strong> {data.base_experience}</div>
    </section>
  )
}


const sortAlphabetically = (results) => {
  const sortedList = [...results];
  sortedList.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })

  return sortedList;
}

export default App;
