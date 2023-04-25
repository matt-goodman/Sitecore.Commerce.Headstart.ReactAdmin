import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Hide,
  HStack,
  MenuItem,
  useDisclosure
} from "@chakra-ui/react"
import {useRef} from "react"
import {TbTableExport, TbTrash} from "react-icons/tb"
import BrandedSpinner from "../branding/BrandedSpinner"

interface ConfirmDeleteDialogProps {
  onDelete: () => Promise<void>
  loading: boolean
  deleteText?: string
  deletingText?: string
  alertHeaderText?: string
  alertBodyText?: string
  alertCancelButtonText?: string
  alertDeleteButtonText?: string
}
export default function ConfirmDelete({
  onDelete,
  loading,
  deleteText = "Delete",
  deletingText = "Deleting",
  alertHeaderText = "Are you sure you want to delete this?",
  alertBodyText = "This action can not be undone",
  alertCancelButtonText = "No, do not delete",
  alertDeleteButtonText = "Yes, delete"
}: ConfirmDeleteDialogProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <Hide below="md">
        <Button variant="outline" onClick={onOpen} disabled={loading}>
          {loading ? deletingText : deleteText}
        </Button>
      </Hide>
      <Hide above="md">
        <Button
          disabled={loading}
          display="flex"
          justifyContent={"flex-start"}
          variant="unstyled"
          color="danger.500"
          px={3}
          _hover={{backgroundColor: "gray.100"}}
          w="full"
          textAlign="left"
          borderRadius="0"
          fontWeight="normal"
          leftIcon={<TbTrash size="1rem" />}
          onClick={onOpen}
        >
          {loading ? deletingText : deleteText}
        </Button>
      </Hide>
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertHeaderText}
            </AlertDialogHeader>

            <AlertDialogBody>{alertBodyText}</AlertDialogBody>

            <AlertDialogFooter>
              <HStack justifyContent="space-between" w="100%">
                <Button variant="outline" onClick={onClose} ref={cancelRef}>
                  {alertCancelButtonText}
                </Button>
                <Button variant="solid" colorScheme="red" onClick={onDelete} ml={3}>
                  {alertDeleteButtonText}
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
