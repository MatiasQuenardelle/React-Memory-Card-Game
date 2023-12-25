import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Pokemons() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/ditto"
        )
        setPokemon(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching the pokemons", error)
      }
    }
    fetchPokemons()
  }, [])
  return (
    <div>
      {
        <img
          key={pokemon.id}
          src={pokemon.sprites.back_default}
          alt={pokemon.name}
        ></img>
      }
    </div>
  )
}
