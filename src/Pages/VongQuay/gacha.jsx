import React, { useState } from "react";
import "./gacha.css";
import { Card } from "primereact/card";
import GahcaEffect from "../../assets/gacha.gif";

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
    name: "Rainbow orb",
    rarity: "Rainbow",
    rate: 0.55,
    point: 500,
    img: "https://assets1.ignimgs.com/thumbs/userUploaded/2019/4/26/cytusthumb-1556284920483.jpg",
  },
  {
    id: 8,
    name: "Legend orb",
    rarity: "Legend",
    rate: 1.0,
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
  const [isRolling, setIsRolling] = useState(false);
  const [displayedItem, setDisplayedItem] = useState(null);

  const updatePointsApi = async (points) => {
    try {
      const response = await fetch(
        "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users/updatePoint/7be892ce-ef69-440b-b0fd-912983d79881",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(points), // Sending plain number
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update points: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      console.log("Points updated successfully");
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  const pull = (rollTimes) => {
    setIsRolling(true);

    setTimeout(() => {
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
      console.log("Total points:", total);
      // updatePointsApi(total);
      setIsRolling(false);
    }, 3400);

    // Animation for showing random items
    const interval = setInterval(() => {
      const randomItem =
        gachaItems[Math.floor(Math.random() * gachaItems.length)];
      setDisplayedItem(randomItem);
    }, 100);

    setTimeout(() => clearInterval(interval), 3000);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="bg-[whitesmoke] dark:bg-[#242526] min-w-full min-h-screen lg:px-10 px-4 py-2">
        <h1 className="lg:text-lg text-base dark:text-white text-black text-center">
          NƠI THỎA SỨC CHO CƠN NGHẸO CỦA BẠN
        </h1>
        <div className="p-3 shadow-sm my-5 border w-fit rounded-md">
          <span className="lg:text-base text-sm dark:text-white text-black text-center">
            Gacha Result : {totalPoints}
          </span>
        </div>
        {isRolling && displayedItem ? (
          <div className="w-full p-4 flex items-center justify-center">
            <img src={GahcaEffect} alt="Gacha effect" className="w-[600px] h-[300px] rounded-md backdrop-filter" />
          </div>
        ) : (
          <div className="w-full my-10 grid grid-cols-2 s:grid-cols-3 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-5">
            {countItems.map((countItem) => (
              <Card
                key={countItem.id}
                className={`shadow-md rounded hover:scale-105 gacha-item ${
                  countItem.count > 0
                    ? countItem.rarity.toLowerCase()
                    : "dark:text-white text-black"
                }`}
              >
                <div className="lg:h-[120px] h-[100px] w-full">
                  <img
                    src={countItem.count === 0 ? placeholderImg : countItem.img}
                    alt={countItem.name}
                    className="h-full w-full rounded-md border border-black"
                  />
                </div>
                <div className="p-2">
                  <h3
                    className={`overflow-hidden uppercase mb-4 lg:text-base text-sm font-medium overflow-ellipsis text-center whitespace-nowrap`}
                  >
                    {countItem.count === 0 ? "?" : countItem.name}
                  </h3>
                  <p className="dark:text-white text-black lg:text-base text-sm">
                    Points: {countItem.count === 0 ? "?" : countItem.point}
                  </p>
                  <p className="dark:text-white text-black lg:text-base text-sm">
                    you got: {countItem.count}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex w-full justify-center gap-x-2">
          <button
            className="button p-2 border border-orange-500 m-1 text-base bg-orange-500 rounded-md"
            onClick={() => pull(1)}
          >
            Pull x1
          </button>
          <button
            className="button p-2 border border-orange-500 m-1 text-base bg-orange-500 rounded-md"
            onClick={() => pull(10)}
          >
            Pull x10
          </button>
        </div>
      </div>
    </div>
  );
};

export default GachaItems;
