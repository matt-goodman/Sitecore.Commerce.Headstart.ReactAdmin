import {ChevronDownIcon} from "@chakra-ui/icons"
import {
  HStack,
  SimpleGrid,
  Checkbox,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Flex
} from "@chakra-ui/react"
import {ChangeEvent, useState} from "react"
import {SupplierDetailTab} from "./SupplierDetail"

interface ViewManagerProps {
  viewVisibility: Record<SupplierDetailTab, boolean>
  setViewVisibility: (update: Record<SupplierDetailTab, boolean>) => void
}

export default function ViewManager({viewVisibility, setViewVisibility}: ViewManagerProps) {
  const [visibility, setVisibility] = useState(viewVisibility)
  const onSubmit = (onClose: () => void) => {
    setViewVisibility(visibility)
    onClose()
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const update = {...visibility, [event.target.value]: event.target.checked}
    console.log(update)
    setVisibility(update)
  }
  return (
    <Popover>
      {({onClose}) => (
        <>
          <PopoverTrigger>
            <Button variant="outline">
              <HStack>
                <Text>Views </Text>
                <ChevronDownIcon />
              </HStack>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <SimpleGrid columns={[1, 2]} spacing={2}>
                <Checkbox value="Details" isChecked={visibility.Details} onChange={handleChange}>
                  Details
                </Checkbox>
                <Checkbox value="Addresses" isChecked={visibility.Addresses} onChange={handleChange}>
                  Addresses
                </Checkbox>
                <Checkbox value="Users" isChecked={visibility.Users} onChange={handleChange}>
                  Users
                </Checkbox>
              </SimpleGrid>
            </PopoverBody>
            <PopoverFooter>
              <Flex justifyContent="space-between">
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="solid" colorScheme="primary" onClick={() => onSubmit(onClose)}>
                  Apply
                </Button>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
