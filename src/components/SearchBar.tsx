import React, {useState, useRef } from 'react';
import { LuSearch } from 'react-icons/lu';
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

interface SearchBarProps {
  database: DataEntry[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setMatches: React.Dispatch<React.SetStateAction<DataEntry[]>>;
}

export function SearchBar({ database, setQuery, setMatches }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
  )
}
