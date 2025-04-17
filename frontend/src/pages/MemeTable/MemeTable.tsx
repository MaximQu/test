import { MemeModal } from "@/components";
import { useMemes } from "@/services/memeContext/MemesPropvider";
import { Meme } from "@/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Button,
  useDisclosure,
  Modal,
} from "@heroui/react";
import { useRef } from "react";

const headerItemsStyles = "font-semibold";

const headerItems = [
  { title: "ID", className: `${headerItemsStyles}  text-center` },
  { title: "Name", className: headerItemsStyles },
  {
    title: "Amount of likes",
    className: `${headerItemsStyles} text-center`,
  },
  { title: "Actions", className: `${headerItemsStyles} text-center` },
];

const MemeTable = () => {
  const { memes, setMemes } = useMemes();

  const selectedMeme = useRef<Meme>({
    id: "",
    name: "",
    sourceLink: "",
    imageUrl: "",
    likes: 0,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChangeMeme = (updatedMeme: Meme) => {
    setMemes((prevMemes) => {
      return prevMemes.map((meme) => {
        return meme.id === updatedMeme.id ? { ...meme, ...updatedMeme } : meme;
      });
    });
  };

  const handleOpenModal = (id: string) => {
    const meme = memes?.find((meme: Meme) => meme.id === id);
    if (meme) {
      selectedMeme.current = meme;
      onOpen();
    }
  };

  return (
    <div className="py-6">
      <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
        Memes Table
      </h1>
      <Table
        isStriped
        className="m-auto w-full max-w-3xl rounded-xl text-sm text-gray-700 shadow-md"
        aria-label="Meme Table"
      >
        <TableHeader className="bg-gray-100">
          {headerItems.map((item, idx) => (
            <TableColumn
              key={idx}
              className={item.className}
              aria-label={item.title}
            >
              {item.title}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {memes.map(({ id, name, likes }) => (
            <TableRow key={id}>
              <TableCell className="p-0.5 text-center">{id}.</TableCell>
              <TableCell className="min-w-48 p-0.5">{name}</TableCell>
              <TableCell className="p-0.5 text-center">{likes}</TableCell>
              <TableCell className="py-1">
                <Button
                  size="md"
                  className="m-auto block cursor-pointer bg-gray-800 text-white"
                  radius="lg"
                  variant="faded"
                  aria-label={`Edit meme ${name}`}
                  onPress={() => handleOpenModal(id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        placement="center"
        backdrop="blur"
        classNames={{
          closeButton: ["cursor-pointer"],
        }}
      >
        <MemeModal
          selectedMeme={selectedMeme.current}
          onOpenChange={onOpenChange}
          onSave={(updatedMeme) => {
            handleChangeMeme(updatedMeme);
          }}
        />
      </Modal>
    </div>
  );
};

export default MemeTable;
