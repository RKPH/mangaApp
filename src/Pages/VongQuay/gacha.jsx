import React, { useState } from "react";
import "./gacha.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import GahcaEffect from "../../assets/banner.avif";
import GachaEffect from "../../assets/gacha.gif";
import { useSelector } from "react-redux";

const gachaItems = [
  {
    id: 1,
    name: "Blue orb",
    rarity: "N",
    rate: 60,
    point: 10,
    img: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    name: "Orange orb",
    rarity: "R",
    rate: 20,
    point: 20,
    img: "https://static.wikia.nocookie.net/gensin-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20220725205230",
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
  const User = useSelector((state) => state.user.user);
  console.log("usser at gacha", User);
  const [countItems, setCountItems] = useState(
    gachaItems.map((item) => ({
      ...item,
      count: 0,
    }))
  );
  const [pulledItems, setPulledItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [displayedItem, setDisplayedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  const updatePointsApi = async (points) => {
    try {
      const response = await fetch(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users/updatePoint/${User?.userID}`,
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
      let updatedPulledItems = [];

      for (let i = 0; i < rollTimes; i++) {
        const randomNumber = Math.random() * 100;
        let accumulatedRate = 0;

        for (const item of gachaItems) {
          accumulatedRate += item.rate;
          if (randomNumber <= accumulatedRate) {
            total += item.point;
            updatedPulledItems.push(item);
            break;
          }
        }
      }

      setPulledItems(updatedPulledItems);
      setTotalPoints(total);
      console.log("Total points:", total);
      updatePointsApi(total);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setVisible(true);
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

  const getStars = (rarity) => {
    const rarityStars = {
      N: 1,
      R: 2,
      SR: 3,
      SSR: 4,
      UR: 5,
      SUR: 6,
      Rainbow: 7,
      Legend: 8,
    };

    const stars = [];
    for (let i = 0; i < rarityStars[rarity]; i++) {
      stars.push(
        <span key={i} className="star lg:text-xs text-xs">
          ★
        </span>
      );
    }
    return stars;
  };
  return (
    <div className="w-full h-full flex flex-col items-center bg-white dark:bg-[#18191A] pt-4 z-0">
      <div className="bg-[whitesmoke] dark:bg-[#242526] min-w-full h-full lg:px-10 px-4 py-2">
        <div className="p-3 shadow-sm my-5 border w-fit rounded-md">
          <span className="lg:text-base text-sm dark:text-white text-black text-center">
            Gacha Result : {totalPoints}
          </span>
        </div>
        <div className="relative  lg:h-[550px] h-[400px] w-full flex items-center justify-center justify-items-center mt-10 ">
          {isRolling ? (
            <img src={GachaEffect} alt="" className="lg:w-3/4 w-full h-full" />
          ) : (
            <img src={GahcaEffect} alt="" className="lg:w-3/4 w-full h-full" />
          )}
          <div className="absolute bottom-0  flex w-full justify-center items-center gap-x-2 mb-4 ">
            <button
              className="button p-2 px-4 border lg:text-base text-sm font-mono font-medium border-orange-500 m-1  hover:bg-orange-600 bg-orange-400 rounded-md"
              onClick={() => pull(1)}
            >
              Pull x1
            </button>
            <button
              className="button p-2 px-4 border border-orange-500 m-1 lg:text-base text-sm font-mono font-medium hover:bg-orange-600 bg-orange-400 rounded-md hover:"
              onClick={() => pull(10)}
            >
              Pull x10
            </button>
          </div>

          <Dialog
            draggable={false}
            blockScroll={true}
            visible={visible}
            className="dark:bg-[#18191A] w-3/4 min-h-fit shadow-lg rounded-md dark:text-white p-5 bg-white text-black"
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div className="m-1 mt-5">
              <div className="grid lg:grid-cols-10 2xl:grid-cols-10 md:grid-cols-4 grid-cols-2">
                {pulledItems.map((item) => (
                  <Card
                    key={item.id}
                    className=" m-2 flex flex-col items-center justify-center dark:bg-[#18191A] bg-white border rounded-md relative"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full  lg:h-[250px] h-[200px] rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                      }}
                    />
                    <div className="absolute bottom-0 bg-slate-600 p-1 m-1">
                      <span className={`font-semibold ${item.rarity}`}>
                        {getStars(item.rarity)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default GachaItems;
