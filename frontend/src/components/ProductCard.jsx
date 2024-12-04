import {
  Box,
  Image,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../../store/product";
import React from "react";
import { getProducts } from "../../../backend/controller/productControllers";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const handleDeleteProduct = async (pid) => {
    const result = await deleteProduct(pid);
    if (result.status === 200) {
      getProducts();
    }
  };
  const toast = useToast();
  const onOpen = () => {
    console.log("Open");
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
    </Box>
  );
};

export default ProductCard;
