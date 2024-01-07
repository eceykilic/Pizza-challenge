import React from "react";
import { Link } from 'react-router-dom';
import "./Anasayfa.css";




function Anasayfa() {
  return (
      <div className="arkaplan">
      <div className="yazi">
        <p className="baslik">Teknolojik Yemekler</p>
        <p className='slogan'>KOD ACIKTIRIR</p>
        <p className='slogan'>PIZZA, DOYURUR </p>
      </div>
      <div className="buttonCont">
        <Link to="/pizza" className="aciktim">
          ACIKTIM
        </Link>
      </div>
      </div>
  );
}

export default Anasayfa;
