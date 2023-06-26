import {InfoOutlineIcon} from "@chakra-ui/icons"
import {Tab} from "@chakra-ui/react"
import {isEmpty, get} from "lodash"
import {Control, FieldValues, useFormState, FieldErrors} from "react-hook-form"
import {tabFieldNames} from "./forms/meta"
import {SupplierDetailTab} from "./SupplierDetail"

interface SupplierDetailTabProps {
  tab: SupplierDetailTab
  control: Control<FieldValues, any>
}

export function SupplierDetailTab({control, tab}: SupplierDetailTabProps) {
  // This is its own component so that when we retrieve form state via the useFormState hook
  // we isolate changes to just this component and don't cause the entire supplier detail page to re-render
  const {errors, touchedFields} = useFormState({control})
  const tabHasError = (tab: SupplierDetailTab, errors: FieldErrors<any>, touched: Partial<Readonly<any>>): boolean => {
    if (isEmpty(errors)) {
      return false
    }
    return tabFieldNames[tab].some((fieldName) => get(errors, fieldName, null) && get(touched, fieldName, null))
  }

  return (
    <Tab>
      {tab} {tabHasError(tab, errors, touchedFields) && <InfoOutlineIcon color="danger.500" marginLeft={2} />}
    </Tab>
  )
}
