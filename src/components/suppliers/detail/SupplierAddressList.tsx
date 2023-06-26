import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Heading,
  Input,
  ListItem,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  UnorderedList,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import {CheckIcon, CloseIcon} from "@chakra-ui/icons"
//import {ComposedProduct, GetComposedProduct} from "../../../services/ordercloud.service"
//import {Products, Spec, SpecProductAssignment, Specs} from "ordercloud-javascript-sdk"
import BrandedTable from "../../branding/BrandedTable"
import React from "react"
import {useState} from "react"
import BrandedSpinner from "../../branding/BrandedSpinner"
import {ISupplierAddress} from "types/ordercloud/ISupplierAddress"

// type SupplierAddressesProps = {
//   composedProduct: ComposedProduct
//   setComposedProduct?: React.Dispatch<React.SetStateAction<ComposedProduct>>
// }

export default function SupplierAddressList(supplierAddresses) {
  const color = useColorModeValue("textColor.900", "textColor.100")
  //const bg = useColorModeValue("accent.500", "accent.500")
  //const okColor = useColorModeValue("okColor.800", "okColor.200")
  //const errorColor = useColorModeValue("errorColor.800", "errorColor.200")
  const [expanded, setExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const addressList = supplierAddresses
  debugger
  //const cancelRef = React.useRef()
  //const [newSpecifaction, setNewSpecification] = useState("")
  //const [isLinking, setIsLinking] = useState(false)
  //const [availableSpecs, setAvailableSpecs] = useState<Spec<any, any>[]>(null)
  //const [isSpecChosen, setIsSpecChosen] = useState(false)
  //const [regenerateVariants, setRegenerateVariants] = useState(false)

  // const onRemoveSpecification = async (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   const specId = e.currentTarget.dataset.id
  //   await Specs.DeleteProductAssignment(specId, composedProduct?.Product?.ID)

  //   var targetSpec = composedProduct?.Specs?.find((innerSpec) => innerSpec.ID == specId)
  //   if (targetSpec.DefinesVariant) {
  //     // TODO: ASK in Dialog if Variants shall be regenerated and how?
  //     // In case a variant spec has been deleted, all the variants have to be regenerated
  //     await Products.GenerateVariants(composedProduct?.Product?.ID, {
  //       overwriteExisting: true
  //     })
  //   }

  //   var product = await GetComposedProduct(composedProduct?.Product?.ID)
  //   setComposedProduct(product)
  //   setIsLoading(false)
  // }

  // const onSpecificationLink = async (e) => {
  //   setIsLinking(true)
  //   e.preventDefault()
  //   const specProductAssignment: SpecProductAssignment = {
  //     ProductID: composedProduct?.Product?.ID,
  //     SpecID: newSpecifaction
  //   }

  //   await Specs.SaveProductAssignment(specProductAssignment)
  //   var targetSpec = await Specs.Get<ISpec>(newSpecifaction)
  //   if (targetSpec.DefinesVariant && regenerateVariants) {
  //     // TODO: ASK in Dialog if Variants shall be regenerated and how?
  //     // In case a variant spec has been deleted, all the variants have to be regenerated
  //     await Products.GenerateVariants(composedProduct?.Product?.ID, {
  //       overwriteExisting: true
  //     })
  //   }

  //   var product = await GetComposedProduct(composedProduct?.Product?.ID)
  //   setComposedProduct(product)
  //   setIsLinking(false)
  //   setNewSpecification("")
  //   setAvailableSpecs(null)
  //   setExpanded(true)
  //   onClose()
  // }

  // const onAvailableSpecClick = (e) => {
  //   e.preventDefault()
  //   const chosenSpec = e.currentTarget.dataset.id
  //   setNewSpecification(chosenSpec)
  //   setIsSpecChosen(true)
  // }

  // const onSpecificationLinkInputChanged = (e) => {
  //   e.preventDefault()
  //   setIsSpecChosen(false)
  //   setNewSpecification(e.target.value)
  //   const availableSpecs = Specs.List<ISpec>({
  //     searchOn: ["Name", "ID"],
  //     search: e.target.value
  //   }).then((innerSpecs) => {
  //     const specIds = composedProduct?.Specs?.map((item) => {
  //       return item.ID
  //     })
  //     const filteredSpecs = innerSpecs.Items.filter((innerSpec) => !specIds.includes(innerSpec.ID))
  //     setAvailableSpecs(filteredSpecs)
  //   })
  // }

  return (
    <>
      {(isLoading || !supplierAddresses) && expanded ? (
        <Box pt={6} textAlign={"center"}>
          Updating... <BrandedSpinner />
        </Box>
      ) : (
        <>
          <Box width="full" pb="50" pt={4}>
            {(supplierAddresses?.SupplierAddressList?.length ?? 0) == 0 ? (
              <>No Addresses</>
            ) : (
              <BrandedTable>
                <Thead>
                  <Tr>
                    <Th color={color}>Address Name</Th>
                    <Th color={color}>Company Name</Th>
                    <Th color={color}>First Name</Th>
                    <Th color={color}>Last Name</Th>
                    <Th color={color}>Street1</Th>
                    <Th color={color}>Street2</Th>
                    <Th color={color}>City</Th>
                    <Th color={color}>State</Th>
                    <Th color={color}>Zip</Th>
                    <Th color={color}>Country</Th>
                    <Th color={color}>Phone</Th>
                  </Tr>
                </Thead>
                <Tbody alignContent={"center"}>
                  {supplierAddresses?.SupplierAddressList?.map((address, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{address.AddressName}</Td>
                        <Td>{address.CompanyName}</Td>
                        <Td>{address.FirstName}</Td>
                        <Td>{address.LastName}</Td>
                        <Td>{address.Street1}</Td>
                        <Td>{address.Street2}</Td>
                        <Td>{address.City}</Td>
                        <Td>{address.State}</Td>
                        <Td>{address.Zip}</Td>
                        <Td>{address.Country}</Td>
                        <Td>{address.Phone}</Td>
                        <Td>
                          {" "}
                          <Tooltip label="Remove specification from Product">
                            <Button
                              aria-label="Remove specification from Product"
                              variant="outline"
                              /* onClick={onRemoveSpecification} */
                              data-id={address.ID}
                            >
                              Delete
                            </Button>
                          </Tooltip>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </BrandedTable>
            )}
          </Box>
        </>
      )}
      <HStack float={"right"} position="absolute" bottom="20px">
        <Tooltip label="Add Product Specification">
          <Button aria-label="Add Product Specification" colorScheme="secondary" onClick={onOpen}>
            Add Address
          </Button>
        </Tooltip>
      </HStack>
    </>
  )
}
