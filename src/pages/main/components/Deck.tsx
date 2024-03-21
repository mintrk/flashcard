import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Play } from "./Icons/Play";
import { Edit } from "./Icons/Edit";
import { Trash } from "./Icons/Trash";
import { AnimatePresence, motion } from "framer-motion";
import "./Deck.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

// import required modules
import { EffectCards, Pagination } from "swiper/modules";
import { Minus, Plus, X } from "lucide-react";

type Deck = {
  title: string;
  color: string;
  cards: string[];
};

interface DeckProps {
  deck: Deck;
  index: number;
  handleClickEdit: (index: number) => void;
  handleClickDelete: (index: number) => void;
}

const Deck = ({
  deck,
  index,
  handleClickEdit,
  handleClickDelete,
}: DeckProps) => {
  const [onHover, setOnHover] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [flipIndex, setFlipIndex] = useState(-1);
  const [cards, setCards] = useState<any[]>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (selectedId !== -1) {
      let newCards = [];
      for (let i = 0; i < deck.cards.length; i += 2) {
        const obj = {
          F: deck.cards[i],
          B: deck.cards[i + 1],
        };
        newCards.push(obj);
      }
      setCards(newCards);
    }
  }, [selectedId]);
  return (
    <>
      <motion.div
        className={`bg-${deck.color} text-white w-full h-[352px] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 duration-300`}
        onClick={() => {}}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        initial={{ scale: 1 }}
        animate={{ scale: selectedId === index ? 1.1 : 1 }} // Increase scale on selected card
        transition={{ duration: 0.3 }}>
        <h2 className={`text-xl ${onHover && "opacity-50"}`}>{deck.title}</h2>
        {onHover && (
          <div className="absolute flex flex-col justify-center items-center gap-8">
            <Button
              disableRipple
              radius="full"
              isIconOnly
              className="bg-transparent hover:scale-105"
              size="lg"
              onClick={() => {
                setSelectedId(index);
                setIsPlay(true);
              }}>
              <Play />
            </Button>
            <Button
              disableRipple
              radius="full"
              isIconOnly
              className="bg-transparent hover:scale-105"
              size="lg"
              onClick={() => {
                handleClickEdit(index);
              }}>
              <Edit />
            </Button>
            <Button
              disableRipple
              radius="full"
              isIconOnly
              className="bg-transparent hover:scale-105"
              size="lg"
              onClick={() => {
                handleClickDelete(index);
              }}>
              <Trash />
            </Button>
          </div>
        )}
      </motion.div>
      {isPlay && (
        <>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              layout
              className="fixed inset-0 bg-white flex flex-col items-center justify-center">
              <div
                className="cursor-pointer absolute top-4 right-6 bg-black opacity-50 hover:opacity-80 p-4 rounded-full"
                onClick={() => {
                  setIsPlay(!isPlay);
                  setSelectedId(-1);
                  setFlipIndex(-1);
                  setCount(0);
                }}>
                <X color="#fff" />
              </div>
              <div className="my-4 text-xl">Deck : {deck.title}</div>
              <Swiper
                effect={"cards"}
                grabCursor={true}
                pagination={{
                  type: "fraction",
                }}
                modules={[EffectCards, Pagination]}
                className="mySwiper">
                {cards?.map((card, index) => (
                  <SwiperSlide>
                    <div
                      className="flip-card w-full h-full rounded-md "
                      onClick={() => {
                        if (flipIndex === index) {
                          console.log("1");
                          setFlipIndex(-1);
                        } else {
                          console.log("2");
                          setFlipIndex(index);
                        }
                      }}>
                      <motion.div
                        className="flip-card-inner w-full h-full flex justify-center items-center"
                        initial={false}
                        animate={{
                          rotateY: index === flipIndex ? 180 : 360,
                        }}
                        transition={{
                          duration: 0.3,
                          animationDirection: "normal",
                        }}>
                        <div
                          className={`flip-card-front w-full h-full text-white rounded-lg p-4 bg-${deck.color} flex justify-center items-center`}>
                          <h1 className="text-2xl font-bold text-center">
                            {card.F}
                          </h1>
                        </div>

                        <div
                          className={`flip-card-back w-full h-full text-black rounded-lg p-4 bg-white border-solid border-[9px] border-${deck.color}  flex justify-center items-center`}>
                          <h1 className="text-2xl font-bold text-center">
                            {card.B}
                          </h1>
                        </div>
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="h-16 w-72 mt-8 flex items-center justify-center gap-4">
                <Button
                  isIconOnly
                  onClick={() => {
                    setCount((prev) => prev - 1);
                  }}>
                  <Minus />
                </Button>
                <div className="text-xl">{count}</div>
                <Button
                  isIconOnly
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}>
                  <Plus />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Deck;
