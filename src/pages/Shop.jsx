import React, { useState, useEffect, useRef, lazy } from 'react'

import { axiosInstance } from '../functions/axiosInstance';

import { ReactComponent as ShopLogo } from "../assets/shapes/shopping_bag.svg"
import ShopItem from '../components/ShopItem';
import ShopItemDetail from '../components/ShopItemDetail';

import { motion } from 'framer-motion';

import { completeQuestCheckShop } from './Activity';

import Img1 from "../assets/shop_assests/eno_orange.png"
import Img2 from "../assets/shop_assests/eno_salt.png"
import Img3 from "../assets/shop_assests/fsf_cherry.png"
import Img4 from "../assets/shop_assests/fsf_mandarin.png"
import Img5 from "../assets/shop_assests/fsf_mint.png"
import Img6 from "../assets/shop_assests/fsf_original.png"
import Img7 from "../assets/shop_assests/fsf_spearmint.png"
import Img8 from "../assets/shop_assests/lactasoy_bottle.png"
import Img9 from "../assets/shop_assests/lactasoy_box_chocolate.png"
import Img10 from "../assets/shop_assests/lays_classic.png"
import Img11 from "../assets/shop_assests/lays_seaweed_x6.jpg"
import Img12 from "../assets/shop_assests/milo_can.png"
import Img13 from "../assets/shop_assests/milo_cereal.png"
import Img14 from "../assets/shop_assests/pen_and_pencil.png"
import Img15 from "../assets/shop_assests/peptein.png"
import Img16 from "../assets/shop_assests/ruler.png"
import Img17 from "../assets/shop_assests/scott_small.png"

const bahtToPoint = (priceInBaht=0) => {
  return 50 * priceInBaht // 50 points = 1 baht
}

