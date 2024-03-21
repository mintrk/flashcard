import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen">
        <div className="h-full w-full flex flex-col justify-between items-center text-center">
          <div className="flex">
            <div className="box bg-primary"></div>
            <div className="box bg-blue"></div>
            <div className="box bg-green"></div>
            <div className="box bg-yellow"></div>
            <div className="box bg-orange"></div>
            <div className="box bg-pink"></div>
          </div>
          <div>
            <h1 className="md:text-9xl text-5xl mb-4">Flashcardy!</h1>
            <p className="md:text-xl text-sm font-light my-4">
              "Spark your intellect with the flicker of knowledge on our
              flashcards. Learning made simple, one card at a time."
            </p>
            <Button
              className="bg-black text-white"
              size="lg"
              onClick={() => {
                navigate("/flashcard");
              }}>
              Launch into Learning
            </Button>
          </div>
          <div className="flex">
            <div className="box-border-1 border-primary"></div>
            <div className="box-border-1 border-blue"></div>
            <div className="box-border-1 border-green"></div>
            <div className="box-border-1 border-yellow"></div>
            <div className="box-border-1 border-orange"></div>
            <div className="box-border-1 border-pink"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
