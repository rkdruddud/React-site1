import React,{useEffect, useState} from "react";
import "../menuScreens/Home.css";
import Product from "./Product";
import {Link, Route} from "react-router-dom";
import Image1 from "../images/image1.jpg";
import Image2 from "../images/image2.jpg";
import Image3 from "../images/image3.jpg";
import Image4 from "../images/image4.jpg";
import Image5 from "../images/image5.jpg";
import backgroundIMG from "../images/eximg.jpg";
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
<div className="title_homeimg">My Stroy</div>
<div className="innerText_homeimg">나만의 여행 기록을 남겨봐요.</div>
<img className="homeimg"  src={backgroundIMG} style={{
    backgroundPositionY: -position/2,
  }}></img>
</div>

<div className="box1">

  <div className="blind" ></div>


  <div className="plancard" style={{
    transform:`translateY(${-position*2.4}px)`,
    opacity: (position-190)/50,
  }}> <div className="EXtext">@keyframes를 이용하여 애니메이션 중간중간의 특정 지점들을 거칠 수 있는</div></div>

</div>

<div className="box2" >

<div className="img3" style={{
    transform:`translateX(${-position}px)`,
    
  }} >

</div>

</div>

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
    )
}
export default Home;