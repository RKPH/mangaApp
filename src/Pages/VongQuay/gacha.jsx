import React, { useState } from "react";
import "./gacha.css";

const gachaItems = [
  {
    id: 1,
    name: "Blue orb",
    rarity: "N",
    rate: 60,
    point: 10,
    img: "https://i1.sndcdn.com/artworks-000138268002-p5ciu7-t500x500.jpg",
  },
  {
    id: 2,
    name: "Orange orb",
    rarity: "R",
    rate: 20,
    point: 20,
    img: "https://pm1.aminoapps.com/6475/05ffc94f671a7b17023e95715d7ba0da313378b5_00.jpg",
  },
  {
    id: 3,
    name: "Purple orb",
    rarity: "SR",
    rate: 10,
    point: 40,
    img: "https://i.pinimg.com/originals/4a/52/26/4a522651758aab0f934e665d7353c1f6.jpg",
  },
  {
    id: 4,
    name: "Yellow orb",
    rarity: "SSR",
    rate: 6,
    point: 60,
    img: "https://i.pinimg.com/originals/c3/94/7e/c3947eb2503d077171709c4f7e73d263.jpg",
  },
  {
    id: 5,
    name: "Red orb",
    rarity: "UR",
    rate: 2,
    point: 100,
    img: "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/blistivilu6xt703ehin.jpg",
  },
  {
    id: 6,
    name: "Pure orb",
    rarity: "SUR",
    rate: 1,
    point: 200,
    img: "https://i.ytimg.com/vi/rcf1TWbFtQU/maxresdefault.jpg",
  },
  {
    id: 7,
    name: "Rainbow ord",
    rarity: "Rainbow",
    rate: 0.55,
    point: 500,
    img: "https://assets1.ignimgs.com/thumbs/userUploaded/2019/4/26/cytusthumb-1556284920483.jpg",
  },
  {
    id: 8,
    name: "Legend orb",
    rarity: "Legend",
    rate: 0.05,
    point: 1000000,
    img: "https://c4.wallpaperflare.com/wallpaper/79/233/219/arcaea-lowiro-music-game-hd-wallpaper-preview.jpg",
  },
];

const placeholderImg =
  "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKdID5D6d23ldHSwKOmZeyEz21XvZZ12LzE9t6nigbgqkplNjihJIaLMlhpF1ZeR5c/256fx256f";

const GachaItems = () => {
  const [countItems, setCountItems] = useState(
    gachaItems.map((item) => ({
      ...item,
      count: 0,
    }))
  );
  const [totalPoints, setTotalPoints] = useState(0);

  const pull = (rollTimes) => {
    let total = 0;
    let updatedCountItems = gachaItems.map((item) => ({ ...item, count: 0 }));

    for (let i = 0; i < rollTimes; i++) {
      const randomNumber = Math.random() * 100;
      let accumulatedRate = 0;

      for (const item of gachaItems) {
        accumulatedRate += item.rate;
        if (randomNumber <= accumulatedRate) {
          updatedCountItems = updatedCountItems.map((itemCount) => {
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

    setCountItems(updatedCountItems);
    setTotalPoints(total);
  };

  return (
    <div className="gacha-container">
      <h1>Gacha Result</h1>
      <div className="gacha-items">
        {countItems.map((countItem) => (
          <div
            key={countItem.id}
            className={`gacha-item ${countItem.rarity.toLowerCase()}`}
          >
            <img
              src={countItem.count === 0 ? placeholderImg : countItem.img}
              alt={countItem.name}
            />
            <h3>{countItem.count === 0 ? "?" : countItem.name}</h3>
            <p>Points: {countItem.count === 0 ? "?" : countItem.point}</p>
            <p>Count: {countItem.count}</p>
          </div>
        ))}
      </div>
      <h1>Total Points: {totalPoints}</h1>
      <div className="gacha-btn">
        <button className="button" onClick={() => pull(1)}>
          Pull x1
        </button>
        <button className="button" onClick={() => pull(10)}>
          Pull x10
        </button>
      </div>
    </div>
  );
};

export default GachaItems;
