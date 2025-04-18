import React from "react";
import "../styles/emordnilapcontainer.css";
const WordContainer = ({ emordnilapWords = [] }) => {
  return (
    <div className="content-box">
      <div className="section">
        <h2 className="section-heading">Emordnilaps</h2>

        {emordnilapWords.length === 0 ? (
          <p className="no-results">No emordnilap words yet.</p>
        ) : (
          <div className="emordnilap-list">
            {emordnilapWords.map((item, index) => (
              <div className="emordnilap-item" key={index}>
                <p className="word-pair">
                  {item.word} ↔ {item.reverse}
                </p>
                <p className="definition">
                  <strong>{item.word}:</strong> {item.wordDefinition}
                </p>
                <p className="definition">
                  <strong>{item.reverse}:</strong> {item.reverseDefinition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordContainer;
