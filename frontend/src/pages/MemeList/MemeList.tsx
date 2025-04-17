import { useMemes } from "@/services/memeContext/MemesPropvider";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Link,
  CardFooter,
} from "@heroui/react";
import { FC } from "react";

const MemeList: FC = () => {
  const { memes } = useMemes();

  return (
    <div className="py-6">
      <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
        Memes List
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {memes?.map((meme) => (
          <Card
            key={meme.id}
            as="article"
            className="flex w-full flex-col items-center overflow-hidden rounded-xl p-2 shadow-md"
          >
            <CardHeader className="flex justify-center">
              <Image
                isBlurred
                className="h-48 object-cover"
                src={meme.imageUrl}
                fallbackSrc="https://placehold.co/300x150"
                alt={meme.name || "Meme image"}
              />
            </CardHeader>
            <CardBody className="space-y-2 p-4">
              <h3 className="text-lg font-semibold">{meme.name}</h3>
              <p className="text-sm text-gray-600">Likes: {meme.likes}</p>
            </CardBody>
            <CardFooter>
              <Link
                className="flex gap-1 text-sm text-blue-600 hover:underline"
                href={meme.sourceLink}
                aria-label={`Explore meme ${meme.name}`}
                isExternal
                showAnchorIcon
              >
                Explore meme
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemeList;
