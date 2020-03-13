import React, {useEffect, useState} from "react";

const MagicNumber = () => {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState("");

    const handler = event => {
        setNumber(event.target.value);
    };

    const tryNumber = ()=>{
        io.emit("event::magicNumber", {number, username});
    };

    useEffect(()=>{
        io.connect("event::magicNumberState", payload =>{
            setResult(payload.state)
        });

        io.on("event::magicNumberWin", payload => {
            console.log(payload);
            setWinner(payload.winner+' won the last set');
          });
        
    }, []);

    return (
        <div className="field">
        <div className="control">
          <input className="input" onChange={handleNumber} value={number} />
        </div>
        <div className="control">
          <a className="button is-info" onClick={sendNumber}>
            Guess
          </a>
          <span>The result is {resultat}</span>
        </div>
      </div>
    );
};


export default MagicNumber;
