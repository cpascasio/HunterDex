import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import IconSideNav from "./components/IconSideNav";
import TabsFeatures from "./components/TabsFeatures";
import {icons } from "./utils/helper";

const apiUrl = 'https://mhw-db.com/monsters?q={"type":"large"}';

// const getData = async () => {
//   const res = await axios.get(apiUrl, { params })
//   data = res.data
//   console.log(data)
//   return data;
// }

function App() {
  const [count, setCount] = useState(0);

  const [monsters, setMonsters] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMonsters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

<div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
    >


<div className="flex items-center justify-center">
<h1 className="text-center font-bold text-6xl text-white">
          HUNTER'S NOTES
        </h1>
</div>
    

      {
        monsters && (
          <TabsFeatures monsters={monsters} />
        )
      }

      </div>
    </>
  );
}


export default App;
