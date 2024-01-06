import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';
import "./SiparisFormu.css"
import axios from "axios";

const toppingsPrices = {
  Pepperoni: 5,
  Sosis: 5,
  KanadaJambonu: 5,
  TavukIzgara: 5,
  Soğan: 5,
  Domates: 5,
  Mısır: 5,
  Sucuk: 5,
  Jalepeno: 5,
  Sarımsak: 5,
  Biber: 5,
  Ananas: 5,
  Kabak: 5,
};
    


  function SiparisFormu () {  
    
    const [size, setSize] = useState("");
    const [crust, setCrust] = useState("");
    const [selectedCrust, setSelectedCrust] = useState("");
    const [adet, setAdet] = useState(1);
    const [toppings, setToppings] = useState([]);
    const [special, setSpecial] = useState("");
    const [total, setTotal] = useState(85.5);
    const [secimler, setSecimler] = useState(0.0);
    const [errorMessage, setErrorMessage] = useState("");
  
  const history = useHistory();
  const pizzaBasePrice = 85.5;

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = {};

    if (!Array.isArray(toppings) || toppings.length > 3) {
      errors.toppings = "En fazla 3 seçenek seçilebilir.";
    }

    if (Object.keys(errors).length === 0) {
      const order = {
        size,
        toppings,
        special,
        Fiyat: total,
        adet,
      };

      axios
        .post("https://reqres.in/api/users", order)
        .then((response) => {
          console.log("Sipariş başarıyla gönderildi:", response);
          setSize("");
          setToppings([]);
          setSpecial("");
          history.push("/success");
        })
        .catch((error) => {
          console.error("Sipariş gönderilirken hata oluştu:", error);
        });
    } else {
      console.log("Formda hata var:", errors);
    }
  };

  const handleToppingsChange = (event) => {
    const selectedToppings = Array.from(
      document.querySelectorAll('input[name="toppings"]:checked')
    ).map((input) => input.value);
    setToppings(selectedToppings);
  
    // Toplam fiyatı güncelle
    const ekParalar = selectedToppings.length * 5;
    setTotal(pizzaBasePrice + ekParalar * adet);
  
    // Seçimleri güncelle
    setSecimler(ekParalar * adet);
  };

  const handleAdetChange = (newAdet) => {
    setAdet(newAdet);
  
    // Seçimleri güncelle
    let secimler = toppings.length * newAdet * 5;
    setSecimler(secimler);
  
    // Toplam fiyatı güncelle
    let total = (pizzaBasePrice + toppings.length * 5) * newAdet;
    setTotal(total);
  };

  const handleSpecialChange = (event) => {
    setSpecial(event.target.value);
  };
  
    
    return(
      <>
      <div className="main">
      <div className="container">
      <div className="header">
        <h2>Teknolojik Yemekler</h2>
      <Nav className="navKismi">
        <NavItem>
        <NavLink tag={Link} to="/" className="ustMenu">Anasayfa</NavLink>
        </NavItem>
        <p>-</p>     
        <NavItem>
        <NavLink tag={Link} to="/order-pizza" style={{ fontWeight: "bold" }} className="ustMenu">
          Sipariş Oluştur
        </NavLink>
        </NavItem>
    </Nav>
        </div>
        </div>

    <div className="siparis-body griYazi" >
      <br />
      <h5>Position Absolute Acı Pizza</h5>
      <br />
      <div className="fiyatVePuan">
        <h4 style={{ fontWeight: "bold" }}>85,50 ₺</h4>
        <p className="puan acikGri">4.9</p>
        <p className="yorumSayisi acikGri">(200)</p>
      </div>
      <br />
      <p className="acikGri">
      Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
      </p>
      <br />
    </div>
    
  <div className="boyutVeHamur">
  <div className="row">
    <div className="col">
      <FormGroup check>
        <p className="secenekBasligi">Boyut Seç *</p>
        <br />
        <Label check className="boyutlar">
          <Input
            type="radio"
            name="boyut"
            value="small"
          />
          {' '}Küçük
        </Label>
        <br />
        <Label check className="boyutlar">
          <Input
            type="radio"
            name="boyut"
            value="medium"
          />
          {' '}Orta
        </Label>
        <br />
        <Label check className="boyutlar">
          <Input
            type="radio"
            name="boyut"
            value="large"
          />
          {' '}Büyük
        </Label>
      </FormGroup>
    </div>
    <div className="col offset-md-3">
      <div className="hamurContainer">
        <FormGroup row>
          <legend className="secenek">Hamur Seç *</legend>
          <br />
          <br />
          <Col sm={10} className="secenek">
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={crust}
              onChange={(event) => setCrust(event.target.value)}
            >
              <option value="">Hamur seç</option>
              <option value="Kalın">Kalın</option>
              <option value="Normal">Normal</option>
              <option value="İnce">İnce</option>
            </Input>
          </Col>
        </FormGroup>
      </div>
    </div>
  </div>
</div>
<div className="ekstra">
<Form>
<p className="ekMalzemeBaslik">Ek Malzemeler</p>
<br />
<br />
<p className="ekMalzeme acikGri">En fazla 10 malzeme seçebilirsiniz.  5₺</p>
<br />
<br />
<div className="ekMalzemeContainer">
<div className="row">
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Pepperoni
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Sosis
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Kanada Jambonu
    </Label>
  </FormGroup>
  </div>
  <br />
  <div className="row">
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Tavuk Izgara
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} value={5} />
    <Label check className="sebzeler">
      Soğan
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Domates
    </Label>
  </FormGroup>
  </div>
  <br />
  <div className="row">
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Mısır
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Sucuk
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Jalepeno
    </Label>
  </FormGroup>
  </div>
  <br />
  <div className="row">
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Sarımsak
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Biber
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Sucuk
    </Label>
  </FormGroup>
  </div>
  <br />
  <div className="row">
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check className="sebzeler">
      Ananas
    </Label>
  </FormGroup>
  <FormGroup
    check
    inline
    name="toppings"
    className="col"
    onChange={handleToppingsChange}
  >
    <div className="kabak">
    <Input type="checkbox" onChange={handleToppingsChange} />
    <Label check>
      Kabak
    </Label>
    </div>
  </FormGroup>
  </div>
  </div>
