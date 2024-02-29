import Image from "next/image";

interface CardProps{
    title: string;
    background: string
}

const AnimeCard: React.FC<CardProps> = ({title,background}) =>{
    return(
            <div className="image cursor-pointer  w-[150px] flex-shrink-0 flex-grow-0 h-full text-[#fff] rounded-lg flex  bg-cover bg-center flex flex-col duration-300 hover:scale-105">
                
                <img alt={title}  src={background}  className="w-full h-full rounded-lg"/>
                
                <h1 className="mt-[auto] w-full text-center p-2 font-['Roboto']">{title}</h1>
            </div>  
            
        

    )
}

export default AnimeCard;