import React, {useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import {
  Box,
  Flex,
  Text,
  VStack,
  IconButton,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { DataEntry } from '../App';
import { ClipboardButton } from './ClipboardButton';

function highlightMatch(text: string, query: string) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
  
    return (
      <>
        {text.substring(0, index)}
        <span style={{ color: 'darkred', fontWeight: 'bold' }}>
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    )
}

interface SearchResultsProps {
  query: string;
  matches: DataEntry[];
}

export function SearchResults({ query, matches }: SearchResultsProps) {
  return (
    <VStack align="start">
      {matches.map((item, index) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            width="100%"
            key={index}
          >
            <VStack align="start">
              <Flex gap="4" align="center" width="100%">
                <Text>
                  <ruby>
                    {highlightMatch(item.majiriWord, query)}
                    <rp>(</rp>
                    <rt>{highlightMatch(item.majiriReading, query)}</rt>
                    <rp>)</rp>
                  </ruby>
                </Text>
                <LuArrowRight />
                <Text>
                  {item.kanaWord}
                </Text>
                <Spacer />
                <ClipboardButton value={item.kanaWord} />
              </Flex>
            </VStack>
          </Box>
      ))}
    </VStack>
  )
}
