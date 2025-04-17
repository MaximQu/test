import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Meme {
  id: string;
  name: string;
  sourceLink: string;
  imageUrl: string;
  likes: number;
}

interface MemesContextType {
  memes: Meme[];
  setMemes: React.Dispatch<React.SetStateAction<Meme[]>>;
}

const MemesContext = createContext<MemesContextType | undefined>(undefined);

const memesList: Meme[] = [
  {
    id: "1",
    name: "Dat Boi",
    sourceLink: "https://knowyourmeme.com/memes/dat-boi",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/020/401/HereDatBoi.jpg",
    likes: 76,
  },
  {
    id: "2",
    name: "Doge",
    sourceLink: "https://knowyourmeme.com/memes/doge",
    imageUrl: "https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg",
    likes: 54,
  },
  {
    id: "3",
    name: "Pepe the Frog",
    sourceLink: "https://knowyourmeme.com/memes/pepe-the-frog",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/017/618/pepefroggie.jpg",
    likes: 22,
  },
  {
    id: "4",
    name: "Ugandan Knuckles",
    sourceLink: "https://knowyourmeme.com/memes/ugandan-knuckles",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/025/067/ugandanknuck.jpg",
    likes: 95,
  },
  {
    id: "5",
    name: "Yao Ming Face",
    sourceLink: "https://knowyourmeme.com/memes/yao-ming-face-bitch-please",
    imageUrl: "https://i.kym-cdn.com/entries/icons/mobile/000/004/006/YUNO.jpg",
    likes: 65,
  },
  {
    id: "6",
    name: "Trollface",
    sourceLink: "https://knowyourmeme.com/memes/trollface",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/000/091/TrollFace.jpg",
    likes: 5,
  },
  {
    id: "7",
    name: "Studio Ghibli AI Generator",
    sourceLink: "https://knowyourmeme.com/memes/studio-ghibli-ai-generator",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/053/601/gm8d8.jpg",
    likes: 22,
  },
  {
    id: "8",
    name: "Tralalero Tralala",
    sourceLink: "https://knowyourmeme.com/memes/tralalero-tralala",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/053/192/tralalero_tral.jpg",
    likes: 77,
  },
  {
    id: "9",
    name: "Bombardiro Crocodilo",
    sourceLink:
      "https://knowyourmeme.com/memes/bombardiro-crocodilo-italian-brainrot",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/053/420/Bombardiro_crocodilo_cover.jpg",
    likes: 54,
  },
  {
    id: "10",
    name: "Chimpanzini Bananini",
    sourceLink:
      "https://knowyourmeme.com/memes/chimpanzini-bananini-italian-brainrot",
    imageUrl:
      "https://i.kym-cdn.com/entries/icons/mobile/000/053/659/chimpanzini_bannanini.jpg",
    likes: 11,
  },
];

export const MemesProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>(() => {
    const storedMemes = localStorage.getItem("memes");
    return storedMemes ? JSON.parse(storedMemes) : memesList;
  });

  useEffect(() => {
    localStorage.setItem("memes", JSON.stringify(memes));
  }, [memes]);

  return (
    <MemesContext.Provider value={{ memes, setMemes }}>
      {children}
    </MemesContext.Provider>
  );
};

export const useMemes = () => {
  const context = useContext(MemesContext);
  if (!context) {
    throw new Error("useMemes must be used within a MemesProvider");
  }
  return context;
};
