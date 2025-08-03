import React, {useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Heading,
  VStack,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react"
import {ColorModeToggle} from "./components/ColorModeToggle";
import {SearchBar} from './components/SearchBar';
import {SearchResults} from './components/SearchResults';
import {WelcomeScreen} from './components/WelcomeScreen';

export type DataEntry = {
  majiriWord: string;
  majiriReading: string;
  kanaWord: string;
  tags: string[];
};

const DATABASE_URL = 'https://gist.githubusercontent.com/uncomputable/dc053f2645c711043d09e2a2c0dd2fea/raw/ddb03a007957e8cef322cf2025d3593262481cfb/wakan.json';

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}

async function fetchDatabase(): Promise<DataEntry[]> {
  const storedJson = localStorage.getItem('databaseJson');
  const storedUrl = localStorage.getItem('databaseUrl');
  const storedHash = localStorage.getItem('databaseHash');

  if (storedJson != null && storedUrl === DATABASE_URL && storedHash != null) {
    const storedJsonHash = await sha256(storedJson);
    if (storedJsonHash != storedHash) {
      // Hash invalid, need to re-download
    }

    try {
      const database = JSON.parse(storedJson);
      return database;
    } catch (error) {
      // JSON invalid, need to re-download
    }
  }

  try {
    const response = await fetch(DATABASE_URL);

    if (!response.ok) {
      console.error('Error fetching JSON database: HTTP status ', response.status);
      return [];
    }

    const fetchedDatabase = await response.json();
    const fetchedDatabaseJson = JSON.stringify(fetchedDatabase);
    const fetchedDatabaseHash = await sha256(fetchedDatabaseJson);

    localStorage.setItem('databaseJson', fetchedDatabaseJson);
    localStorage.setItem('databaseUrl', DATABASE_URL);
    localStorage.setItem('databaseHash', fetchedDatabaseHash);

    return fetchedDatabase;
  } catch (error) {
    console.error('Error fetching JSON from database: ', error);
    return [];
  }
}

export default function Page() {
  const [database, setDatabase] = useState<DataEntry[]>([]);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<DataEntry[]>([]);

  useEffect(() => {
    fetchDatabase().then(x => {
      setDatabase(x);
    });
  }, []);

  return (
    <Box fontSize="lg" p={5} maxW="600px" mx="auto">
      <SearchBar database={database} setQuery={setQuery} setMatches={setMatches} />
      { query ? <SearchResults query={query} matches={matches} /> : <WelcomeScreen /> }

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  )
}
