import React from "react";
import "./ReadMe.css";

const ReadMe = () => {
  return (
    <div className="ReadMe">
      <h3 className="ReadMe__title">Instructions:</h3>
      <ul className="ReadMe__list">
        <li className="ReadMe__item">
          Sinhronizirano preklop videoposnetka, brisanje videoposnetka,
          dodajanje videoposnetka, zaustavitev videa. Glasnost videa ni
          sinhronizirana.
        </li>
        <li className="ReadMe__item">
          Videoposnetke, ki so vam všeč, dodajte na seznam priljubljenih, saj je
          število iskalnih klikov v YouTubu omejeno
        </li>
        <li className="ReadMe__item">
          Videoposnetka ne previjajte naprej ali nazaj, kajti če videoposnetek
          previjete do konca, se bo video preklopil za vse uporabnike spletnega
          mesta. Obravnavajte ga kot radio in poslušajte tudi videe drugih ljudi
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
