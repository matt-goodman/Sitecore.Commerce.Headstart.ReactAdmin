import {SupplierDetailTab} from "@/components/suppliers/detail/SupplierDetail"
import {useRouter} from "next/router"
import {SupplierAddresses, Suppliers} from "ordercloud-javascript-sdk"
import {useState, useEffect} from "react"
import {ISupplier} from "types/ordercloud/ISupplier"
import {ISupplierAddress} from "types/ordercloud/ISupplierAddress"

export function useSupplierDetail() {
  const {isReady, query, push} = useRouter()
  const [supplier, setSupplier] = useState(null as ISupplier)
  const [supplierAddresses, setSupplierAddresses] = useState(null as ISupplierAddress[])
  const [showTabbedView, setShowTabbedView] = useState(true)
  const [loading, setLoading] = useState(true)
  const [initialTab, setInitialTab] = useState("Details" as SupplierDetailTab)

  useEffect(() => {
    const getSupplier = async () => {
      const mySupplier = query.supplierid as string
      const supplier = await Suppliers.Get<ISupplier>(mySupplier)
      const supplierAddresses = await SupplierAddresses.List<ISupplierAddress>(mySupplier)
      setSupplier(supplier)
      setSupplierAddresses(supplierAddresses.Items)
    }
    if (query.supplierid) {
      getSupplier()
    }
  }, [query.supplierid])

  useEffect(() => {
    const shouldShowTabbedView = () => {
      const queryStringTabbed = query?.tabbed?.toString()
      if (queryStringTabbed === "true" || queryStringTabbed === "false") {
        return queryStringTabbed === "true"
      } else if (
        process.env.NEXT_PUBLIC_DEFAULT_SUPPLIER_VIEW_TABBED === "false" ||
        process.env.NEXT_PUBLIC_DEFAULT_SUPPLIER_VIEW_TABBED === "true"
      ) {
        return process.env.NEXT_PUBLIC_DEFAULT_SUPPLIER_VIEW_TABBED === "true"
      } else {
        return true
      }
    }

    const setCurrentTabQueryParam = async () => {
      if (!query["tab"]) {
        await push({query: {...query, tab: "Details"}}, undefined, {shallow: true})
        setInitialTab("Details")
      } else {
        setInitialTab(query["tab"] as SupplierDetailTab)
      }
    }

    const checkQueryParams = async () => {
      const showTabbedView = shouldShowTabbedView()
      await setCurrentTabQueryParam()
      setShowTabbedView(showTabbedView)
      setLoading(false)
    }
    if (isReady) {
      checkQueryParams()
    }
  }, [isReady, query, push])

  return {supplier, supplierAddresses, loading, showTabbedView, initialTab}
}
