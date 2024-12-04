import {
  Box,
  Image,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  Input,
} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../../store/product";
import React from "react";
import { getProducts } from "../../../backend/controller/productControllers";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct } = useProductStore();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const handleDeleteProduct = async (pid) => {
    const result = await deleteProduct(pid);
    if (result.status === 200) {
      getProducts();
    }
  };
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const { updateProduct, getProducts } = useProductStore();
  // Submit the updated Infomation
  const submitUpdate = (pid, updateInfo) => {
    updateProduct(pid, updateInfo);
    onClose();
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
      </Box>
      <Text fontWeight="bold" fontSize="xl" mb={4} color={textColor}>
        ${product.price}
      </Text>
      <HStack spacing={2}>
        <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => handleDeleteProduct(product._id)}
          colorScheme="red"
        />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{updatedProduct.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                placeContent="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
              <Input
                placeContent="IMAGE URL..."
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => submitUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
