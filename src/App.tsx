import {
  Box,
  HStack,
  Heading,
  VStack,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react"
import {ColorModeToggle} from "./components/ColorModeToggle";
import {SearchEntries} from './components/SearchEntries';

export type DataEntry = {
  majiriWord: string;
  majiriReading: string;
  kanaWord: string;
  tags: string[];
};

export default function Page() {
  return (
    <Box textAlign="center" fontSize="lg">
      <SearchEntries />

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}
