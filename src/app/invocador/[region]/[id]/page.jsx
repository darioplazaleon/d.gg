import { getProfileData, getRankedsData } from "@/app/lib/data";
import GamesSection from "@/components/GamesSection";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";

export default async function HomeSummoner({ params }) {
  const summonerName = params.id;
  const summonerRegion = params.region;
  const summonerData = await getProfileData(summonerName);

  const rankedData = await getRankedsData(summonerData.id);

  return (
    <section className="w-full h-full bg-slate-700 flex flex-col justify-center items-center space-y-8">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center xl:items-start xl:flex-row gap-3">
        <Profile
          dataProfile={summonerData}
          region={summonerRegion}
          rankedInfo={rankedData}
        />
        <GamesSection summoner={summonerData.puuid} />
      </div>
    </section>
  );
}
