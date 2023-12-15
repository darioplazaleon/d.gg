"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function HomeSearch() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("las")

  return (
    <div className="w-full flex flex-col space-y-8 items-center">
      <p className="text-4xl font-bold">Ingrese nombre del invocador</p>
      <div className="flex flex-row gap-3">
        <select name="regionHome" id="regionHome" value={region} className="bg-black text-white rounded w-20 text-center" onChange={(e) => setRegion(e.target.value)}>
          <option value="las">LAS</option>
          <option value="lan">LAN</option>
        </select>
        <input
          type="text"
          placeholder="Nombre de invocador"
          className="text-black rounded pl-3 w-5/6 h-[45px]"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button
        onClick={() => router.push(`/invocador/${region}/${username}`)}
        className="bg-white text-black w-2/6 h-[30px] rounded"
      >
        Enviar
      </button>
    </div>
  );
}

export default HomeSearch;
