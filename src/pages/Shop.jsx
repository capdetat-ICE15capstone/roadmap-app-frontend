import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import Prompt from '../components/Prompt';

import placeholderImage from "../assets/roadmap_assets/Placeholder_Image.png"
import { ReactComponent as ShopLogo } from "../assets/shapes/shopping_bag.svg"
import ShopItem from '../components/ShopItem';
import ShopItemDetail from '../components/ShopItemDetail';

function Shop() {

  const [isViewingItem, setIsViewingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const [points, setPoints] = useState(20);

  const [itemList, setItemList] = useState([
    {
      'id': 1,
      'name': "Test Search",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 2,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 3,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 4,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 5,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 6,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 7,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 8,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
  ]);

  const [currentItemList, setCurrentItemList] = useState([
    {
      'id': 1,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 2,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 3,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 4,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 5,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 6,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 7,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
    {
      'id': 8,
      'name': "Item",
      'description': "Item description",
      'cost': 100,
    },
  ]);

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

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    setCurrentItemList([...itemList]);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center h-full w-full bg-white'>
        <div className='flex justify-between items-center w-4/5 h-10 m-8 space-x-4'>
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
      </div>
      <ShopItemDetail visible={isViewingItem} item={selectedItem} points={points} handlePoints={(amount) => { setPoints(amount) }} handleClose={() => setIsViewingItem(false)} />
    </>
  )
}

export default Shop