import React, { useState } from "react";
import "./gacha.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import GahcaEffect from "../../assets/banner.avif";
import GachaEffect from "../../assets/gacha.gif";
import { useSelector } from "react-redux";
import gachaItemsList from "./gachaItems";

const gachaItems = gachaItemsList

const placeholderImg ="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKdID5D6d23ldHSwKOmZeyEz21XvZZ12LzE9t6nigbgqkplNjihJIaLMlhpF1ZeR5c/256fx256f";

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
            <img src={GachaEffect} alt="" className="lg:w-full w-full h-full" />
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
            className="dark:bg-[#18191A] w-3/4   h-[600px] shadow-lg rounded-md dark:text-white p-5 bg-white text-black"
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <div className="grid lg:grid-cols-5 2xl:grid-cols-10 md:grid-cols-4 grid-cols-2 items-center justify-center w-full h-full p-2  ">
              {pulledItems.map((item) => (
                <Card
                  key={item.id}
                  className=" m-2 flex h-fu  items-center justify-center dark:bg-[#18191A] bg-white border rounded-md relative"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[400px]  lg:h-[350px] h-[200px] rounded-md"
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
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default GachaItems;