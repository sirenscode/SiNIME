import axios from "axios";
import AnimeCard from "./AnimeCard";
import { useEffect, useState } from "react";
import Card from "./Card";

interface TrendProps{
    title: string
}
const Trending: React.FC = () =>{
    const [trenddata, setTrendData] = useState([]);
    const [recent, setRecent] = useState([]);
    const [movies, setMovies] = useState([]);
    const [top, setTop] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [format, setFormat] = useState("");
    const [releasing, setReleasing] = useState("");
    const [date, setDate] = useState("");
    const [topAiring, setTopAiring] = useState([]);
    const query = `
      query {
        Page(page: 1, perPage: 24) {
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            title {
              romaji
              english
            }
            description
            bannerImage
            popularity
            coverImage {
                large
                medium
              }
            streamingEpisodes{
                title
                url
                site
            }
            status
            format
            startDate {
                year
                month
                day
              }
          }
        }
      }
    `;
    
    function getMonthName(month: number): string {
        const date = new Date(2000,month-1);
        return date.toLocaleString('en-US',{month: 'long'});
    }
    function truncateString(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
          return str; 
        } else {
          return str.substring(0, maxLength - 3) + '...';
        }
      }
    const url = 'https://graphql.anilist.co';
    const fetchTrending = async() =>{
        const trendingData = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({query})
        })
        .then(res=>res.json())
        .then(data=>{
            setTrendData(data.data.Page.media);
            setTop(data.data.Page.media[1]);
            setTitle(data.data.Page.media[1].title.english);
            const desr = truncateString((data.data.Page.media[1].description),300);
            console.log("TRU: ",desr)
            setDescription(desr);
            setImage(data.data.Page.media[1].bannerImage)
            setFormat(data.data.Page.media[1].format);
            setReleasing(data.data.Page.media[1].status)
            const streamDate = `${data.data.Page.media[1].startDate.day} ${getMonthName(data.data.Page.media[1].startDate.month)} ${data.data.Page.media[1].startDate.year}`;
            setDate(streamDate)
            console.log(data)
            document.getElementById("description")!.innerHTML=desr;
        });
        trendingData;
        }
    const recentUrl = `https://gogoanime-7rrx.onrender.com/recent-release`;
    const fetchRecent = async() =>{
        const recentData = await fetch(recentUrl,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .then(data=>setRecent(data.slice(0,10)));
        recentData;
    }
    const movieUrl = `https://gogoanime-7rrx.onrender.com/recent-release`;
    const fetchMovies = async() =>{
        const movieData = await fetch(movieUrl,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .then(data=>setMovies(data));
        movieData;
    }
    const fetchTopAiring = async() =>{
        const topData = await fetch("https://gogoanime-7rrx.onrender.com/top-airing",{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
            
        })
        .then(res=>res.json())
        .then(data=>setTopAiring(data));
        topData;
    }
        

    useEffect(()=>{
        fetchTrending();
        fetchRecent();
        fetchTopAiring();
        fetchMovies();
        
    },[]);
    
    console.log("REVENTR:",topAiring);
    return(
        <div className="w-full h-full flex flex-row flex-wrap gap-[20px] items-center justify-center">
            {top && <div className="intro w-full h-[100vh] flex flex-col z-[20] justify-center bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)] bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url('${image}')`}}>
            <div className="text-[#fff] w-3/4 p-[50px] absolute font-['Roboto'] flex flex-col gap-[10px] mt-[100px]">
                    <h1 className="text-[2em] font-bold">{title}</h1>
                    <div className="flex flex-row gap-[20px] font-semilight">
                        <div className="flex flex-row items-center gap-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6h-3.59l2.3-2.29a1 1 0 1 0-1.42-1.42L12 5.59l-3.29-3.3a1 1 0 1 0-1.42 1.42L9.59 6H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3m1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Z"/></svg>
                            <span className="">{format}</span>
                        </div>
                        
                        <span className="text-[#2FC867]">{releasing}</span>
                        <div className="flex flex-row items-center justify-center gap-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414C3.172 5 4.114 5 6 5h12c1.886 0 2.828 0 3.414.586C22 6.172 22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414C3.172 22 4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586C22 20.828 22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3"/></g></svg>
                            <span className="">{date}</span>
                        </div>
                    </div>
                    <p id="description" className="w-3/4 text-[#e1e2e1]">{}</p>
                    <button className="bg-[#4D148C] p-2 rounded-3xl w-[150px] flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16M9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664z" clip-rule="evenodd"/></svg>
                        <span>Play Now</span>
                    </button>
                </div>
            </div>
            }
            <div className="flex flex-col w-full items-center gap-[80px]">
                <div className="w-full flex flex-col items-center">
                    <div className="flex flex-row w-3/4 items-center gap-[10px]">
                        <div className="h-[40px] w-[5px] bg-[#fff] rounded-3xl"></div>
                        <h1 className="text-[#fff] w-3/4 text-[1.5em] font-[500]">Trending Now</h1>

                    </div>
                    
                    <div className="w-3/4 flex flex-col ">
                        <div className="w-full h-[300px] overflow-x-auto overflow-hidden flex flex-row gap-[20px] items-center justify-center">
                            {trenddata.map((data,index)=>(
                                <AnimeCard title={data.title.english} key={index} background={data.coverImage.large}/>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex w-full items-center flex-col">
                    <div className="flex flex-row w-3/4 items-center gap-[10px]">
                        <div className="h-[40px] w-[5px] bg-[#fff] rounded-3xl"></div>
                        <h1 className="text-[#fff] w-3/4 text-[1.5em] font-[500]">Anime Movies</h1>

                    </div>
                    <div className="w-3/4 flex flex-col ">
                        <div className="w-full h-[300px] overflow-x-auto overflow-hidden flex flex-row gap-[20px] items-center justify-center">
                            {movies.map((data,index)=>(
                                <AnimeCard title={data.animeTitle} key={index} background={data.animeImg}/>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row w-3/4 gap-[50px]">
                    <div className="flex flex-col w-1/2 gap-[10px] text-[#fff]">
                        <div className="flex flex-row w-3/4 items-center gap-[10px]">
                            <div className="h-[40px] w-[5px] bg-[#fff] rounded-3xl"></div>
                                <h1 className="text-[#fff] w-3/4 text-[1.5em] font-[500]">Top Airing</h1>
                            </div>
                        {topAiring.map((data,index)=>(
                            <Card title={data.animeTitle} imageUrl={data.animeImg} latestEps={data.latestEp}/>
                        ))}
                    </div>
                    <div className="flex flex-col w-1/2 gap-[10px] text-[#fff]">
                        <div className="flex flex-row w-3/4 items-center gap-[10px]">
                            <div className="h-[40px] w-[5px] bg-[#fff] rounded-3xl"></div>
                                <h1 className="text-[#fff] w-full text-[1.5em] font-[500]">Recent Episodes</h1>
                            </div>
                        {recent.map((data,index)=>(
                            <Card title={data.animeTitle} imageUrl={data.animeImg} latestEps={data.latestEp}/>
                        ))}
                    </div>
                
                </div>
            </div>
            
        </div>
    )
}

export default Trending;