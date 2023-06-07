import { useState } from "react";
import FilterCodes from "./FilterCodes";
import MatchList from "./MatchList";
import "./App.css"

export default function App() {
  const [renderFilter, setRenderFilter] = useState<boolean>(false);
  const [renderCoincidences, setRenderCoincidences] = useState<boolean>(false);

  const handleFilterEmails = () => {
    setRenderCoincidences(false)
    setRenderFilter(true)
  }

  const handleCoincidences = () => {
    setRenderFilter(false)
    setRenderCoincidences(true)
  }


  return (
    <div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"25px"}}>
        <button className={renderFilter ?"button" : ""} onClick={handleFilterEmails}>Filtrar emails</button>
        <button className={renderCoincidences ?"button" : ""} onClick={handleCoincidences}>Encontrar coincidencias</button>
      </div>

      {
        renderFilter && <FilterCodes/>
      }

      {
        renderCoincidences && <MatchList/>
      }
    </div>
  );
}