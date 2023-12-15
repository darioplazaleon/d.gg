import HomeSearch from "@/components/HomeSearch";

function HomePage() {
  return (
    <section
      id="homepage"
      className="w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("/bgLol.jpg")` }}
    >
      <div className="h-full w-full flex justify-center items-center">
        <HomeSearch />
      </div>
    </section>
  );
}

export default HomePage;
