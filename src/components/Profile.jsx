import Image from "next/image";
function Profile({ dataProfile, region, rankedInfo }) {

  const rankedFlex = rankedInfo[1]
  const ranked5v5 = rankedInfo[0]

  const regMayus = region.toUpperCase()

  const rank5v5 = ranked5v5.tier
  const rankFlex = rankedFlex.tier

  function calculateWinrate(wins, losses) {
    let totalGames = wins + losses
    let winrate = (wins / totalGames) * 100
    return Math.ceil(winrate)
  }

  const winrate = calculateWinrate(ranked5v5.wins, ranked5v5.losses)
  const winrateFlex = calculateWinrate(rankedFlex.wins, rankedFlex.losses)

  return (
    <div className="w-11/12 h-[320px] bg-slate-600 rounded-xl flex flex-col gap-3 mt-4 xl:w-2/6 xl:mt-0">
      <div className="relative flex flex-row justify-center items-center space-x-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl w-full h-3/6">
        <div className="relative">
          <div>
            <Image
              src={`https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${dataProfile.profileIconId}.png`}
              alt="icono invocador"
              width={50}
              height={50}
              className="w-20 h-20 rounded-xl"
            />
            <span className="bg-slate-700 w-12 text-center rounded-xl absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 z-10">
              {dataProfile.summonerLevel}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <p className="font-bold text-2xl">{dataProfile.name}</p>
          <p className="text-xl opacity-70">#{regMayus}</p>
        </div>
      </div>
      <div className="h-3/6 w-full">
        <div className="flex flex-row justify-center gap-10">
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <p>Ranked solo</p>
            <Image src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-emblem/emblem-${rank5v5.toLowerCase()}.png`} alt="Ranked solo league" width={100} height={100}/>
            <p>{ranked5v5.tier} {ranked5v5.rank}</p>
            <span>{ranked5v5.leaguePoints} LP</span>
            <span className="opacity-70">{ranked5v5.wins}W {ranked5v5.losses}L {winrate}%</span>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <p>Ranked flex</p>
            <Image src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-emblem/emblem-${rankFlex.toLowerCase()}.png`} alt="Ranked solo league" width={100} height={100}/>
            <p>{rankedFlex.tier} {rankedFlex.rank}</p>
            <span>{rankedFlex.leaguePoints} LP</span>
            <span className="opacity-70">{rankedFlex.wins}W {rankedFlex.losses}L {winrateFlex}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
