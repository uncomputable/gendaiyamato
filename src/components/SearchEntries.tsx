import React, {useState, useEffect, useRef } from 'react';
import { LuSearch, LuArrowRight, LuSquarePlus } from 'react-icons/lu';
import {
  Box,
  Input,
  Flex,
  Text,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { DataEntry } from '../App';
import { MatchedEntries } from './MatchedEntries';

const DATABASE_URL = 'https://gist.githubusercontent.com/uncomputable/b26b059d5c15adc314e8f27ba2c307de/raw/1723f8df1591a9135aaa0c7b7d75c9e787985ee9/erabi.json';

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

export function SearchEntries() {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<DataEntry[]>([]);
  const [database, setDatabase] = useState<DataEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDatabase().then(x => {
      setDatabase(x);
    });
  }, []);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputRef.current) {
      const query1 = inputRef.current.value;
      const matches1 = database.filter(item =>
        item.majiriWord.includes(query1) || item.majiriReading.includes(query1)
      );
      setQuery(query1);
      setMatches(matches1);
    }
  }

  return (
    <Box p={5} maxW="600px" mx="auto">
      <form onSubmit={search}>
        <HStack mb={5}>
          <Input
            placeholder='漢字カナまじりのコトバを検索'
            ref={inputRef}
          />
          <IconButton type="submit">
            <LuSearch />
          </IconButton>
        </HStack>
      </form>
      <MatchedEntries query={query} matches={matches} />
    </Box>
  )
}
