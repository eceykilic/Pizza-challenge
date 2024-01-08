import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import "./Siparis.css";
import axios from "axios";

function Siparis() {
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [adet, setAdet] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [special, setSpecial] = useState("");
  const [total, setTotal] = useState(85.5);
  const [secimler, setSecimler] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
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
  

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Manuel doğrulama işlemleri
    if (!size) {
      setErrorMessage("Lütfen bir boyut seçin.");
      return;
    }

    if (!crust || crust.length === 0) {
      setErrorMessage("Lütfen bir hamur seçin.");
      return;
    }

    if (!toppings || toppings.length < 4) {
      setErrorMessage("Lütfen en az 4 ek malzeme seçin.");
      return;
    }

    if (toppings.length > 10) {
      setErrorMessage("En fazla 10 ek malzeme seçebilirsiniz.");
      return;
    }

    if (!adet || adet <= 0) {
      setErrorMessage("Lütfen geçerli bir adet girin.");
      return;
    }

    // tüm koşulları sağlıyorsa gönder
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
        setErrorMessage("");
        navigate("/final");
      })
      .catch((error) => {
        console.error("Sipariş gönderilirken hata oluştu:", error);
      });
  };

  const handleToppingsChange = (event) => {
    const toppingName = event.target.value;
    const isChecked = event.target.checked;

    setToppings((currentToppings) => {
      const updatedToppings = isChecked
        ? [...currentToppings, toppingName]
        : currentToppings.filter((topping) => topping !== toppingName);

      // Ek malzemelerin toplam fiyatını hesaplayan fonksiyon
      const updatedTotal = calculateTotalPrice(adet, updatedToppings);
      setTotal(updatedTotal);

      return updatedToppings;
    });
  };


  useEffect(() => {
    setSecimler(toppings.length * adet * 5);
    setTotal(calculateTotalPrice(adet, toppings));
  }, [toppings, adet]);

  const calculateTotalPrice = (newAdet, updatedToppings) => {
    const anaFiyat = 85.5;
    const ekMalzemeFiyati = (updatedToppings?.length || 0) * 5;
    const toplamFiyat = (anaFiyat + ekMalzemeFiyati) * newAdet;
    return toplamFiyat;
  };

  const handleSpecialChange = (event) => {
    setSpecial(event.target.value);
  };

  const isButtonDisabled =
    !size || !crust || toppings.length < 4 || toppings.length > 10 || adet <= 0;

  return (
    <Form onSubmit={handleSubmit}>
    <div>
        <div className="header">
            <h2 className="teknolojik">Teknolojik Yemekler</h2>
            <Nav className="navKismi">
              <NavItem>
                <NavLink tag={Link} to="/">
                  Anasayfa
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={Link}
                  to="/pizza"
                  style={{ fontWeight: "bold" }}
                >
                  Sipariş Oluştur
                </NavLink>
              </NavItem>
            </Nav>
        </div>
        <div className="icerik">
        <div className="siparis-body griYazi">
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
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta
            denir.
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
                    id="size-radio"
                    checked={size === "small"}
                    onChange={() => setSize("small")}
                  />{" "}
                  Küçük
                </Label>
                <br />
                <Label check className="boyutlar">
                  <Input
                    type="radio"
                    name="boyut"
                    value="medium"
                    id="size-radio"
                    checked={size === "medium"}
                    onChange={() => setSize("medium")}
                  />{" "}
                  Orta
                </Label>
                <br />
                <Label check className="boyutlar">
                  <Input
                    type="radio"
                    name="boyut"
                    value="large"
                    id="size-radio"
                    checked={size === "large"}
                    onChange={() => setSize("large")}
                  />{" "}
                  Büyük
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
            <p className="ekMalzemeBaslik">Ek Malzemeler</p>
            <br />
            <br />
            <p className="ekMalzeme acikGri">
              En fazla 10 malzeme seçebilirsiniz. 5₺
            </p>
            <br />
            <br />
            <div className="ekMalzemeContainer">
              <div className="row">
              
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Pepperoni"
                    checked={toppings.includes("Pepperoni")}
                  />
                  <Label check className="sebzeler">
                    Pepperoni
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Sosis"
                    checked={toppings.includes("Sosis")}
                  />
                  <Label check className="sebzeler">
                    Sosis
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="KanadaJambonu"
                    checked={toppings.includes("Kanada Jambonu")}
                  />
                  <Label check className="sebzeler">
                    Kanada Jambonu
                  </Label>
                </FormGroup>
              </div>
              <br />
              <div className="row">
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="TavukIzgara"
                    checked={toppings.includes("Tavuk Izgara")}
                  />
                  <Label check className="sebzeler">
                    Tavuk Izgara
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Soğan"
                    checked={toppings.includes("Soğan")}
                  />
                  <Label check className="sebzeler">
                    Soğan
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Domates"
                    checked={toppings.includes("Domates")}
                  />
                  <Label check className="sebzeler">
                    Domates
                  </Label>
                </FormGroup>
              </div>
              <br />
              <div className="row">
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Mısır"
                    checked={toppings.includes("Mısır")}
                  />
                  <Label check className="sebzeler">
                    Mısır
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Sucuk"
                    checked={toppings.includes("Sucuk")}
                  />
                  <Label check className="sebzeler">
                    Sucuk
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Jalepeno"
                    checked={toppings.includes("Jalepeno")}
                  />
                  <Label check className="sebzeler">
                    Jalepeno
                  </Label>
                </FormGroup>
              </div>
              <br />
              <div className="row">
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Sarımsak"
                    checked={toppings.includes("Sarımsak")}
                  />
                  <Label check className="sebzeler">
                    Sarımsak
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Biber"
                    checked={toppings.includes("Biber")}
                  />
                  <Label check className="sebzeler">
                    Biber
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Sucuk"
                    checked={toppings.includes("Sucuk")}
                  />
                  <Label check className="sebzeler">
                    Sucuk
                  </Label>
                </FormGroup>
              </div>
              <br />
              <div className="row">
                <FormGroup check inline name="toppings" className="col">
                  <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Ananas"
                    checked={toppings.includes("Ananas")}
                  />
                  <Label check className="sebzeler">
                    Ananas
                  </Label>
                </FormGroup>
                <FormGroup check inline name="toppings" className="col">
                  <div className="kabak">
                    <Input
                    type="checkbox"
                    onChange={handleToppingsChange}
                    value="Kabak"
                    checked={toppings.includes("Kabak")}
                  />
                    <Label check>Kabak</Label>
                  </div>
                </FormGroup>
              </div>
            </div>
          
        </div>
      
      <div className="siparisNotu">
        <FormGroup>
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
                  setAdet(adet - 1);
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
                onClick={() => setAdet(adet + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="siparis-bolumu genis">
            
              <FormGroup>
                <Label>Sipariş Toplamı</Label>
              </FormGroup>
              <FormGroup className="secimler">
                <span>Seçimler:</span> <span>{secimler} ₺</span>
              </FormGroup>
              <FormGroup className="secimler" style={{ color: "#ce2829" }}>
                <span>Toplam:</span> <span>{total} ₺</span>
              </FormGroup>

              <Button id="order-button" type="submit" disabled={isButtonDisabled}>
                SİPARİŞ VER
              </Button>
    
          </div>
        </div>
      </div>
        </div>
    </div>
    </Form>
  );
}

export default Siparis;
