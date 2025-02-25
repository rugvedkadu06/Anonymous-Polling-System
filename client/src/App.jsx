import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    const res = await axios.get("http://localhost:5000/api/polls");
    setPolls(res.data);
  };

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) return;
    await axios.post("http://localhost:5000/api/polls", { question, options });
    setQuestion("");
    setOptions(["", ""]);
    fetchPolls();
  };

  const vote = async (pollId, optionIndex) => {
    await axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, {
      optionIndex,
    });
    fetchPolls();
  };

  return (
    <div className="container">
      <div className="poll-creator">
        <h2>Create a Poll</h2>
        <input
          type="text"
          placeholder="Enter poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <button onClick={() => setOptions([...options, ""])}>
          + Add Option
        </button>
        <button onClick={createPoll}>Create Poll</button>
      </div>
      <div className="poll-list">
        <h2>Polls</h2>
        {polls.map((poll) => (
          <div key={poll._id} className="poll">
            <h3>{poll.question}</h3>
            {poll.options.map((option, index) => (
              <div key={index} className="option">
                <span>{option.text}</span>
                <button
                  className="vote-btn"
                  onClick={() => vote(poll._id, index)}
                >
                  Vote
                </button>
                <span>{option.votes} votes</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
