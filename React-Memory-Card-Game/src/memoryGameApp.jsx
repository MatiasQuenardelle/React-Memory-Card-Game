import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import Pokemons from "./fetchPokemons"

export default function MemoryGameApp() {
  const [pokemons, setPokemons] = useState([])
  const [clickedPokemons, setClickedPokemons] = useState(new Set())
  const [score, setScore] = useState(0)
  const [highestScore, setHighestScore] = useState(0)

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

  function handleMouseMove(e) {
    const card = e.currentTarget

    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    const rotateX = (25 * (y - height / 2)) / height
    const rotateY = (25 * (x - width / 2)) / width

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function handleMouseLeave(e) {
    const card = e.currentTarget

    card.style.transform = "none"
  }

  function handleStart() {
    setPokemons(shufflePokemons([...pokemons]))
  }

  const shufflePokemons = (array) => {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const handleCardClick = (e) => {
    const clickedCard = e.target.closest(".card")
    if (!clickedCard) return
    const pokemonId = clickedCard.getAttribute("data-pokemon-id")
    if (clickedPokemons.has(pokemonId)) {
      alert("You clicked the same pokemon twice ! Game Over")
      if (score > highestScore) {
        setHighestScore(score)
      }
      setScore(0)
      setClickedPokemons(new Set())
      setPokemons(shufflePokemons([...pokemons]))
    } else {
      setClickedPokemons(new Set(clickedPokemons.add(pokemonId)))
      setScore((prevScore) => prevScore + 1)
      setPokemons(shufflePokemons([...pokemons]))
    }
  }

  return (
    <>
      <div className="header">
        <h2>Pokemon Memory Game</h2>
        <button type="button" className="start" onClick={handleStart}>
          START
        </button>
        <div className="score">
          <p>Score:</p>
          {score}
        </div>
        <div className="highestScore">
          <p>Highest Score:</p>
          {highestScore}
        </div>
      </div>
      <div className="cardsGrid">
        {pokemons.map((pokemon) => {
          return (
            <div
              className="card"
              key={pokemon.id}
              onClick={handleCardClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-pokemon-id={pokemon.id}
            >
              <h4>{pokemon.name.toUpperCase()}</h4>
              <img src={pokemon.sprites.front_default} alt="" />
            </div>
          )
        })}
      </div>
    </>
  )
}
