import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/styles.css"
import MemoryGameApp from "./memoryGameApp.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MemoryGameApp></MemoryGameApp>
  </React.StrictMode>
)
