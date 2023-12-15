'use client'

import MenuMobileIcon from "@/icons/MenuMobileIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Navbar() {

  const router = useRouter()

  const [region, setRegion] = useState("las")
  const [summoner, setSummoner] = useState("")

  const handleRegion = (e) => {
    setRegion(e.target.value)
    console.log(e.target.value)
  }
  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-24 flex flex-row items-center justify-center">
      <nav className="w-11/12 flex flex-row items-center justify-center gap-6 mx-2">
        <MenuMobileIcon/>
        <div className="w-full flex flex-row justify-center items-center gap-1 ml-2">
            <select name="region" id="region" value={region} className="h-10 w-18 rounded bg-blue-500 pl-2 text-white" onChange={(e) => handleRegion(e)}>
                <option value="las">LAS</option>
                <option value="lan">LAN</option>
            </select>
            <input type="text" name="summoner" id="summoner" className="h-10 w-3/6 pl-2 rounded text-black" onChange={(e) => setSummoner(e.target.value)}/>
            <button className="h-10 w-5 rounded bg-white text-black" onClick={() => router.push(`/invocador/${region}/${summoner}`)}>Ir</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
