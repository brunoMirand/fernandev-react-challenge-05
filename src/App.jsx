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
      setList(sortedList);
    });
  }, []);

  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => (<Pokemon key={item.name} data={item} />))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetalis] = useState(null);

  useEffect(() => {
    axios.get(data.url).then(response => setDetalis(response.data));
  }, []);

  if (!details) {
    return <div>Carregando...</div>
  }

  return (
    <section style={{display: 'flex', alignItems: 'center'}}>
      <img src={details.sprites.front_default} style={{ width: 80, marginRight: 20}} />
      <div>
        <strong>Name:</strong> {details.name} - <strong>Experience:</strong> {details.base_experience}</div>
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
