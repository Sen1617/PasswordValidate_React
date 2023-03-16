import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main.css';

export default function Main() {
  /**useState for the states of the values changing */
    const[password,setPassword]=useState('');
    const[result,setResult]=useState('');
    const[steps,setSteps]=useState(''); 
    const[outval,setOutval]=useState('');
    const[show,setShow]=useState(false);
    const[saved,setSaved]=useState(false);
    const[stext,setStext]=useState()
    const[style,setStyle]=useState();
    const successstyle={color: "#15883e"};
    const failurestyle={color: "rgb(227, 28, 28)"};
  
    function changeval(e){
      setPassword(e.target.value)
    }
    function changeresult(e){
      setResult(e)
    }
    function changesteps(e){
      setSteps(e)
    }
    function changeoutval(e){
      setOutval(e)
    }

  /**function to send data to api */
  async function senddata(){
    var jsondata={"passval":password,"strength":result,"minsteps":outval};
    const response = await fetch('http://localhost:8080/api',{
      method:'POST',
      body:JSON.stringify(jsondata),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data= await response.json();
    if(data){
      setSaved(true);
      setStext("saved successfully");
      setStyle(true);
      setPassword("");
    }
    else{
      setSaved(false);
      setStext("Not saved, Try Later");
      setStyle(false);
      setPassword("");
    }
  }

  /*function to validate the password */
    function validate(){
      if(password===""){
        return
      }
  /*variables*/
      var up=0,lo=0,nu=0,tot=0,equ=0;
      var len=password.length;
  /*reading each character to identify up,lo,nu is present or not */
      for(let i=0;i<=len;i++){
        var cc=password.charCodeAt(i);
        if(cc>=65 && cc<=90){up++;}
        if(cc>=97 && cc<=122){lo++;}
        if(cc>=48 && cc<=57){nu++;}
      }
  /* variables for calculating total value to return(tot)
     and equ variable for identify number of three character equals are present */
          if(up<1){tot++;}
          if(lo<1){tot++;}
          if(nu<1){tot++;}
      for(let i=0;i<=len-2;i++){
          var t1=password.charCodeAt(i);
          var t2=password.charCodeAt(i+1);
          var t3=password.charCodeAt(i+2);
          if((t1===t2)&&(t1===t3)){equ++;}
      }
  /*validating length and up,lo,nu present or not */
      if((len>=6 && len<=20) && (up>=1 && lo>=1 && nu>=1)){
        if(equ===0){
          changeresult("Strong Password");
          changesteps("minimum steps : 0");
          changeoutval("0");
        }
        else{
          changeresult("Weak Password");
          changesteps("minimum steps : "+equ);
          changeoutval(equ);
        }
      }
      /*if length is greater than 20*/
      else if(len>20){
        var less=len-20;
        less+=tot+equ;
        changeresult("Weak Password");
        changesteps("minimum steps : "+less);
        changeoutval(less);
      }
      /*if ength is lesser than 6*/
      else if(len<=6){
        var high=6-len;
        high+=equ;
            if(up>=1 && lo>=1 && nu>=1){
              changeresult("Weak Password");
              changesteps("minimum steps : "+high);
              changeoutval(high);
            }
            else if(tot===high || tot>high){
              changeresult("Weak Password");
              changesteps("minimum steps : "+tot); 
              changeoutval(tot);   
            }
            else if(tot<high){
              changeresult("Weak Password");
              changesteps("minimum steps : "+high);
              changeoutval(high);
            }
    }
    /*when length is correct but something is not present up,lo,nu*/
    else{
      changeresult("Weak Password");
      changesteps("minimum steps : "+tot); 
      changeoutval(tot);
  }
setShow(true);
}
  return (
    <div className='Main'>
      <div className="container">
        <label htmlfor="password">PASSWORD VALIDATE</label>
        <input type="text" placeholder="Enter password" onChange={changeval} autoComplete="off" value={password} name="passwird" id="passwird"/>
        <button onClick={validate} id="check">Validate</button>
        <p id="output">{result}<br></br>{steps}</p>
        {show?
            <div className='linkbtn'>
            <button className='save' onClick={senddata}>save</button> 
            <Link className='show' to={'getall'}>show</Link>
            </div>:null
        }
        {saved?<div style={style?successstyle:failurestyle}><p>{stext}</p></div>:null}
      </div>
    </div>
  )
}
