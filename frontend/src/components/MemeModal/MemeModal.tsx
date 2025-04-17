import { FC } from "react";
import {
  Button,
  Form,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Meme } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";

type MemeModalProps = {
  selectedMeme: Meme;
  onOpenChange: () => void;
  onSave: (meme: Meme) => void;
};

const memeFormSchema = z.object({
  name: z
    .string()
    .min(3, "Please enter a name.")
    .max(100, "Name must be 100 characters or fewer."),
  sourceLink: z
    .string()
    .regex(/^https?:\/\/.*$/, "Please enter a valid URL (must start https)."),
  imageUrl: z
    .string()
    .regex(
      /^https?:\/\/.*\.(jpg|jpeg)$/,
      "Please enter a valid image URL ending in .jpg, .jpeg.",
    ),
  likes: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, "Likes cannot be negative.")
      .max(99, "Likes must be 99 or fewer."),
  ),
});

type MemeFormData = z.infer<typeof memeFormSchema>;

const MemeModal: FC<MemeModalProps> = ({
  selectedMeme,
  onOpenChange,
  onSave,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(memeFormSchema),
    defaultValues: selectedMeme,
  });

  const onSubmit = (data: MemeFormData) => {
    localStorage.setItem("selected_meme", JSON.stringify(data));
    onSave({ id: selectedMeme.id, ...data });
    onOpenChange();
  };

  return (
    <ModalContent className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
      {(onClose) => (
        <>
          <ModalHeader className="mb-4 p-0 text-xl font-semibold text-gray-800">
            Edit Meme
          </ModalHeader>
          <Form key={selectedMeme.id} onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="mb-4 w-full p-0">
              <Input
                type="text"
                size="md"
                label="Name"
                labelPlacement="outside"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <Input
                type="url"
                size="md"
                label="Source Link"
                labelPlacement="outside"
                isInvalid={!!errors.sourceLink}
                errorMessage={errors.sourceLink?.message}
                {...register("sourceLink")}
              />
              <Input
                type="url"
                size="md"
                label="Image (JPG URL)"
                labelPlacement="outside"
                isInvalid={!!errors.imageUrl}
                errorMessage={errors.imageUrl?.message}
                {...register("imageUrl")}
              />
              <Input
                type="number"
                size="md"
                inputMode="numeric"
                label="Amount of Likes"
                labelPlacement="outside"
                isInvalid={!!errors.likes}
                errorMessage={errors.likes?.message}
                min={0}
                max={99}
                {...register("likes")}
              />
            </ModalBody>
            <ModalFooter className="flex w-full justify-end gap-3 p-0">
              <Button
                variant="light"
                className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                Save
              </Button>
            </ModalFooter>
          </Form>
        </>
      )}
    </ModalContent>
  );
};

export default MemeModal;
