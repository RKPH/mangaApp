import React, { useEffect, useState } from "react";
import axios from "axios";
import "./gacha.css";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const placeholderImg =
  "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFQznaKdID5D6d23ldHSwKOmZeyEz21XvZZ12LzE9t6nigbgqkplNjihJIaLMlhpF1ZeR5c/256fx256f";

const GachaItems = () => {
  const [gachaItems, setGachaItems] = useState([]);
  const User = useSelector((state) => state.user.user);
  const [countItems, setCountItems] = useState([]);
  const [userPoint, setUserPoint] = useState(User?.point);
  const [pulledItems, setPulledItems] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [displayedItem, setDisplayedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Gacha/getgachaItems"
      )
      .then((res) => {
        setGachaItems(res.data);
        setCountItems(res.data.map((item) => ({ ...item, count: 0 })));
      })
      .catch((error) => {
        console.error("Error fetching gacha items:", error);
      });
  }, []);

  const updatePointsApi = async (points) => {
    try {
      const response = await fetch(
        `https://itec-mangaapp-ef4733c4d23d.herokuapp.com/api/Users/updatePoint/${User?.userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(points),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 400 && errorText === "Not enough points") {
          toast.error("Bạn không có đủ lượt quay");
        } else {
          throw new Error(
            `Failed to update points: ${response.status} ${response.statusText} - ${errorText}`
          );
        }
      } else {
        toast.success("Points updated successfully");
      }
    } catch (error) {
      console.error("Error updating points:", error);
      toast.error("Error updating points: " + error.message);
    }
  };

  useEffect(() => {
    setUserPoint(User?.point);
  }, [User?.point]);

  const pull = async (rollTimes) => {
    const costPerRoll = 10; // Assuming each pull costs 10 points
    const totalCost = rollTimes * costPerRoll;

    if (userPoint < totalCost) {
      toast.error("Bạn không có đủ lượt quay");
      return;
    }

    // Deduct points immediately
    setUserPoint((prevUserPoint) => prevUserPoint - totalCost);
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
      setUserPoint((prevUserPoint) => prevUserPoint + total);
      console.log("Total points:", total);
      updatePointsApi({ point: total, pointNeeded: totalCost });
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
      SSSR: 5,
      Legend: 8,
    };

    const stars = [];
    for (let i = 0; i < rarityStars[rarity]; i++) {
      stars.push(
        <span key={i} className="star lg:text-base text-xs">
          ★
        </span>
      );
    }
    return stars;
  };

  const Rounded = (num) => {
    return Math.floor(num);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white dark:bg-[#18191A] p-4 z-0">
      <div className="bg-custom-image3 bg-cover bg-center bg-no-repeat min-w-full h-[800px] py-2 relative">
        <div className="flex md:flex-row flex-col bg-[#18191ace] gap-x-2 p-4">
          <div className="p-3 shadow-sm my-5 border w-fit rounded-md">
            <span className="text-lg dark:text-white text-black text-center">
              Gacha Result: {totalPoints}
            </span>
          </div>
          <div className="p-3 shadow-sm my-5 border w-fit rounded-md">
            <span className="text-lg dark:text-white text-black text-center">
              Số lượt quay: {Rounded(userPoint / 10)}
            </span>
          </div>
        </div>

        <div className="absolute p-2 bg-[#18191ace] bottom-0 flex w-full justify-center items-center gap-x-2 mb-4">
          <button
            className="button p-2 px-4 border text-lg font-mono font-medium border-orange-500 m-1 hover:bg-orange-600 bg-orange-400 rounded-md"
            onClick={() => pull(1)}
            disabled={isRolling}
          >
            Pull x1
          </button>
          <button
            className="button p-2 px-4 border border-orange-500 m-1 text-lg font-mono font-medium hover:bg-orange-600 bg-orange-400 rounded-md"
            onClick={() => pull(10)}
            disabled={isRolling}
          >
            Pull x10
          </button>
        </div>

        <Dialog
          draggable={false}
          blockScroll={true}
          visible={visible}
          className="dark:bg-[#18191A] w-10/12 absolute h-[600px] shadow-lg rounded-md dark:text-white p-5 bg-white text-black border-2 border-orange-500"
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <h2 className="md:text-xl text-lg font-sansII text-center uppercase font-bold my-5">
            Chúc mừng bạn đã nhận được
          </h2>
          <div className="grid lg:grid-cols-5 2xl:grid-cols-10 md:grid-cols-4 grid-cols-2 items-center justify-center w-full h-fit p-2 b">
            {pulledItems.map((item, index) => (
              <Card
                key={index}
                className={`flex m-2 items-center justify-center ${item.bgColor} border rounded-md relative `}
              >
                <img
                  src={item.thumb_url}
                  className="h-[150px] w-[400px] rounded-md"
                />
                <h4 className=" p-2 text-center">{item.name}</h4>
                <div className="absolute top-0 px-1">
                  {getStars(item.rarity)}
                </div>
              </Card>
            ))}
          </div>
          <h2 className="md:text-xl text-lg font-sansII text-left  font-bold my-5">
            Tổng giá trị: {totalPoints} điểm
          </h2>
        </Dialog>
      </div>
    </div>
  );
};

export default GachaItems;
