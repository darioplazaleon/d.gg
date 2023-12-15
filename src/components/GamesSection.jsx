import {getItemsData, getMatchesIdsAndFetchMatches, getPerksData } from "@/app/lib/data";
import CardGame from "./CardGame";

async function GamesSection({ summoner }) {
  const matches = await getMatchesIdsAndFetchMatches(summoner)
  const perksData = await getPerksData()
  const itemsData = await getItemsData()

  return (
    <div className="h-full w-11/12 flex flex-col gap-2 xl:w-3/6">
      <div className="flex w-full items-center justify-center">
        <h1 className="font-bold text-lg bg-slate-600 text-center w-full rounded xl:w-11/12">GAMES</h1>
      </div>
      <div className="w-full flex flex-col gap-3 xl:justify-center xl:items-center">
        {matches.map((match, index) => (
            <CardGame matchInfo={match} summonerPuuid={summoner} key={index} perksInfo={perksData} itemsInfo={itemsData}/>
        ))}
      </div>
    </div>
  );
}

export default GamesSection;
