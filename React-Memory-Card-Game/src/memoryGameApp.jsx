import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import Pokemons from "./fetchPokemons"

export default function MemoryGameApp() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        )
        const pokemonsInfo = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url)
            return detailResponse.data
          })
        )
        setPokemons(pokemonsInfo)
      } catch (error) {
        console.error("Error fetching the pokemons", error)
      }
    }

    fetchPokemons()
  }, [])

  useEffect(() => {
    console.log(pokemons)
  }, [pokemons])

  function handleClickedCard(e) {
    const clickedCard = e.target.closest(".card")
    if (!clickedCard) return
    clickedCard.remove()
  }

  return (
    <>
      <div className="header"></div>
      <div className="cardsGrid">
        {pokemons.map((pokemon) => {
          return (
            <div
              className="card"
              id="card1"
              key={pokemon.id}
              onClick={handleClickedCard}
            >
              {pokemon.name}
              <img src={pokemon.sprites.back_default} alt="" />
            </div>
          )
        })}
      </div>
    </>
  )
}
