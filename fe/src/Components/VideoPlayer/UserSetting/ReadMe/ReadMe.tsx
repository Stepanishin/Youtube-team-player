import React from "react";
import "./ReadMe.css";

const ReadMe = () => {
  return (
    <div className="ReadMe">
      <h3 className="ReadMe__title">Instructions:</h3>
      <ul className="ReadMe__list">
        <li className="ReadMe__item">
          Sinhronizirano dodajanje videa, brisanje videa.
        </li>
        <li className="ReadMe__item">
          Videoposnetke, ki so vam všeč, dodajte na seznam priljubljenih, saj je
          število iskalnih klikov v YouTubu omejeno
        </li>
        <li className="ReadMe__item">
          Če najdete kakršne koli napake ali želite nekaj popraviti ali želite
          nekaj dodati ali spremeniti - pišite mi
        </li>
      </ul>
    </div>
  );
};

export default ReadMe;
