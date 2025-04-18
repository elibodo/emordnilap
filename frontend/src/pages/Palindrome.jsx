import React from "react";
import "../styles/homepage.css";
import PalindromeContainer from "../components/PalindromeContainer";
import { useEffect, useState } from "react";

const Palindrome = () => {
  const [palindromeWords, setPalindromeWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const [palindromeRes] = await Promise.all([
          fetch("http://localhost:5000/api/palindrome"),
        ]);

        const palindromeData = await palindromeRes.json();

        setPalindromeWords(palindromeData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWords();
  }, []);
  return (
    <div className="results-wrapper">
      <div className="results-box">
        <PalindromeContainer palindromeWords={palindromeWords} />
      </div>
    </div>
  );
};

export default Palindrome;
