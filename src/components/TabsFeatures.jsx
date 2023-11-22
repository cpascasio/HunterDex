import { FiMonitor, FiSave, FiSearch } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { icons } from "../utils/helper";
import { data } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const TabsFeatures = ({ monsters }) => {
  useEffect(() => {
    console.log(monsters);
  }, [monsters]);

  const [selected, setSelected] = useState(0);

  return (
    <section className="p-4 w-full">
      <div className="mx-auto max-w-5xl">
        <Tabs
          monsters={monsters}
          selected={selected}
          setSelected={setSelected}
        />

        <AnimatePresence mode="wait">
          {monsters.map((monster, index) => {
            const converter = (name) => {
              return name.replace(/ /g, "_");
            };

            return selected === index ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={index}
              >
                <ExampleFeature
                  monster={monster}
                  Icon={`/MHW-${converter(monster.name)}_Icon.png`}
                />
              </motion.div>
            ) : undefined;
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Tabs = ({ monsters, selected, setSelected }) => {
  return (
    <div className="flex overflow-x-scroll">
      {monsters.map((monster, index) => {
        const name = new String(monster.name);

        /*
        if (monster.name.includes("-")) {
            const temp = monster.name.split("-");
            monster.name = temp[0];
            console.log(monster.name)
        }
        */

        const converter = (name) => {
          return name.replace(/ /g, "_");
        };

        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            //Icon={icons[monster.name.replace(/ /g, "_")]}
            Icon={`../../public/MHW-${converter(monster.name)}_Icon.png`}
            title={name}
            tabNum={index}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ selected, title, setSelected, tabNum, Icon }) => {
  return (
    <div className="relative w-full m-1">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full h-60 flex-row items-center justify-center gap-4 border-b-4 border-slate-600 bg-slate-100 p-6 transition-colors hover:bg-slate-300 md:flex-col"
      >
        <img
          className={`rounded-lg bg-gradient-to-br from-yellow-500 from-10% to-red-500 p-3 text-2xl text-white shadow-red-400 transition-all duration-300 ${
            selected
              ? "scale-100 opacity-100 shadow-lg"
              : "scale-90 opacity-50 shadow"
          }`}
          src={Icon}
        ></img>
        <span
          className={`min-w-[150px] max-w-[200px] text-start text-xs text-slate-900 transition-opacity md:text-center font-bold ${
            selected ? "opacity-100" : "opacity-50"
          }`}
        >
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="tabs-features-underline"
          className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-red-600"
        />
      )}
    </div>
  );
};

const StarRating = ({ stars }) => {
  const starArray = Array.from({ length: stars }, (_, index) => index + 1);

  return (
    <div className="flex items-center">
      {starArray.map((star) => (
        <FontAwesomeIcon key={star} icon={faStar} className="text-yellow-500" />
      ))}
    </div>
  );
};

const ExampleFeature = ({ monster, Icon }) => (
  <div className="w-full px-0 py-8 md:px-8">
    <div className="relative w-full rounded-xl border-2 border-slate-900 bg-slate-800 shadow-xl">
      <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3"></div>
      <div className="space-y-2 p-4">
        <p className="font-mono text-xl text-slate-200">MONSTER INFORMATION</p>

        <div className="flex justify-center items-center gap-2 flex-col">
          <img
            className={`rounded-lg bg-gradient-to-br w-32 from-yellow-500 from-10% to-red-500 p-3 text-white transition-all duration-300 scale-100 opacity-100 bg-transparent shadow-xl shadow-slate-900
          `}
            src={Icon}
          ></img>

          <h1 className="font-bold ">{monster.name}</h1>

          <h4 className="font-bold">{monster.species}</h4>

          <br />

          <p className="justify-center w-[60%]">{monster.description}</p>

          <br />

          <div className="flex flex-row items-center justify-around w-full h-full">
            <div>
              <h3 className="font-bold text-xl text-yellow-400">Locations</h3>

              {monster.locations &&
  monster.locations?.map((location, index) => {
    const bgColor =
      location.name === "Ancient Forest"
        ? "bg-green-900"
        : location.name === "Wildspire Waste"
        ? "bg-yellow-900"
        : location.name === "Coral Highlands"
        ? "bg-blue-900"
        : location.name === "Rotten Vale"
        ? "bg-purple-900"
        : location.name === "Elder's Recess"
        ? "bg-orange-900"
        : location.name === "Great Ravine"
        ? "bg-gray-900"
        : location.name === "Confluence of Fates"
        ? "bg-indigo-900"
        : location.name === "Everstream"
        ? "bg-teal-900"
        : location.name === "Caverns of El Dorado"
        ? "bg-pink-900"
        : location.name === "Hoarfrost Reach"
        ? "bg-blue-300"
        : location.name === "Guiding Lands"
        ? "bg-green-500"
        : location.name === "Origin Isle"
        ? "bg-yellow-500"
        : location.name === "Castle Schrade"
        ? "bg-red-900"
        : location.name === "Seliana Supply Cache"
        ? "bg-indigo-500"
        : "bg-gray-500"; // Default color

    return (
      <div className={`flex flex-row gap-2 justify-center border rounded-full p-2 my-1 ${bgColor}`}>
        <h4 className="font-bold">{location.name}</h4>
        <p className="text-red-500 mx-0">{location.zoneCount}</p>
      </div>
    );
  })}
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="gap-2">
                <h3 className="font-bold text-red-500 text-xl m-2">
                  Weaknesses
                </h3>

                <div className="flex flex-col gap-2  justify-center">
                {monster.weaknesses &&
  monster.weaknesses?.map((weakness, index) => {
    const borderColor =
      weakness.element === "fire"
        ? "border bg-red-900 rounded-xl shadow-sm shadow-red-800"
        : weakness.element === "ice"
        ? "border bg-blue-900 rounded-xl shadow-sm shadow-blue-800"
        : weakness.element === "thunder"
        ? "border bg-yellow-900 rounded-xl shadow-sm shadow-yellow-800"
        : weakness.element === "dragon"
        ? "border bg-purple-900 rounded-xl shadow-sm shadow-purple-800"
        : weakness.element === "poison"
        ? "border bg-green-900 rounded-xl shadow-sm shadow-green-800"
        : weakness.element === "sleep"
        ? "border bg-indigo-900 rounded-xl shadow-sm shadow-indigo-800"
        : weakness.element === "paralysis"
        ? "border bg-orange-900 rounded-xl shadow-sm shadow-orange-800"
        : weakness.element === "blast"
        ? "border bg-pink-900 rounded-xl shadow-sm shadow-pink-800"
        : weakness.element === "stun"
        ? "border bg-gray-900 rounded-xl shadow-sm shadow-gray-800"
        : weakness.element === "water"
        ? "border bg-teal-900 rounded-xl shadow-sm shadow-teal-800"
        : "border-gray-500"; // Default color

    return (
      <div
        className={`flex flex-row gap-2 p-1 px-2 ${borderColor} justify-center`}
        key={index}
      >
        <div className="flex justify-center">
          <h4 className="font-bold">{weakness.element}</h4>
        </div>

        <div className="flex">
          <StarRating stars={weakness.stars} />
        </div>
      </div>
    );
  })}
                                        </div>

              </div>
            </div>

            <div className="flex flex-col h-full">
              <h3 className="font-bold text-green-500 text-xl m-2">
                Resistances
              </h3>

              {monster.resistances &&
  monster.resistances?.map((resistance, index) => {
    const borderColor =
      resistance.element === "fire"
        ? "border bg-red-900 rounded-xl shadow-sm shadow-red-800"
        : resistance.element === "ice"
        ? "border bg-blue-900 rounded-xl shadow-sm shadow-blue-800"
        : resistance.element === "thunder"
        ? "border bg-yellow-900 rounded-xl shadow-sm shadow-yellow-800"
        : resistance.element === "dragon"
        ? "border bg-purple-900 rounded-xl shadow-sm shadow-purple-800"
        : resistance.element === "poison"
        ? "border bg-green-900 rounded-xl shadow-sm shadow-green-800"
        : resistance.element === "sleep"
        ? "border bg-indigo-900 rounded-xl shadow-sm shadow-indigo-800"
        : resistance.element === "paralysis"
        ? "border bg-orange-900 rounded-xl shadow-sm shadow-orange-800"
        : resistance.element === "blast"
        ? "border bg-pink-900 rounded-xl shadow-sm shadow-pink-800"
        : resistance.element === "stun"
        ? "border bg-gray-900 rounded-xl shadow-sm shadow-gray-800"
        : resistance.element === "water"
        ? "border bg-teal-900 rounded-xl shadow-sm shadow-teal-800"
        : "border-gray-500"; // Default color

    return (
      <div
        className={`flex flex-row gap-2 p-1 px-2 ${borderColor} justify-center`}
        key={index}
      >
        <div className="flex justify-center">
          <h4 className="font-bold">{resistance.element}</h4>
        </div>

        {resistance.stars && (
          <div className="flex">
            <StarRating stars={resistance.stars} />
          </div>
        )}

        {resistance.condition && (
          <div className="flex">
            <div className="tooltip bg-transparent text-white rounded-full px-3 py-0 border" data-tip={resistance.condition}>
                <p className="text-sm">
                    ?

                </p>
            </div>
          </div>
        )}
      </div>
    );
  })}
            </div>
          </div>
        </div>
      </div>
      <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700"></span>
    </div>
  </div>
);

export default TabsFeatures;

const FEATURES = [
  {
    title: "Some subtext about this first feature etc",
    Icon: FiSearch,
    Feature: () => <ExampleFeature Icon={FiSearch} />,
  },
  {
    title: "Some further info explaining the second one",
    Icon: FiSave,
    Feature: () => <ExampleFeature Icon={FiSave} />,
  },
  {
    title: "The third features the best though to be honest",
    Icon: FiMonitor,
    Feature: () => <ExampleFeature Icon={FiMonitor} />,
  },
];
