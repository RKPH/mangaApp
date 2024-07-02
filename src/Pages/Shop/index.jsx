import React, { useState } from "react";
import styles from "./Shop.module.css"; // Import the CSS Module

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const Shop = () => {
  const User = useSelector((state) => state.user.user);
  const [items, setItems] = useState([
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 1",
      price: 10,
      purchased: false,
    },
    {
      id: 2,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 2",
      price: 15,
      purchased: false,
    },
    {
      id: 3,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 3",
      price: 20.0,
      purchased: true,
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 4",
      price: 30.0,
      purchased: true,
    },

    {
      id: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 5",
      price: 40,
      purchased: false,
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 6",
      price: 50,
      purchased: false,
    },
    {
      id: 7,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 7",
      price: 60,
      purchased: false,
    },
    {
      id: 8,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 8",
      price: 70,
      purchased: false,
    },

    {
      id: 9,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 9",
      price: 80,
      purchased: false,
    },
    {
      id: 10,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 10",
      price: 90,
      purchased: false,
    },
    {
      id: 11,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 11",
      price: 100,
      purchased: false,
    },
    {
      id: 12,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU62Md2yC4lIg8Mt_ZUGEVBaoXR7apfYbWbQ&s",
      name: "Item 12",
      price: 110,
      purchased: false,
    },
  ]);

  const [user, setUser] = useState({
    id: 1,
    name: "Mr. Cat",
    money: 100,
  });

  const purchaseItem = (id, price) => {
    if (user.money >= price) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, purchased: true } : item
      );

      setItems(updatedItems);
      setUser({ ...user, money: user.money - price });
    } else {
      alert("Not enough money to purchase this item.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-[#18191A] py-4 z-0">
      <div className="mb-5  w-full p-2 md:text-3xl text-xl dark:text-white text-black  border border-dotted dark:border-white border-black">
        <h1 className="font-semibold font-sansII my-2 text-center">
          Chào mừng bạn đã đến với cửa hàng của chúng tôi{" "}
        </h1>
        <p className="font-light font-sansII my-2 text-lg text-left p-2">
          Đây là cửa hàng bán sản phẩm độc quyền của chúng tôi, nơi bạn sẽ sử
          dụng nguồn điểm mà bạn có để đổi các vật phẩm có trong cửa hàng. Lưu ý
          mỗi sản phẩm chỉ dc mua 1 lần.
        </p>
        <h5 className=" text-right text-lg font-sansII w-full">
          {" "}
          Tài khoản của bạn: {User.point}
        </h5>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-5">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`${styles.shopItem} shadow-lg rounded-md dark:bg-[#18191A] bg-white   dark:text-white text-black border dark:border-white border-black`}
            header={
              <img alt={item.name} src={item.img} className="w-full h-auto" />
            }
          >
            <div className=" w-full flex flex-col  p-2">
              <h3 className="text-lg font-bold font-sansII">{item.name}</h3>
              <span className="my-5 ">Price: ${item.price}</span>
              <Button
                label={item.purchased ? "Purchased" : "Buy Now"}
                icon="pi pi-shopping-cart"
                disabled={item.purchased}
                onClick={() => purchaseItem(item.id, item.price)}
                className={` border w-fit bg-green-500 gap-x-1 p-2 rounded-md text-sm ${
                  item.purchased ? "p-button-secondary" : "p-button-success"
                }`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
