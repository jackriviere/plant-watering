import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [date, setDate] = useState("");
  const [repeat, setRepeat] = useState("1");
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    console.log(date);
  }, [date]);

  useEffect(() => {
    console.log(repeat)
  }, [repeat]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="bg-base-200 rounded-2xl p-4">
          <label htmlFor="datetime" className="text-2xl">
            Choose when you'd like your plant to be watered
          </label>

          <div className="w-full my-5">
            <input
              id="datetime"
              className="text-xl text-primary mx-8"
              aria-label="Date and time"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <input
                type="checkbox"
                id="no-repeat"
                value={isRepeat}
                onChange={(e) => setIsRepeat(e.target.checked)}
              />
              <label className="ml-4 mr-10" htmlFor="no-repeat">
                Repeat
              </label>
            </div>
            <div hidden={!isRepeat}>
              <label htmlFor="repeat">
                Repeat every{" "}
                <input
                  className="bg-base-100 rounded-md disabled:bg-base-200"
                  id="repeat"
                  type="number"
                  min={1}
                  max={90}
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                />{" "}
                {repeat === '1' ? "day" : "days"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
