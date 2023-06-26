import {
  Heading,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Card,
  CardBody,
  CardHeader,
  Box,
  Flex,
  Divider,
  Container,
  Center,
  VStack,
  Icon,
  SimpleGrid,
  Text,
  Button,
  theme,
  InputGroup,
  FormLabel,
  Input,
  FormControl,
  Textarea
} from "@chakra-ui/react"
//import {DescriptionForm} from "./forms/DescriptionForm/DescriptionForm"
import {DetailsForm} from "./forms/DetailsForm/DetailsForm"
import ImagePreview from "./ImagePreview"
import {withDefaultValuesFallback, getObjectDiff, makeNestedObject} from "utils"
import {cloneDeep, invert} from "lodash"
import {PriceSchedules, Suppliers} from "ordercloud-javascript-sdk"
import {defaultValues, validationSchema} from "./forms/meta"
import SupplierDetailToolbar from "./SupplierDetailToolbar"
import {useSuccessToast} from "hooks/useToast"
import {ISupplier} from "types/ordercloud/ISupplier"
import {useRouter} from "hooks/useRouter"
import {useState} from "react"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
//import {PricingForm} from "./forms/PricingForm/PricingForm"
import {SupplierDetailTab} from "./SupplierDetailTab"
import {IPriceSchedule} from "types/ordercloud/IPriceSchedule"
import {TbBarrierBlock, TbCactus, TbFileUpload} from "react-icons/tb"
import schraTheme from "theme/theme"
import {ISupplierUser} from "types/ordercloud/ISupplierUser"
import {ISupplierAddress} from "types/ordercloud/ISupplierAddress"
import SupplierUserList from "@/components/supplierusers/list/SupplierUserList"
import SupplierAddressList from "./SupplierAddressList"

export type SupplierDetailTab = "Details" | "Addresses" | "Users"

