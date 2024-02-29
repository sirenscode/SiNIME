import Image from "next/image";

interface CardProps{
    title: string;
    imageUrl: string;
    latestEps: string;
}

const Card: React.FC<CardProps> = ({title,imageUrl,latestEps}) =>{
    return(
        <div className=" bg-[#18181B] flex flex-row gap-[20px] p-[10px] rounded-lg cursor-pointer hover:bg-[#12121A]">
            <img src={imageUrl} className="rounded-lg" height={100} width={50}/>
            <div className="flex flex-col">
                <h1>{title}</h1>
                <p className="">{latestEps}</p>
            </div>
            
        </div>
    )
}

export default Card;