function SummonerInventoryCard({
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
}) {
  const renderInventorySlot = (item) => {
    if (item === "Vacio" || item === "No encontrado") {
      return <div className="bg-slate-400 w-[18px] h-[18px] rounded"></div>;
    } else {
      return (
        <div className="bg-slate-400 w-[18px] h-[18px] rounded">
          <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${item}`} alt="Item" className="w-full h-full object-cover rounded" />
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="flex w-full mb-1 gap-1">
        {renderInventorySlot(item1)}
        {renderInventorySlot(item2)}
        {renderInventorySlot(item3)}
        {renderInventorySlot(item7)}
      </div>
      <div className="flex w-full gap-1">
        {renderInventorySlot(item4)}
        {renderInventorySlot(item5)}
        {renderInventorySlot(item6)}
      </div>
    </div>
  );
}

export default SummonerInventoryCard;
