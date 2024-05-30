import { useState } from "react";
import { Card } from "primereact/card";
const gachaItems = [
  {
    id: 1,
    name: "Silver orb",
    rarity: "N",
    rate: 80,
    point: 10,
    backgroundColor: "#c0c0c0", // silver
    textColor: "#000", // black
  },
  {
    id: 2,
    name: "L-Blue orb",
    rarity: "R",
    rate: 16,
    point: 20,
    backgroundColor: "#add8e6", // light blue
    textColor: "#000", // black
  },
  {
    id: 3,
    name: "Blue orb",
    rarity: "SR",
    rate: 3.2,
    point: 40,
    backgroundColor: "#0000ff", // blue
    textColor: "#fff", // white
  },
  {
    id: 4,
    name: "Purple orb",
    rarity: "SSR",
    rate: 0.64,
    point: 100,
    backgroundColor: "#800080", // purple
    textColor: "#fff", // white
  },
  {
    id: 5,
    name: "Pink orb",
    rarity: "UR",
    rate: 0.128,
    point: 300,
    backgroundColor: "#ffc0cb", // pink
    textColor: "#000", // black
  },
  {
    id: 6,
    name: "Red orb",
    rarity: "SUR",
    rate: 0.026,
    point: 500,
    backgroundColor: "#ff0000", // red
    textColor: "#fff", // white
  },
  {
    id: 7,
    name: "??? orb",
    rarity: "???",
    rate: 0.001,
    point: 1000000,
    backgroundColor: "#ffff00", // yellow
    textColor: "#000", // black
  },
];

const getRandomItem = (items) => {
  const totalWeight = items.reduce((acc, item) => acc + item.rate, 0);
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const item of items) {
    cumulativeWeight += item.rate;
    if (random < cumulativeWeight) {
      return item;
    }
  }
};

export const getGachaItem = () => {
  const item = getRandomItem(gachaItems);
  return item;
};

const Gacha = () => {
  const [gachaResult, setGachaResult] = useState(null);
  const [totalPoint, setTotalPoint] = useState(0);

  const gachaPull = () => {
    const item = getGachaItem();
    setGachaResult(item);
  };

  const gachaPullTotal = () => {
    const list = [];
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const item = getGachaItem();
      list.push(item);
      total += item.point;
    }
    setGachaResult(list);
    setTotalPoint(total);
  };

  return (
    <div className="container mx-auto font-mono">
      <h2 className="text-2xl mb-4 text-center text-orange-500">Gacha Pull</h2>
      <div className="flex justify-center">
        <button
          onClick={gachaPull}
          className="m-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Pull Once
        </button>
        <button
          onClick={gachaPullTotal}
          className="m-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Pull 10 Times
        </button>
      </div>
      <div className="mt-5">
        {Array.isArray(gachaResult) ? (
          <div className="text-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
            <h4 className="text-lg mb-2">Results of 10 pulls:</h4>
            <p className="text-base font-mono">Total Point: {totalPoint}</p>
            <div className="grid grid-cols-2 gap-4">
              {gachaResult.map((result, index) => (
                <Card
                  key={index}
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: result.backgroundColor,
                    color: result.textColor,
                  }}
                >
                  <p className="font-bold">Point: {result.point}</p>
                  <p>You got: {result.name}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          gachaResult && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
              <Card
                style={{
                  backgroundColor: gachaResult.backgroundColor,
                  color: gachaResult.textColor,
                }}
              >
                <h5 className="font-bold">You got: {gachaResult.name}</h5>
                <p>
                  Rarity: {gachaResult.rarity} - {gachaResult.rate}%
                </p>
                <p>Point: {gachaResult.point}</p>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Gacha;
