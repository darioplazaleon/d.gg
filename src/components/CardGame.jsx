"use client";

import Image from "next/image";
import SummonerInventoryCard from "./SummonerInventoryCard";
import { useState } from "react";

function CardGame({ matchInfo, summonerPuuid, perksInfo, itemsInfo }) {
  const matchData = matchInfo.info;
  const participants = matchData.participants;
  const summonerFind = participants.find(
    (participant) => participant.puuid === summonerPuuid
  );

  function gameDuration(duration) {
    let gameDuration = duration / 60;
    return Math.round(gameDuration);
  }

  const gameTime = gameDuration(matchData.gameDuration);

  function gameStatus(status, duration) {
    if (duration <= 5) {
      return "Remake";
    } else if (status) {
      return "Win";
    } else if (!status) {
      return "Loose";
    }
  }

  const statusGame = gameStatus(summonerFind.win, gameTime);

  const matchsTypeIds = {
    420: "Ranked 5v5",
    440: "Ranked Flex 5v5",
    900: "ARAM",
  };

  const matchType = matchsTypeIds[matchData.queueId] || "Normal";

  function gameEndTime(gameEndTimestampProp) {
    const now = Date.now();
    const timeDifference = now - gameEndTimestampProp;
    const timeDifferenceMins = Math.floor(timeDifference / (1000 * 60));
    const timeDifferenceHours = Math.floor(timeDifference / (1000 * 60 * 60));
    const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
    const timeDifferenceMonths = Math.floor(timeDifferenceDays / 30);

    if (timeDifferenceMonths >= 1) {
      return `Hace ${timeDifferenceMonths} m`;
    } else if (timeDifferenceDays >= 1) {
      return `Hace ${timeDifferenceDays} d`;
    } else if (timeDifferenceHours >= 1) {
      return `Hace ${timeDifferenceHours} h`;
    } else {
      return `Hace ${timeDifferenceMins} min`;
    }
  }

  const timeGameEnd = gameEndTime(matchData.gameEndTimestamp);

  const summonerSpells = {
    1: "summoner_boost",
    3: "summoner_exhaust",
    4: "summoner_flash",
    5: "summoner_Backtrack",
    6: "summoner_haste",
    7: "summoner_heal",
    11: "summoner_smite",
    12: "summoner_teleport",
    13: "summonerMana",
    14: "summonerIgnite",
    21: "summonerBarrier",
    30: "Benevolence_Of_King_Poro_Icon",
    31: "Trailblazer_Poro_Icon",
    32: "summoner_Mark",
  };

  const perksSub = {
    8400: "/v1/perk-images/styles/7204_resolve.png",
    8100: "/v1/perk-images/styles/7200_domination.png",
    8000: "/v1/perk-images/styles/7201_precision.png",
    8200: "/v1/perk-images/styles/7202_sorcery.png",
    8300: "/v1/perk-images/styles/7203_whimsy.png",
  };

  const spell1 = summonerSpells[summonerFind.summoner1Id] || "Spell1";
  const spell2 = summonerSpells[summonerFind.summoner2Id] || "Speel2";

  const perks = summonerFind.perks;
  const perksStyles = perks.styles;
  const perkPrimary = perksStyles[0];
  const perkSub = perksStyles[1];
  const perkPrimaryId = perkPrimary.selections[0].perk;
  const perkSubId = perkSub.style;

  const myPerkPrimary = perksInfo.find((perk) => perk.id === perkPrimaryId);
  const myPerkPrimaryIcon = myPerkPrimary.iconPath;
  const linkPrimaryIcon = myPerkPrimaryIcon
    .replace("/lol-game-data/assets/", "")
    .toLowerCase();

  const perkSubIcon = perksSub[perkSubId] || "PerkSub";

  function calculateKDA(kills, assists, deaths) {
    if (deaths === 0) {
      return (kills + assists).toFixed(2); // Si no hay muertes, retorna el valor de Kills + Assists
    } else {
      return ((kills + assists) / deaths).toFixed(2);
    }
  }

  const kda = calculateKDA(
    summonerFind.kills,
    summonerFind.assists,
    summonerFind.deaths
  );

  const itemId1 = summonerFind.item0;
  const itemId2 = summonerFind.item1;
  const itemId3 = summonerFind.item2;
  const itemId4 = summonerFind.item3;
  const itemId5 = summonerFind.item4;
  const itemId6 = summonerFind.item5;
  const itemId7 = summonerFind.item6;

  function itemIconPath(itemId) {
    if (itemId === 0) {
      return "Vacio";
    } else {
      let itemGame = itemsInfo.find((item) => item.id === itemId);
      if (itemGame) {
        let itemIcon = itemGame.iconPath;
        let link = itemIcon.replace("/lol-game-data/assets/", "").toLowerCase();
        return link;
      } else {
        return "No encontrado";
      }
    }
  }

  const item1 = itemIconPath(itemId1);
  const item2 = itemIconPath(itemId2);
  const item3 = itemIconPath(itemId3);
  const item4 = itemIconPath(itemId4);
  const item5 = itemIconPath(itemId5);
  const item6 = itemIconPath(itemId6);
  const item7 = itemIconPath(itemId7);

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonOpen = () => {
    setIsOpen(!open);
  };

  return (
    <div
      className={`w-full h-[100px] relative ${
        statusGame === "Remake"
          ? "bg-gray-500"
          : statusGame === "Win"
          ? "bg-blue-400"
          : "bg-red-400"
      } xl:w-11/12`}
    >
      <header className="flex flex-row justify-between text-xs mx-2 mt-2 h-4">
        <div className="flex flex-row gap-2">
          <p className="font-bold">{statusGame}</p>
          <p>{gameTime}m</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>{matchType}</p>
          <p>{timeGameEnd}</p>
          <button
            onClick={handleButtonOpen}
            className="w-[20px] h-[20px] bg-white text-black rounded flex justify-center items-center"
          >
            +
          </button>
        </div>
      </header>
      <div className="m-2 flex flex-row items-center justify-between gap-4 relative">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="w-[55px] relative">
            <Image
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summonerFind.championId}.png`}
              alt="Campeon del invocador"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="bg-slate-700 rounded-full absolute bottom-0 right-[2px] sm:right-[10px] p-1 text-xs z-10">
              {summonerFind.champLevel}
            </span>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Image
                src={`https://raw.communitydragon.org/latest/game/data/spells/icons2d/${spell1}.png`}
                alt="Summoner Spell 1"
                width={20}
                height={20}
              />
              <Image
                src={`https://raw.communitydragon.org/latest/game/data/spells/icons2d/${spell2}.png`}
                alt="Summoner Spell 2"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${linkPrimaryIcon}`}
                alt="Summoner perk 1"
                width={20}
                height={20}
                className="rounded-full"
              />
              <Image
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${perkSubIcon}`}
                alt="Summoner perk 2"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-xs text-center">
          <div className="flex flex-row items-center justify-center">
            <p>{summonerFind.kills}/</p>
            <p className="text-red-500">{summonerFind.deaths}</p>
            <p>/{summonerFind.assists}</p>
          </div>
          <span className="opacity-70">{kda} KDA</span>
        </div>
        <div className="flex flex-col text-xs items-center justify-center text-center">
          <span>CS {summonerFind.totalMinionsKilled}</span>
          <span>Control Ward {summonerFind.detectorWardsPlaced}</span>
        </div>
        <div className="w-[80px] h-[40px] flex flex-row ml-2">
          <SummonerInventoryCard
            item1={item1}
            item2={item2}
            item3={item3}
            item4={item4}
            item5={item5}
            item6={item6}
            item7={item7}
          />
        </div>
      </div>
    </div>
  );
}

export default CardGame;
