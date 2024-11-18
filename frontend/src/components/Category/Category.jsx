// import React from 'react'

import Button from "../Shared/Button"

// img 1+2+3+   for categories 

const Category = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-4 gap-8
        ">
          {/* 1 col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-black/90
           to-black/70 text-white *:
          rounded-3xl relative h-[320px]
          flex items-end
          ">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Viwe</p>
                <p className="text-2xl font-semibold mb-[2px]">the</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">Category1</p>
                <Button
                  text="Browse"
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </div>
            </div>
            {/* img of the cat1 */}
            {/* <img src="" alt=""  classname=" w-[320px] absolute bottom-0"    الصورة تحت هنا!! /> */}
          </div>
          {/* 2 col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-brandYellow
           to-brandYellow/90 text-white *:
          rounded-3xl relative h-[320px]
          flex items-end
          ">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Viwe</p>
                <p className="text-2xl font-semibold mb-[2px]">the</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Category2</p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-brandYellow"}
                />
              </div>
            </div>
            {/* img of the cat2 */}
            {/* <img src="" alt=""  classname=" w-[320px] absolute -right-0" lg:top-[40px]    الصورة فوق  /> */}
          </div>
          {/* 3 col */}
          <div className="col-span-2 py-10 pl-5 bg-gradient-to-br from-primary
           to-primary/90 text-white *:
          rounded-3xl relative h-[320px]
          flex items-end
          ">
            <div >
              <div className=" mb-4">
                <p className=" text-white">Viwe</p>
                <p className="text-2xl font-semibold ">the</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Category3</p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-primary"}
                />
              </div>
            </div>
            {/* img of the cat3 */}
            {/* <img src="" alt=""  classname=" w-[250px] absolute top-1/2 -translate-y-1/2 -right-0   !!! /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category  