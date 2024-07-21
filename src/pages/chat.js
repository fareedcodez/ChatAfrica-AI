import "./chat.css";
import { React, useEffect, useState } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "langchain/prompts";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Table } from "react-bootstrap";
import {
  BsChevronDown,
  BsArrowLeft,
  BsX,
  BsArrowLeftRight,
} from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
import { RiTranslate } from "react-icons/ri";
import { data } from "../data";
import { Link } from 'react-router-dom';

const template =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
const humanTemplate = "{text}";

const chatPrompt = ChatPromptTemplate.fromMessages([
  ["system", template],
  ["human", humanTemplate],
]);

const chat = new ChatOpenAI({
  openAIApiKey: "",
  temperature: 0,
});

const chain = new LLMChain({
  llm: chat,
  prompt: chatPrompt,
});

function ChatComponent() {
  const [text, setText] = useState("");
  const [inputlanguage, setInputlanguage] = useState("English");
  const [outputlanguage, setOutputlanguage] = useState("French");
  const [translation, setTranslation] = useState("");
  const [isdisabled, setIsdisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const [eng, setEng] = useState(true);
  const [chi, setChi] = useState(false);
  const [dut, setDut] = useState(false);
  const [fre, setFre] = useState(false);
  const [engOut, setOUtEng] = useState(false);
  const [chiOut, setOutChi] = useState(false);
  const [dutOut, setOutDut] = useState(false);
  const [freOut, setOutFre] = useState(true);

  const [changeIn, setChangeIn] = useState("");
  const [changeOut, setChangeOut] = useState("");

  const [keys, setKeys] = useState([]);

  const [showIn, setShowIn] = useState(false);
  const [showOut, setShowOut] = useState(false);

  const [searchBar, setSearchBar] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleClose = () => setShowIn(false);
  const handleShow = () => {
    setShowIn(true);
    setSearchBar(true);
  };

  const handleCloseOut = () => {
    setShowOut(false);
  };
  const handleShowOut = () => setShowOut(true);

  const handleCall = async () => {
    console.log(inputlanguage);
    console.log(outputlanguage);
    setLoading(true);
    const result = await chain.call({
      input_language: `${inputlanguage}`,
      output_language: `${outputlanguage}`,
      text: `${text}`,
    });
    setTranslation(result.text);
    if (text.length > 0) window.sessionStorage.setItem(text, result.text);
    setIsdisabled(true);
    setLoading(false);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleInput1 = (value) => {
    setInputlanguage(value);
  };

  const handleInput2 = (value) => {
    setOutputlanguage(value);
  };

  const handleReset = () => {
    setText("");
    setTranslation("");
    setIsdisabled(false);
    handleInputClick("English");
    handleOutputClick("French");
  };

  const handleSwitch = () => {
    handleInputClick("Other");
    handleOutputClick("Other");
    switch (inputlanguage) {
      case "English": {
        handleOutputClick("English");
        break;
      }
      case "Chinese": {
        handleOutputClick("Chinese");
        break;
      }
      case "French": {
        handleOutputClick("French");
        break;
      }
      default: {
        setOutputlanguage(inputlanguage);
        setChangeOut(changeIn);
      }
    }
    switch (outputlanguage) {
      case "English": {
        handleInputClick("English");
        break;
      }
      case "Chinese": {
        handleInputClick("Chinese");
        break;
      }
      case "French": {
        handleInputClick("French");
        break;
      }
      default: {
        setInputlanguage(outputlanguage);
        setChangeIn(changeOut);
      }
    }
  };

  const handleInputClick = (value) => {
    switch (value) {
      case "English": {
        setEng(true);
        setChi(false);
        setDut(false);
        setFre(false);
        setInputlanguage(value);
        break;
      }
      case "French": {
        setFre(true);
        setChi(false);
        setEng(false);
        setDut(false);
        setInputlanguage(value);
        break;
      }
      case "Chinese": {
        setChi(true);
        setEng(false);
        setDut(false);
        setFre(false);
        setInputlanguage(value);
        break;
      }
      default: {
        setDut(true);
        setChi(false);
        setEng(false);
        setFre(false);
      }
    }
  };

  const handleOutputClick = (value) => {
    switch (value) {
      case "English": {
        setOUtEng(true);
        setOutChi(false);
        setOutDut(false);
        setOutFre(false);
        setOutputlanguage(value);
        break;
      }
      case "French": {
        setOUtEng(false);
        setOutChi(false);
        setOutDut(false);
        setOutFre(true);
        setOutputlanguage(value);
        break;
      }
      case "Chinese": {
        setOUtEng(false);
        setOutChi(true);
        setOutDut(false);
        setOutFre(false);
        setOutputlanguage(value);
        break;
      }
      default: {
        setOUtEng(false);
        setOutChi(false);
        setOutDut(true);
        setOutFre(false);
      }
    }
  };

  useEffect(() => {
    setKeys(Object.keys(sessionStorage));
  }, [active]);

  const handleDropItems = (e) => {
    setDut(e.target.id);
    setChangeIn(e.target.id);
    handleClose();
    handleInput1(e.target.id);
  };

  const handleDropOut = (e) => {
    setOutDut(e.target.id);
    setChangeOut(e.target.id);
    handleInput2(e.target.id);
    handleCloseOut();
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleCall();
  };

  return (
    <div className="App">
      <div className="appTitle">
        <span>Translation</span>
      </div>
      <nav>
        <Link to="/">Go to home</Link>
        <Link to="/map">Go to Map</Link>
      </nav>
      <div className="content">
        <div className="input">
          <div className="userInput">
            <div className="dropdown">
              <a
                onClick={() => handleInputClick("Dutch")}
                className={dut ? "active" : null}
                style={changeIn.length < 1 ? { display: "none" } : {}}
              >
                {changeIn}
              </a>
              <a
                onClick={() => handleInputClick("English")}
                className={eng ? "active" : null}
              >
                English
              </a>
              <a
                onClick={() => handleInputClick("French")}
                className={fre ? "active" : null}
              >
                French
              </a>
              <a
                onClick={() => handleInputClick("Chinese")}
                className={chi ? "active" : null}
              >
                Chinese
              </a>

              <a onClick={() => handleInputClick("Other")}>
                <BsChevronDown
                  onClick={() => {
                    setSearchInput("");
                    handleShow();
                  }}
                  className="downarrow"
                  size={25}
                />
              </a>
            </div>
            <textarea
              className="text"
              onChange={handleText}
              onKeyDown={(e) => handleEnter(e)}
              style={{
                marginTop: "15px",
                borderRadius: "8px",
                padding: "30px",
                fontSize: "18px",
                minHeight:"164px",
                border: "1px solid rgba(0,0,0,.12)",
              }}
              value={text.toUpperCase()}
              placeholder="Enter the text to be translated here"
              rows={8}
            />
          </div>
          <a onClick={handleSwitch} className="switchBox">
            <svg
              width="30px"
              height="30px"
              className="switchIcon"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7L20 7M8 7L12 3M8 7L12 11M16 17L4 17M16 17L12 21M16 17L12 11"
              ></path>
            </svg>
          </a>
          <div className="userOutput">
            <div className="dropdown">
              <a
                onClick={() => handleOutputClick("Dutch")}
                className={dutOut ? "active" : null}
                style={changeOut.length < 1 ? { display: "none" } : {}}
              >
                {changeOut}
              </a>
              <a
                onClick={() => handleOutputClick("English")}
                className={engOut ? "active" : null}
              >
                English
              </a>
              <a
                onClick={() => handleOutputClick("French")}
                className={freOut ? "active" : null}
              >
                French
              </a>
              <a
                onClick={() => handleOutputClick("Chinese")}
                className={chiOut ? "active" : null}
              >
                Chinese
              </a>

              <a onClick={() => handleOutputClick("Other")}>
                <BsChevronDown
                  onClick={() => {
                    setSearchInput("");
                    handleShowOut();
                  }}
                  className="downarrow"
                  size={25}
                />
              </a>
            </div>
            <textarea
              className="text"
              style={{
                marginTop: "15px",
                borderRadius: "8px",
                padding: "30px",
                fontSize: "18px",
                minHeight:"164px",
                border: "1px solid rgba(0,0,0,.12)",
              }}
              value={translation}
              placeholder="Translated text will appear here"
              rows={8}
              readOnly
            />
          </div>
        </div>
        <div className="controls">
          <a onClick={handleReset}>
            <GrPowerReset
              className="resetIcon"
              size={20}
              color="#8d8d8d"
              onClick={() => handleReset()}
            />
          </a>
          <a
            style={text.length < 1 ? { display: "none" } : {}}
            onClick={handleCall}
          >
            <RiTranslate className="translateIcon" size={20} color="#8d8d8d" />
          </a>
        </div>
      </div>
      {/* Modal for Input Language Selection */}
      <Modal
        show={showIn}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Input Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {data.languages.map((item, index) => (
              <Col key={index}>
                <a
                  className="dropdown-item"
                  href="#"
                  id={item}
                  onClick={handleDropItems}
                >
                  {item}
                </a>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
      {/* Modal for Output Language Selection */}
      <Modal
        show={showOut}
        onHide={handleCloseOut}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Output Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {data.languages.map((item, index) => (
              <Col key={index}>
                <a
                  className="dropdown-item"
                  href="#"
                  id={item}
                  onClick={handleDropOut}
                >
                  {item}
                </a>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChatComponent;
