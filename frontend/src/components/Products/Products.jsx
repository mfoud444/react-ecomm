// import React from 'react'

import Heading from "../Shared/Heading"
import ProductCard from "./ProductCard"


const ProductsData = [
    {
        id: 1,
        img:  "img here",
        title:"prod title",
        price: "price num",
        aosDelay: "0",
    },
    {
        id: 2,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "200",
    }, {
        id: 3,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "400",
    }, {
        id: 4,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "600",
    },
]

const ProductsData2 = [
    {
        id: 1,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "0",
    },
    {
        id: 2,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "200",
    }, {
        id: 3,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "400",
    }, {
        id: 4,
        img: "img here",
        title: "prod title",
        price: "price num",
        aosDelay: "600",
    },
]

const Products = () => {
  return (
    <div>
        <div className="containe">
            {/* Header section */}
              <Heading title="What we offer" subtitle={"Explore Our pieces"} />
            {/* Body section */}
              <ProductCard data={ProductsData} />
              <ProductCard data={ProductsData2}/>
        </div>
    </div>
  )
}

export default Products