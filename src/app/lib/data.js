export async function getProfileData(summoner) {
  try {
    const response = await fetch(
      `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`,
      {
        headers: {
          "X-Riot-Token": process.env.TOKEN,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

export async function getRankedsData(summonerId) {
  try {
    const response = await fetch(
      `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
      {
        headers: {
          "X-Riot-Token": process.env.TOKEN,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

async function getMatch(idgame) {
  try {
    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${idgame}`,
      {
        headers: {
          "X-Riot-Token": process.env.TOKEN,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}


export async function fetchMatchData(matchIds) {
  try {
    const matchRequests = matchIds.map(async (matchId) => {
      try {
        const matchData = await getMatch(matchId);
        return matchData;
      } catch (error) {
        console.error(`Error al obtener los datos del match ${matchId}:`, error);
        return null;
      }
    });

    const allMatchData = await Promise.all(matchRequests);
    return allMatchData.filter((data) => data !== null);
  } catch (error) {
    console.error("Error al realizar las solicitudes:", error);
    return [];
  }
}

export async function getMatchesIdsAndFetchMatches(puuid) {
  try {
    const matchIds = await getMatchesIds(puuid);
    const allMatchesData = await fetchMatchData(matchIds);
    return allMatchesData;
  } catch (error) {
    console.error("Error al obtener los IDs de las partidas y sus datos:", error);
    return [];
  }
}

async function getMatchesIds(puuid) {
  try {
    const response = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
      {
        headers: {
          "X-Riot-Token": process.env.TOKEN,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

export async function getPerksData() {
  try {
    const response = await fetch(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}

export async function getItemsData() {
  try {
    const response = await fetch(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos:", response.status);
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}





