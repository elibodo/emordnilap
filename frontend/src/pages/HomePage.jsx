import React, { useEffect, useState } from "react";
import EmordnilapContainer from "../components/EmordnilapContainer";
import PalindromeContainer from "../components/PalindromeContainer";
import "../styles/homepage.css";

const HomePage = () => {
  const [emordnilapWords, setEmordnilapWords] = useState([]);
  const [palindromeWords, setPalindromeWords] = useState([]);
  const [emordnilapInput, setEmordnilapInput] = useState("");
  const [palindromeInput, setPalindromeInput] = useState("");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const [emordRes, palindromeRes] = await Promise.all([
          fetch("http://localhost:5000/api/emordnilap"),
          fetch("http://localhost:5000/api/palindrome"),
        ]);

        const emordData = await emordRes.json();
        const palindromeData = await palindromeRes.json();

        setEmordnilapWords((emordData.data || []).slice(-3).reverse());
        setPalindromeWords((palindromeData.data || []).slice(-5).reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWords();
  }, []);

  // Emordnilaps
  const handleEmordnilapSubmit = async () => {
    const word = emordnilapInput.trim().toLowerCase();
    const reverse = word.split("").reverse().join("");

    if (!word || word === reverse) {
      alert("Please enter a word that is not the same as its reverse.");
      return;
    }

    try {
      // Check if both words are real using the dictionary API
      const [wordRes, reverseRes] = await Promise.all([
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`),
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${reverse}`),
      ]);

      if (!wordRes.ok || !reverseRes.ok) {
        alert("One or both words are not valid English words.");
        return;
      }

      const wordData = await wordRes.json();
      const reverseData = await reverseRes.json();

      const wordDefinition =
        wordData[0]?.meanings?.[0]?.definitions?.[0]?.definition;
      const reverseDefinition =
        reverseData[0]?.meanings?.[0]?.definitions?.[0]?.definition;

      if (!wordDefinition || !reverseDefinition) {
        alert("Could not extract definitions. Try a different word.");
        return;
      }
      const res = await fetch("http://localhost:5000/api/emordnilap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word,
          reverse,
          wordDefinition,
          reverseDefinition,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to save the emordnilap.");
        return;
      }
      setEmordnilapWords((prev) => [...prev, result.data]);
      setEmordnilapInput("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // Palindromes
  const handlePalindromeSubmit = async () => {
    const word = palindromeInput.trim().toLowerCase();

    if (!word || word !== word.split("").reverse().join("")) {
      alert("Please enter a valid palindrome.");
      return;
    }

    try {
      const dictionaryRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!dictionaryRes.ok) {
        alert("That’s not a valid English word.");
        return;
      }

      const dictionaryData = await dictionaryRes.json();
      const definition =
        dictionaryData[0]?.meanings?.[0]?.definitions?.[0]?.definition;

      if (!definition) {
        alert("Could not find a definition.");
        return;
      }
      const res = await fetch("http://localhost:5000/api/palindrome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, wordDefinition: definition }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Palindrome already exists or failed to save.");
        return;
      }
      setPalindromeWords((prev) => [...prev, result.data]);
      setPalindromeInput("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="inputs-wrapper">
        {/* Emordnilap Input */}
        <div className="input-box">
          <h2 className="input-heading">Emordnilap</h2>
          <p className="input-description">
            Any word that when spelled backwards creates another word.
          </p>
          <input
            type="text"
            value={emordnilapInput}
            onChange={(e) => setEmordnilapInput(e.target.value)}
            placeholder="desserts"
            className="input-field"
          />
          <button className="input-button" onClick={handleEmordnilapSubmit}>
            Find
          </button>
        </div>

        {/* Palindrome Input */}
        <div className="input-box">
          <h2 className="input-heading">Palindrome</h2>
          <p className="input-description">
            A word, phrase, or sequence that reads the same backward as forward.
          </p>
          <input
            type="text"
            value={palindromeInput}
            onChange={(e) => setPalindromeInput(e.target.value)}
            placeholder="kayak"
            className="input-field"
          />
          <button className="input-button" onClick={handlePalindromeSubmit}>
            Find
          </button>
        </div>
      </div>

      <div className="results-wrapper">
        <div className="results-box">
          <EmordnilapContainer emordnilapWords={emordnilapWords} />
        </div>
        <div className="results-box">
          <PalindromeContainer palindromeWords={palindromeWords} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
