import React from "react";
import "../styles/homepage.css";
import EmordnilapContainer from "../components/EmordnilapContainer";
import { useEffect, useState } from "react";

const Emordnilap = () => {
  const [emordnilapWords, setEmordnilapWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const [emordRes] = await Promise.all([
          fetch("http://localhost:5000/api/emordnilap"),
        ]);

        const emordData = await emordRes.json();

        setEmordnilapWords(emordData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWords();
  }, []);
  return (
    <div className="results-wrapper">
      <div className="results-box">
        <EmordnilapContainer emordnilapWords={emordnilapWords} />
      </div>
    </div>
  );
};

export default Emordnilap;
