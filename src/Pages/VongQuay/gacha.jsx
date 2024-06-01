import React, { useState } from "react";
import "./Gacha.css";

const gachaItems = [
  { id: 1, name: "Blue orb", rarity: "N", rate: 60, point: 10 },
  { id: 2, name: "Orange orb", rarity: "R", rate: 20, point: 20 },
  { id: 3, name: "Purple orb", rarity: "SR", rate: 10, point: 40 },
  { id: 4, name: "Yellow orb", rarity: "SSR", rate: 6, point: 100 },
  { id: 5, name: "Red orb", rarity: "UR", rate: 2, point: 300 },
  { id: 6, name: "Pure orb", rarity: "SUR", rate: 1.5, point: 500 },
  { id: 7, name: "Legend orb", rarity: "Legend", rate: 0.1, point: 1000000 },
];

const GachaItems = () => {
  // const [gachaItems, setgachaItems] = useState([])
  // useEffect(()=>{
  //     fetch('url/gacha-items')
  //         .then(response => response.json())
  //         .then(data=>{
  //             setgachaItems(data)
  //         })
  //         .catch(error=>{
  //             console.log("Error from fetching items: ", error)
  //         })
  //     })
  const [countItems, setcountItems] = useState(
    gachaItems.map((item) => ({
      ...item,
      count: 0,
    }))
  );
  const [totalPoints, setTotalPoint] = useState(0);
  const Pull = (roll_times) => {
    let total = 0;
    let update_countItem = gachaItems.map((item) => ({ ...item, count: 0 }));
    for (let i = 0; i < roll_times; i++) {
      const randomNumber = Math.random() * 100;
      let accumlatedRate = 0;

      for (const item of gachaItems) {
        accumlatedRate += item.rate;
        if (randomNumber <= accumlatedRate) {
          update_countItem = update_countItem.map((itemCount) => {
            if (itemCount.id === item.id) {
              total += itemCount.point;
              return {
                ...itemCount,
                count: itemCount.count + 1,
              };
            }
            return itemCount;
          });
          break;
        }
      }
    }
    setcountItems(update_countItem);
    setTotalPoint(total);
  };
  return (
    <div className="gacha-container">
      <h1>Gacha Result</h1>
      {countItems.map((countItem) => (
        <div
          key={countItem.id}
          className={`gacha-item ${countItem.rarity.toLowerCase()}`}
        >
          <h3>{countItem.name}</h3>
          <p>Rarity: {countItem.rarity}</p>
          <p>Rate: {countItem.rate}%</p>
          <p>Points: {countItem.point}</p>
          <p>Count: {countItem.count}</p>
        </div>
      ))}

      <h1>Total Point:{totalPoints}</h1>

      <div className="gacha-btn">
        <button className="button" onClick={() => Pull(1)}>
          Gacha x1
        </button>
        <button className="button" onClick={() => Pull(10)}>
          Gacha x10
        </button>
      </div>
    </div>
  );
};

export default GachaItems;
