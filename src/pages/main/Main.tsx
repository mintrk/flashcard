import { Plus } from "lucide-react";
import MyModal from "./components/MyModal";
import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import ConfrimModal from "./components/ConfrimModal";
import { useNavigate } from "react-router-dom";

type DeckType = {
  title: string;
  color: string;
  cards: string[];
};

const initialDecks: DeckType[] = [
  {
    title: "English Vocab",
    color: "blue",
    cards: [
      "Apple",
      "แอปเปิ้ล",
      "Orange",
      "ส้ม",
      "Banana",
      "กล้วย",
      "Tomato",
      "มะเขือเทศ",
    ],
  },
  {
    title: "Science Subject",
    color: "green",
    cards: [
      "The closest galaxy to the Milky Way is Andromeda.",
      "Andromeda Galaxy",
      "A light-year is the distance light travels in one year.",
      "Approximately 5.88 trillion miles",
      "The Sun is a type of star called a G-type main-sequence star.",
      "G2V star",
      "Jupiter is the largest planet in our solar system.",
      "Fifth planet from the Sun",
      "Hydrogen (H) is the lightest and most abundant element in the universe.",
      "Atomic number 1",
      "Oxygen (O) is essential for combustion and is a key component of water.",
      "Atomic number 8",
      "Carbon (C) is the basis of organic chemistry and life on Earth.",
      "Atomic number 6",
      "Gold (Au) is a precious metal often used in jewelry and electronics.",
      "Atomic number 79",
    ],
  },
  {
    title: "Mathematics Subject",
    color: "yellow",
    cards: [
      "What is the value of π (pi) to two decimal places?",
      "3.14",
      "The Pythagorean theorem relates to the sides of which type of triangle?",
      "Right-angled triangles",
      "What is the formula for calculating the area of a rectangle?",
      "Area = Length × Width",
      "Solve for x: 2x + 5 = 15",
      "x = 5",
      "What is the sum of the interior angles of a hexagon?",
      "720 degrees",
      "In a right-angled triangle, what is the relationship between the lengths of the sides a, b, and c?",
      "a^2 + b^2 = c^2",
      "What is the value of the square root of 25?",
      "5",
    ],
  },
  {
    title: "Health Subject",
    color: "orange",
    cards: [
      "Five main food groups in MyPlate?",
      "Fruits, Vegetables, Grains, Protein, Dairy",
      "Recommended daily water intake for adults?",
      "8 cups (64 ounces)",
      "'Sunshine vitamin' essential for bone health?",
      "Vitamin D",
      "Purpose of aerobic exercise?",
      "Improves cardiovascular health",
      "Recommended sleep for adults per night?",
      "7-9 hours",
    ],
  },
];

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [selectedValue, setSelectedVale] = useState<{
    title: string;
    color: string;
    cardText: string;
  } | null>();
  const [decks, setDecks] = useState<DeckType[]>(initialDecks);

  const navigate = useNavigate();

  useEffect(() => {
    const local: any = localStorage.getItem("decks");
    if (local) {
      setDecks(JSON.parse(local));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleSubmit = (value: any) => {
    const newDeck = {
      ...value,
      cards: value.cardText.split(/\||\n/).filter((e: string) => {
        return e != "";
      }),
    };
    setDecks((prev) => [...prev, newDeck]);
  };
  const handleSubmitEdit = (value: any) => {
    console.log(value);
    const newDeck = {
      ...value,
      cards: value.cardText.split(/\||\n/).filter((e: string) => {
        return e != "";
      }),
    };
    console.log(newDeck);
    const newDecks: any = decks.map((deck, index) => {
      if (index === selected) {
        return newDeck;
      }
      return deck;
    });
    setDecks(newDecks);
  };
  const handleClickEdit = (order: number) => {
    setIsOpenEdit(true);
    setSelected(order);
    const newSelect = decks.find((_, index) => index === order);
    const edit = {
      title: newSelect?.title || "",
      color: newSelect?.color || "",
      cardText:
        newSelect?.cards.reduce((acc, curr, index) => {
          if (index % 2 == 0) {
            acc += curr;
          } else {
            acc += `|${curr}\n`;
          }
          return acc;
        }, "") || "",
    };
    setSelectedVale(edit);
  };
  const handleClickDelete = (index: number) => {
    setIsOpenDelete(true);
    setSelected(index);
  };

  return (
    <div className="h-screen w-full py-6 px-8">
      <div>
        <h1 className="text-4xl cursor-pointer" onClick={() => navigate("/")}>
          Flashcardy
        </h1>
        <div className="h-[2px] bg-slate-200 my-2"></div>
      </div>
      <div className="py-4 gap-6 my-grid">
        <div
          className="w-full h-[352px] bg-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-300 hover:scale-105 duration-300"
          onClick={() => {
            handleOpenModal();
          }}>
          <Plus size={40} strokeWidth={2} className="my-2" />
          <h4>Add new deck</h4>
        </div>
        {decks.map((deck, index) => (
          <div key={index}>
            <Deck
              deck={deck}
              index={index}
              handleClickEdit={handleClickEdit}
              handleClickDelete={handleClickDelete}
            />
          </div>
        ))}
      </div>
      <MyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        initialValue={{
          title: "",
          color: "primary",
          cardText: "Front|Back",
        }}
      />
      {selectedValue !== null && selectedValue !== undefined && (
        <MyModal
          isOpen={isOpenEdit}
          onClose={() => {
            setIsOpenEdit(false);
            setSelected(-1);
            setSelectedVale(null);
          }}
          handleSubmit={handleSubmitEdit}
          initialValue={selectedValue}
        />
      )}
      {isOpenDelete && (
        <ConfrimModal
          body={"Delete this deck?"}
          isOpen={isOpenDelete}
          onClose={() => {
            setIsOpenDelete(false);
            setSelected(-1);
          }}
          handleSubmit={() => {
            setIsOpenDelete(false);
            const newDecks = decks.filter((_, index) => index !== selected);
            setDecks(newDecks);
            setSelected(-1);
          }}
        />
      )}
    </div>
  );
};

export default Main;
