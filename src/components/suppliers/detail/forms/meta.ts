import * as yup from "yup"
import {makeNestedValidationSchema} from "utils"
import {values} from "lodash"
import * as detailsForm from "./DetailsForm"
import {SupplierDetailTab} from "../SupplierDetail"

export const defaultValues = {
  ...detailsForm.defaultValues
}

export const validationSchema = yup.object().shape(
  makeNestedValidationSchema({
    ...detailsForm.formShape
  })
)

export const tabFieldNames: Record<SupplierDetailTab, any[]> = {
  Details: [...values(detailsForm.fieldNames)],
  Addresses: [],
  Users: []
}
