"use client";

import { useEffect, useRef, useState } from "react";
import CardCategory3 from "./CardCategories/CardCategory3";
import Heading from "./Heading/Heading";
// @ts-ignore
import { RootCategoryId } from "@/Constant";
import useCategoryStore from "@/Store/categoryStore";
import Glide from "@glidejs/glide";

// export interface listProps {
//   name? : string | null,
//   description? : string | null,
//   image? : object | null,
//   icon? : object | null
// }


const DiscoverMoreSlider = () => {
  const sliderRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const getListByParentId = useCategoryStore((state)=>state.getListByParentId);
  const loading = useCategoryStore((state)=>state.loading);
  const list = useCategoryStore((state)=>state.list);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  useEffect(()=> {
    getListByParentId(RootCategoryId);
  },[]);

  useEffect(()=> {
    console.log(list);
  },[list]);

  return (
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider nc-p-l-container ${
        isShow ? "" : "invisible"
      }`}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText="Good things are waiting for you"
        hasNextPrev
      >
        Discover more
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">
          {list.map((item:any, index:number) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.name}
                desc={item.description}
                featuredImage={item.image?.url}
                icon={item.icon?.url}
              />
            </li>
          ))}
          {/* {CATS_DISCOVER.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.name}
                desc={item.desc}
                featuredImage={item.featuredImage}
                color={item.color}
              />
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
