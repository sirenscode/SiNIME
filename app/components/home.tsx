import { useEffect, useState } from "react";

const HomeComp: React.FC = () =>{
    const [top, setTop] = useState([]);
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");
    useEffect(()=>{
        const url = "https://gogoanime-7rrx.onrender.com/top-airing";
        async function fetchData(){
          await fetch(url)
          .then(res=>res.json())
          .then(data=>setTop(data));
        }
        fetchData();     
      },[]);  
      useEffect(()=>{
        try{
            setTitle(top[0].animeTitle);
            setId(top[0].animeId);
            
        }catch(e){
            console.log("ERROR")
        }
      },[top]);

      useEffect(()=>{
        async function getTopAnime(){
            console.log(id);
            await fetch(`https://gogoanime-7rrx.onrender.com/thread/ore-dake-level-up-na-ken?page=1`)
            .then(res=>res.json())
            .then(data=>console.log(data));
        }
        getTopAnime();
      },[]);
    return(
        <div className="fixed w-full min-h-screen bg-red-500 flex flex-col items-center justify-center">
            {title && <h1 className="">{title}</h1>}
        </div>
    
    )
}

export default HomeComp;