</Form>
</div>
</div>
<div className="siparisNotu">
<FormGroup >
    <Label for="siparisNotu">
    <p className="siparisBaslik">Sipariş Notu</p>
    </Label>
    <Input
      id="special-text"
      name="special-text"
      type="text"
      placeholder="Siparişine eklemek istediğin bir not var mı?"
      style={{ height: "60px", width: "100%" }}
      onChange={handleSpecialChange}
    />
</FormGroup>
<div className="cizgi">
<hr />
</div>
<div className="artiEksi">
<div>
<Button
  className="minus-button"
  type="button"
  onClick={() => {
    if (adet > 1) {
      handleAdetChange(adet - 1);
    }
  }}
>
  -
</Button>
</div>
<div className="altKisim">
<div className="adet-kutusu">
    <p className="adet-sayisi">{adet}</p>
</div>
<div>
<Button
  className="plus-button"
  type="button"
  onClick={() => handleAdetChange(prevAdet => prevAdet + 1)}
>+</Button>
</div>
</div>

<div className="siparis-bolumu">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Sipariş Toplamı</Label>
        </FormGroup>
        <FormGroup className="secimler">
          <span>Seçimler:</span> <span>{secimler} ₺</span>
        </FormGroup>
        <FormGroup className="secimler" style={{ color: "#ce2829" }}>
          <span>Toplam:</span> <span>{total} ₺</span>
        </FormGroup>

        <Button id="order-button" type="submit">
          SİPARİŞ VER
        </Button>
      </Form>
    </div>


</div>
</div>





</>
)
    
}

export default SiparisFormu;
