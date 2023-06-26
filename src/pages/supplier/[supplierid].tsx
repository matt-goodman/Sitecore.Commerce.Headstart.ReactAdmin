import ProtectedContent from "@/components/auth/ProtectedContent"
import SupplierDetail from "@/components/suppliers/detail/SupplierDetail"
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react"
import {appPermissions} from "constants/app-permissions.config"
import {useSupplierDetail} from "hooks/useSupplierDetail"
import {NextSeo} from "next-seo"

/* This declares the page title and enables breadcrumbs in the content header section. */
export async function getServerSideProps() {
  return {
    props: {
      header: {
        title: "Supplier Detail",
        metas: {
          hasBreadcrumbs: true,
          hasBuyerContextSwitch: false
        }
      }
    }
  }
}

const SupplierDetailPage = () => {
  const {supplier, /*  supplierUsers,  */ supplierAddresses, loading, showTabbedView, initialTab} = useSupplierDetail()

  if (loading || !supplier) {
    return (
      <Flex flexGrow="1" id="skeleton-loader--supplier">
        <NextSeo title="Supplier Detail" />
        <Container
          display="flex"
          flexFlow="column nowrap"
          maxW="100%"
          bgColor="st.mainBackgroundColor"
          flexGrow={1}
          p={[4, 6, 8]}
        >
          <HStack mb={6}>
            <Skeleton borderRadius="md" w="100%" h="40px" />
          </HStack>

          <HStack mb={6}>
            <Skeleton borderRadius="md" w="100%" h="30px" />
          </HStack>

          <Flex h={"100%"} gap={6}>
            <VStack gap={6} flexGrow="1">
              <Skeleton borderRadius="md" w="100%" h={"216px"} />
              <Skeleton borderRadius="md" w="100%" h={"184px"} />
              <Skeleton borderRadius="md" w="100%" h={"192px"} />
            </VStack>
            <Skeleton borderRadius="md" w="340px" h={"520px"} />
          </Flex>
        </Container>
      </Flex>
    )
  }

  return (
    <SupplierDetail
      showTabbedView={showTabbedView}
      initialTab={initialTab}
      supplier={supplier}
      /* supplierUsers={supplierUsers} */
      supplierAddresses={supplierAddresses}
    />
  )
}

const ProtectedSupplierDetailPage = () => {
  return (
    <ProtectedContent hasAccess={appPermissions.SupplierManager}>
      <SupplierDetailPage />
    </ProtectedContent>
  )
}

export default ProtectedSupplierDetailPage
