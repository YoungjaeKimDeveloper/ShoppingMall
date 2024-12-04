import React, { useState } from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/product";

//
const CreatePage = () => {
  const { createProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "ERROR",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8} size={"2xl"} textAlign={"center"} mb={8}>
        <Heading as={"h2"}>Create new Product</Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button
              colorScheme="blue"
              onClick={() => handleAddProduct(newProduct)}
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
