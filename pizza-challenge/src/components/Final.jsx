import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import "./Final.css";
import axios from "axios";

function Final() {
    return (
        <div className="bg">
      <div className="yazi">
        <p className="bas">Teknolojik Yemekler</p>
        <p className='slogan'>TEBRİKLER</p>
        <p className='slogan'>SİPARİŞİNİZ ALINDI!</p>
      </div>
      </div>
    )
}

export default Final;