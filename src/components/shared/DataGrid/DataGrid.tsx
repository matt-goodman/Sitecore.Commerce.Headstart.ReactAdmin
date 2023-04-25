import {
  Box,
  Center,
  GridItem,
  Heading,
  ResponsiveObject,
  SimpleGrid,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react"
import { ReactElement } from "react"
import { IDefaultResource, ListViewTemplate } from "../ListView/ListView"

export interface IDataGrid<T extends IDefaultResource> {
  data: T[]
  loading?: boolean
  emptyDisplay?: ListViewTemplate
  columns?: ResponsiveObject<number> | number[]
  gap?: number
  selected?: string[]
  onSelectChange?: (id: string, isSelected: boolean) => void
  gridItemActions?: (itemData: T) => ListViewTemplate
  renderGridItem?: (
    item: T,
    index: number,
    gridItemActions?: (itemData: T) => ListViewTemplate,
    isSelected?: boolean,
    onSelectChange?: (id: string, isSelected: boolean) => void
  ) => ReactElement
}
const DEFAULT_DATA_GRID__COLUMNS = { base: 1, md: 2, lg: 3, xl: 4 }
// const DEFAULT_DATA_GRID__GRID_GAP = { base: 4, md: null, lg: 6, xl: 6 }
const DEFAULT_DATA_GRID__RENDER_GRID_ITEM = (o: IDefaultResource, i: number) => (
  <VStack
    h="full"
    justifyContent="space-between"
    p={2}
    backgroundColor="white"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="xl"
    shadow="xl"
  >
    <Heading as="h3" fontSize="lg">
      {o.Name}
    </Heading>
  </VStack>
)

const DEFAULT_DATA_GRID__EMPTY_DISPLAY: ReactElement = (
  <Center h={100}>
    <Text>No Data</Text>
  </Center>
)

const DataGrid = <T extends IDefaultResource>({
  data,
  loading,
  emptyDisplay = DEFAULT_DATA_GRID__EMPTY_DISPLAY,
  columns = DEFAULT_DATA_GRID__COLUMNS,
  // gap = DEFAULT_DATA_GRID__GRID_GAP,
  gridItemActions,
  renderGridItem = DEFAULT_DATA_GRID__RENDER_GRID_ITEM,
  selected,
  onSelectChange
}: IDataGrid<T>) => {

  return (
    <SimpleGrid
      position="relative"
      as="section"
      gap={{ base: 4, md: null, lg: 6, xl: 6 }}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      w="full"
      width="100%"
      minH={100}
    >
      {loading && (
        <Box
          zIndex={2}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          pointerEvents="none"
          bgColor="whiteAlpha.700"
        >
          <Center h="100%" color="teal">
            <Spinner size="xl" />
          </Center>
        </Box>
      )}
      {data &&
        data.map((o, i) => (
          <>
            {renderGridItem(o, i, gridItemActions, selected.includes(o.ID), onSelectChange)}
          </>
        ))}
      {!loading && !data.length && (
        <GridItem
          colSpan={columns}
          rowSpan={1}
          bg="gridCellBg"
          w="full"
          width="100%"
          rounded="lg"
          overflow="h"
          borderStyle="none"
        >
          {emptyDisplay}
        </GridItem>
      )}
    </SimpleGrid>
  )
}

export default DataGrid
