import { useEffect, useRef, useState } from "react";
import Gamestyle from "../styles/Game.module.css";
import { json } from "stream/consumers";

export default function Game(){
//define States
    let [box,setbox] = useState<String[]>(['','','','','','','','','']);
    let [game,setgame] = useState<string>('X');
    let [xcount,setxcount] = useState<number>(0);
    let [ocount,setocount] = useState<number>(0);
    let [Level,setlevel] = useState<string[]>(['Two','Three','Four','Five','six','Seven','Eight','Nine','Ten']);
    let [gcount,setgcount] = useState<number>(0)
    let [message,setmessage] = useState<string>('')

    
   //Define refs
    let titleref = useRef<HTMLDivElement>(null!);
   

  //Restart new Game  
  if(xcount == 3 || ocount == 3){
   
    titleref.current.innerHTML = 'Game finshed';
    setTimeout(function(){location.reload()},1650);
    setInterval(function(){titleref.current.innerHTML += '.'},1000);
   }


 
 

   //restart the game not full
   let restatt = () => {
    setgcount(gcount + 1)
    if(titleref.current.innerHTML != 'Game finshed'){
    setTimeout(() => {
      

      titleref.current.innerHTML = `level ${Level[gcount]}`;
    box[0] = ''; 
    box[1] = ''; 
    box[2] = ''; 
    box[3] = ''; 
    box[4] = ''; 
    box[5] = ''; 
    box[6] = ''; 
    box[7] = ''; 
    box[8] = ''; 
    setbox([...box])
    }, 700);
    
}
   }


//x and o tuurn 
let xo = () =>{
  if(game == 'X'){
    setgame('X')
  }else{
    setgame('X')
  }
}


  if(box[0] != '' && box[1] != '' && box[2] != '' && box[3] != '' && box[4] != '' && box[5] != '' && box[6] != '' && box[7] != '' && box[8] != ''){
    box[0] = ''; 
    box[1] = ''; 
    box[2] = ''; 
    box[3] = ''; 
    box[4] = ''; 
    box[5] = ''; 
    box[6] = ''; 
    box[7] = ''; 
    box[8] = ''; 
    titleref.current.innerHTML = 'Repeat the level';
    xo();
  }



 





//Main conditons funvtion    
    
let testresult = () => {
  if(game == 'X'){
    titleref.current.innerHTML = 'X winner'
    xo();
    setxcount(xcount + 1);
    restatt();
    
    
  //  restartfull();
    
    }else if(game == 'O'){

    titleref.current.innerHTML = 'O winner'
    xo();
    setocount(ocount + 1);
    restatt();
    
    
   // restartfull();
   }
}
    


//Fatherr of the logic
    let clicked = (i:number) => {
     
      if(game == 'X' && box[i] == ''){
       box[i] = 'X';
       setbox([...box]);
       setgame('O');
       titleref.current.innerHTML = 'O Turn';
       
       
      }else if(game == 'O' && box[i] == ''){
        box[i] = 'O';
        setbox([...box]);
        setgame('X');
        titleref.current.innerHTML = 'X Turn';
        
      }

      //if conditions

      if(box[0] != '' && box[0] == box[1] && box[1] == box[2]){
        
        testresult();
        
        
      }else if(box[3] != '' && box[3] == box[4] && box[4] == box[5]){
      
        testresult();
       

      }else if(box[6] != '' && box[6] == box[7] && box[7] == box[8]){
        
        testresult();
        
      }else if(box[0] != '' && box[0] == box[3] && box[3] == box[6]){
        
        testresult();
       
      }else if(box[1] != '' && box[1] == box[4] && box[4] == box[7]){
        
        testresult();
       
      }else if(box[2] != '' && box[2] == box[5] && box[5] == box[8]){
        
        testresult();
        
      }else if(box[0] != '' && box[0] == box[4] && box[4] == box[8]){
        
        testresult();
        
      }else if(box[2] != '' && box[2] == box[4] && box[4] == box[6]){
        
        testresult();
       
      }
      }



    
    //Boxs show
    const boxshow = box.map((items,i) => {
      return(
        <div key={Math.random()}   onClick={() => clicked(i)}> {items} </div>
      )
    })

    return(

        <div className={Gamestyle.main}>

        <div className={Gamestyle.content}>

          <div className={Gamestyle.title} ref={titleref}>X  O Game</div> 

           <div className={Gamestyle.result} >
           <h4>Score 3 to Win</h4>

            <div className={Gamestyle.score}> 
               <div> <span className={Gamestyle.x}> X</span>  <span className={Gamestyle.o}> O</span> </div>
               <div> <span className={Gamestyle.xscore}> {xcount} </span>  <span className={Gamestyle.oscore}> {ocount} </span> </div>
            </div>

           </div> 
            
          </div>
        
          <div className={Gamestyle.container}>
            {boxshow}
          </div> 

        </div>
    )
}