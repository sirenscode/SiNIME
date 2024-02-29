"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Hls from "hls.js";
import videojs from "video.js";
import HomeComp from "./components/home";
import Trending from "./components/trendingAnime";
import NavBar from "./components/navbar";
export default function Home() {
  const[src, setSrc] = useState("");
  const searchUrl = "https://api.anify.tv/search/anime";
  
    
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar/>
      <Trending/>
    </main>
  );
}
