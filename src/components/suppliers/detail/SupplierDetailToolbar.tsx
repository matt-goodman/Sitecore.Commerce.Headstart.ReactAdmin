import ExportToCsv from "@/components/demo/ExportToCsv"
import LanguageSelector from "@/components/demo/LanguageSelector"
//import ViewSupplier from "@/components/demo/ViewSupplier"
import Link from "next/link"
import ConfirmDelete from "@/components/shared/ConfirmDelete"
import {
  Box,
  Button,
  Hide,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  theme,
  useMediaQuery
} from "@chakra-ui/react"
import {useRouter} from "hooks/useRouter"
import {Suppliers} from "ordercloud-javascript-sdk"
import React, {useState} from "react"
import {Control, FieldValues, UseFormReset} from "react-hook-form"
import {ISupplier} from "types/ordercloud/ISupplier"
import {SupplierDetailTab} from "./SupplierDetail"
import ViewManager from "./ViewManager"
import SubmitButton from "@/components/react-hook-form/submit-button"
import ResetButton from "@/components/react-hook-form/reset-button"
import {HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon} from "@chakra-ui/icons"
import {TbLanguage, TbPlus, TbShoppingCartPlus, TbTableExport, TbTrash} from "react-icons/tb"

interface SupplierDetailToolbarProps {
  supplier: ISupplier
  control: Control<FieldValues, any>
  resetForm: UseFormReset<any>
  viewVisibility: Record<SupplierDetailTab, boolean>
  setViewVisibility: (update: Record<SupplierDetailTab, boolean>) => void
}

export default function SupplierDetailToolbar({
  supplier,
  control,
  resetForm,
  viewVisibility,
  setViewVisibility
}: SupplierDetailToolbarProps) {
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [belowMd] = useMediaQuery(`(max-width: ${theme.breakpoints["md"]})`, {
    ssr: true,
    fallback: false // return false on the server, and re-evaluate on the client side
  })

  const onDelete = async () => {
    try {
      await Suppliers.Delete(supplier?.ID)
      router.push("/suppliers")
    } finally {
      setDeleteLoading(true)
    }
  }

  return (
    <>
      <Hide below="xl">
        <Stack direction="row" mb={5} w="100%">
          <ViewManager viewVisibility={viewVisibility} setViewVisibility={setViewVisibility} />
          <Link href="/suppliers/new">
            <Button variant="outline">Create</Button>
          </Link>
          {/* <ViewSupplier /> */}
          <ExportToCsv />
          <LanguageSelector />
          <ConfirmDelete deleteText="Delete Supplier" loading={deleteLoading} onDelete={onDelete} />
          <HStack flexGrow="1" justifyContent={"flex-end"} gap={1}>
            <ResetButton control={control} reset={resetForm}>
              Discard Changes
            </ResetButton>
            <SubmitButton control={control} variant="solid" colorScheme="primary">
              Save
            </SubmitButton>
          </HStack>
        </Stack>
      </Hide>

      {/* Mobile Hamburger Menu */}
      <Hide above="xl">
        <HStack justify={"space-between"} alignItems="stretch" wrap="wrap">
          <ViewManager viewVisibility={viewVisibility} setViewVisibility={setViewVisibility} />
          <Menu>
            <MenuButton
              style={{marginRight: "auto"}}
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <Link href="/suppliers/new" passHref>
                <MenuItem as="a" icon={<TbPlus size={"1rem"} />}>
                  Create
                </MenuItem>
              </Link>
              {/* <ViewSupplier /> */}
              <ExportToCsv />
              <LanguageSelector />
              <ConfirmDelete deleteText="Delete Supplier" loading={deleteLoading} onDelete={onDelete} />
            </MenuList>
          </Menu>

          <HStack justifyContent={"flex-end"} ml="auto !important">
            <ResetButton control={control} reset={resetForm}>
              Discard Changes
            </ResetButton>
            <SubmitButton control={control} variant="solid" colorScheme="primary">
              Save
            </SubmitButton>
          </HStack>
        </HStack>
      </Hide>
    </>
  )
}
