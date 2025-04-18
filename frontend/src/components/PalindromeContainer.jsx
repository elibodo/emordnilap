import React from "react";
import "../styles/palindromecontainer.css";

const WordContainer = ({ palindromeWords = [] }) => {
  return (
    <div className="content-box">
      <div className="section">
        <h2 className="section-heading">Palindromes</h2>
        {palindromeWords.length === 0 ? (
          <p className="no-results">No palindrome words yet.</p>
        ) : (
          <div className="palindrome-list">
            {palindromeWords.map((item, index) => (
              <div className="palindrome-item" key={index}>
                <p className="word">{item.word}</p>
                <p className="definition">{item.wordDefinition}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordContainer;
