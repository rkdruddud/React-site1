import React,{useEffect, useState} from "react";
import "../menuScreens/Home.css";
import Product from "./Product";
import {Link, Route} from "react-router-dom";
import Image1 from "../images/image1.jpg";
import Image2 from "../images/image2.jpg";
import Image3 from "../images/image3.jpg";
import Image4 from "../images/image4.jpg";
import Image5 from "../images/image5.jpg";
import backgroundIMG from "../images/backimg1.jpg";
import vector from "../images/vector1.png";
import ground from "../images/ground.jpg";
const Home = () => {
  
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    console.log(window.scrollY);
    setPosition(window.scrollY);  
  }

  useEffect(()=>{

    window.addEventListener("scroll", onScroll);

    return ()=>{
      window.removeEventListener("scroll",onScroll);
    };
  },[]);
  
   
   return (
<div className="fullContainer">
  
<div className="HomeImageContainer" >
<div className="TextAreaWrap" style={{
   opacity:(125-position),
   transition:"3s"
}}>
<h1 style={{marginLeft:"120px"}}> MyStroy에 오신것을 환영합니다.
                </h1>
                <h2 style={{marginLeft:"250px"}}>나만의 여행 기록을 남겨봐요.</h2>
</div>


<div className="backgoundIMGContainer" style={{
  transform: `translateY(${(position-480)*1.2}px)`,
  opacity:(464-position),
  height:`{position/0.1}rem`,
  transition:"2s"
}}>
<img className="homeimg"  src={backgroundIMG} ></img>

</div>
<img className="vector" src={vector} style={{
  transform: `translateY(${-position*1.2}px)`,
  transition:"3s"
  }}></img>


</div>
<div className="blind" style={{
  transform: `translateY(${-position*1.2}px)`,
  transition:"3s"
  }}>



    <img src={ground} className="groundImg"></img>
    
    

</div>
<div className="box1" >

</div>

<div className="imageCardfullContainer">
<div className="imageContainer" >
  <div className="imageCard" >
  <img className="sampleimg1" src={Image1} ></img>
  <div className="imgText"> 샘플 사진 1번<br/><a href="./Product">Learn more</a></div>
  </div>
  <div className="imageCard">
  <img className="sampleimg2" src={Image2}></img>
  </div>
  <div className="imageCard">
  <img className="sampleimg3" src={Image3}></img>
    <div className="imgText"> hello</div>
  </div>
  <div className="imageCard">
  <img className="sampleimg1" src={Image1}></img>
  </div>
  <div className="imageCard">
  <img className="sampleimg4" src={Image4}></img>
  </div>
  <div className="imageCard">
  <img className="sampleimg4" src={Image5}></img>
  </div>
  
</div>

</div>

</div>
    )
}
export default Home;