const tabIndexMap: Record<SupplierDetailTab, number> = {
  Details: 0,
  Addresses: 1,
  Users: 2
}
const inverseTabIndexMap = invert(tabIndexMap)
interface SupplierDetailProps {
  showTabbedView?: boolean
  initialTab: SupplierDetailTab
  supplier?: ISupplier
  supplierUsers?: ISupplierUser[]
  supplierAddresses?: ISupplierAddress[]
  active?: boolean
  allBuyersCanOrder?: boolean
}
export default function SupplierDetail({
  showTabbedView,
  initialTab,
  supplier,
  supplierUsers,
  supplierAddresses,
  active,
  allBuyersCanOrder
}: SupplierDetailProps) {
  const router = useRouter()
  const successToast = useSuccessToast()
  const [tabIndex, setTabIndex] = useState(tabIndexMap[initialTab])
  const isCreatingNew = !Boolean(supplier?.ID)
  const initialViewVisibility: Record<SupplierDetailTab, boolean> = {
    Details: true,
    Addresses: true,
    Users: true
  }
  const [viewVisibility, setViewVisibility] = useState(initialViewVisibility)

  //supplier : defaultValues //
  //debugger
  const initialValues = supplier
    ? withDefaultValuesFallback(
        {Supplier: cloneDeep(supplier), supplierAddresses: cloneDeep(supplierAddresses)},
        defaultValues
      )
    : makeNestedObject(defaultValues)

  const handleTabsChange = (index) => {
    router.push({query: {...router.query, tab: inverseTabIndexMap[index]}}, undefined, {shallow: true})
    setTabIndex(index)
  }

  const {handleSubmit, control, reset, trigger} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onBlur"
  })

  const onSubmit = async (fields) => {
    // create/update supplier
    if (isCreatingNew) {
      supplier = await Suppliers.Create<ISupplier>({
        ...fields.Supplier
      })
    } else {
      const supplierDiff = getObjectDiff(supplier, fields.Supplier)
      supplier = await Suppliers.Patch<ISupplier>(supplier.ID, {
        ...supplierDiff
      })
    }

    // create/update price schedule
    // if (isCreatingNew || !supplier.DefaultPriceScheduleID) {
    //   defaultPriceSchedule = await PriceSchedules.Create<IPriceSchedule>({
    //     ...fields.DefaultPriceSchedule,
    //     ID: supplier.ID,
    //     Name: supplier.ID
    //   })
    // } else {
    //   const priceScheduleDiff = getObjectDiff(defaultPriceSchedule, fields.defaultPriceSchedule)
    //   defaultPriceSchedule = await PriceSchedules.Patch<IPriceSchedule>(
    //     supplier.DefaultPriceScheduleID,
    //     priceScheduleDiff
    //   )
    // }

    // patch supplier with default price schedule
    //supplier = await Suppliers.Patch<ISupplier>(supplier.ID/* , {DefaultPriceScheduleID: defaultPriceSchedule.ID} */)

    successToast({
      description: isCreatingNew ? "SupplierCreated" : "Supplier updated"
    })

    if (isCreatingNew) {
      router.push(`/supplier/${supplier.ID}`)
    }
  }

  const SimpleCard = (props: {title?: string; children: React.ReactElement}) => (
    <Card>
      <CardHeader>{props.title && <Heading size="md">{props.title}</Heading>}</CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  )

  return (
    <Container maxW="100%" bgColor="st.mainBackgroundColor" flexGrow={1} p={[4, 6, 8]}>
      {showTabbedView ? (
        <Tabs colorScheme="brand" index={tabIndex} onChange={handleTabsChange}>
          <TabList flexWrap="wrap">
            {viewVisibility.Details && <SupplierDetailTab tab="Details" control={control} />}
            {viewVisibility.Addresses && <SupplierDetailTab tab="Addresses" control={control} />}
            {viewVisibility.Users && <SupplierDetailTab tab="Users" control={control} />}
          </TabList>
          <SupplierDetailToolbar
            supplier={supplier}
            control={control}
            resetForm={reset}
            viewVisibility={viewVisibility}
            setViewVisibility={setViewVisibility}
          />

          <TabPanels>
            {viewVisibility.Details && (
              <TabPanel p={0} mt={6}>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                  <Card w="100%">
                    <CardHeader display="flex" alignItems={"center"}>
                      <Heading as="h3" fontSize="lg" alignSelf={"flex-start"}>
                        Details
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <DetailsForm control={control} />
                    </CardBody>
                  </Card>
                </Box>
              </TabPanel>
            )}
            {viewVisibility.Addresses && (
              <TabPanel p={0} mt={6}>
                <Card w="100%">
                  <CardHeader display="flex" alignItems={"center"}>
                    <Heading as="h3" fontSize="lg" alignSelf={"flex-start"}>
                      Addresses
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <SupplierAddressList SupplierAddressList={supplierAddresses} />
                  </CardBody>
                </Card>
              </TabPanel>
            )}
            {viewVisibility.Users && (
              <TabPanel p={0} mt={6}>
                <Card w="100%">
                  <CardHeader>
                    <Heading as="h3" fontSize="lg" alignSelf={"flex-start"}>
                      Users
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <SupplierUserList supplierid={supplier.ID} />
                  </CardBody>
                </Card>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      ) : (
        <Flex flexWrap="wrap">
          {viewVisibility.Details && (
            <Card width={{base: "100%", xl: "50%"}}>
              <CardHeader>
                <Heading>Details</Heading>
              </CardHeader>
              <CardBody>
                <DetailsForm control={control} />
              </CardBody>
            </Card>
          )}
          {viewVisibility.Addresses && (
            <Card width={{base: "100%", xl: "50%"}}>
              <CardHeader>
                <Heading>Addresses</Heading>
              </CardHeader>
              <CardBody>
                <SupplierAddressList SupplierAddressList={supplierAddresses} />
              </CardBody>
            </Card>
          )}
          {viewVisibility.Users && (
            <Card width={{base: "100%", xl: "50%"}}>
              <CardHeader>
                <Heading>Users</Heading>
              </CardHeader>
              <CardBody>
                <SupplierUserList supplierid={supplier.ID} />
              </CardBody>
            </Card>
          )}
        </Flex>
      )}
    </Container>
  )
}