function Shop() {

  const [isViewingItem, setIsViewingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const [points, setPoints] = useState(20);

  const itemList = [
    {
      'id': 1,
      'name': "Eno orange flavor",
      'description': "Item description",
      'cost': bahtToPoint(12),
      'imgSrc': Img1
    },
    {
      'id': 2,
      'name': "Eno Salt flavor",
      'description': "Item description",
      'cost': bahtToPoint(12),
      'imgSrc': Img2
    },
    {
      'id': 3,
      'name': "Fisher man's friend, Cherry flavor",
      'imageName': "eno_orange.png",
      'description': "Item description",
      'cost': bahtToPoint(37),
      'imgSrc': Img3
    },
    {
      'id': 4,
      'name': "Fisher man's friend, Mandarin flavor",
      'description': "Item description",
      'cost': bahtToPoint(37),
      'imgSrc': Img4
    },
    {
      'id': 5,
      'name': "Fisher man's friend, Mint flavor",
      'description': "Fisher man's friend, Mint flavor",
      'cost': bahtToPoint(37),
      'imgSrc': Img5
    },
    {
      'id': 6,
      'name': "Fisher man's friend, Original flavor",
      'description': "Fisher man's friend, Original flavor",
      'cost': bahtToPoint(37),
      'imgSrc': Img6
    },
    {
      'id': 7,
      'name': "Fisher man's friend, Spearmint flavor",
      'description': "Fisher man's friend, Spearmint flavor",
      'cost': bahtToPoint(37),
      'imgSrc': Img7
    },
    {
      'id': 8,
      'name': "Lactasoy",
      'description': "Lactasoy",
      'cost': bahtToPoint(10),
      'imgSrc': Img8
    },
    {
      'id': 9,
      'name': "Lactasoy, Chocolate flavor",
      'description': "Lactasoy, Chocolate flavor",
      'cost': bahtToPoint(10),
      'imgSrc': Img9
    },
    {
      'id': 10,
      'name': "Lays classic",
      'description': "Lays classic",
      'cost': bahtToPoint(32),
      'imgSrc': Img10
    },
    {
      'id': 11,
      'name': "Lays Seaweed x6",
      'description': "Lays Seaweed x6",
      'cost': bahtToPoint(32*6),
      'imgSrc': Img11
    },
    {
      'id': 12,
      'name': "Milo",
      'description': "Milo",
      'cost': bahtToPoint(12),
      'imgSrc': Img12
    },
    {
      'id': 13,
      'name': "Milo Cereal",
      'description': "Milo Cereal",
      'cost': bahtToPoint(10),
      'imgSrc': Img13
    },
    {
      'id': 14,
      'name': "Marlin writing set",
      'description': "Marlin writing set",
      'cost': bahtToPoint(80),
      'imgSrc': Img14
    },
    {
      'id': 15,
      'name': "Peptein",
      'description': "Peptein",
      'cost': bahtToPoint(30),
      'imgSrc': Img15
    },
    {
      'id': 16,
      'name': "Ruler",
      'description': "Ruler",
      'cost': bahtToPoint(10),
      'imgSrc': Img16
    },
    {
      'id': 17,
      'name': "Scott extra",
      'description': "Scott extra",
      'cost': bahtToPoint(20),
      'imgSrc': Img17
    },
  ];

  const [currentItemList, setCurrentItemList] = useState([]);

  const [isWarning, setIsWarning] = useState();
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/home/me');
      setProfile(response.data.profile);
      setPoints(response.data.profile.points)
      console.log(response.data.profile);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  function handleSelectItem(item) {
    setSelectedItem(item);
    setIsViewingItem(true);
  }

  function handleSearch() {
    if (searchTerm !== "") {
      const term = searchTerm.toLowerCase();
      const arr = [];
      itemList.forEach(item => {
        if (item.name.toLowerCase().includes(term)) {
          arr.push(item);
        }
      })
      setCurrentItemList(arr);
    } else {
      setCurrentItemList([...itemList]);
    }
  }

  async function handleExchangePoints(points) {
    try {
      const response = await axiosInstance.put(`/user/spend_points/?points=${1}`);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      setIsWarning(true);
    }
  }

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    fetchData();
    setCurrentItemList([...itemList]);
    completeQuestCheckShop();
  }, []);

  return (
    <>
      <motion.div
        className='flex flex-col items-center h-full w-full bg-white'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          type: "easeInOut",
          duration: "0.3"
        }}
      >
        <div className='flex justify-between items-center w-4/5 h-10 mt-10 mx-8 mb-8 space-x-4'>
          <div className='flex items-center shrink-0 h-full text-4xl font-extrabold text-nav-blue space-x-2'>
            <ShopLogo className='h-10 w-10' />
            <div className='max-md:hidden'>
              SHOP
            </div>
          </div>
          <div className='flex h-full'>
            <form className='flex space-x-2'>
              <input
                type="text"
                className="shadow appearance-none border rounded-3xl w-3/4 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="Search"
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
              <button onClick={() => handleSearch()} type="button" className="bg-sub-blue text-white w-1/4 shadow font-bold py-2 rounded-full transition ease-in-out hover:bg-blue-900 duration-300">
                Go
              </button>
            </form>
          </div>
          <div className='flex h-full shrink-0'>
            <div className="flex items-center border-yellow-400 border-2 text-yellow-400 shadow font-bold px-4 rounded-full transition ease-in-out hover:bg-yellow-900 duration-300">
              {points} P
            </div>
          </div>
        </div>
        <div className='flex flex-col h-full w-full items-center bg-white overflow-y-auto'>
          <div className='flex flex-col justify-center items-center w-[90%] py-6 space-y-8'>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
              {
                currentItemList.map((item, index) => {
                  return (<ShopItem key={index} item={item} handleSelect={handleSelectItem} />);
                })
              }
            </div>
          </div>
        </div>
      </motion.div>
      <ShopItemDetail visible={isViewingItem} item={selectedItem} points={points} handlePoints={handleExchangePoints} handleClose={() => setIsViewingItem(false)} />
    </>
  )
}

export default Shop