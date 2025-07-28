import React, {useState, useRef } from 'react';
import { LuSearch } from 'react-icons/lu';
import {
  Text,
  Heading,
  Em,
  Stack,
  VStack,
  HStack,
} from '@chakra-ui/react';

export function WelcomeScreen() {
  return (
    <Stack gap={2}>
        <Text>
          現代やまとことばとは、耳で聞いてわかるように書くという試みです。今は社会の現象を表すには漢字が不可欠になってきました。書き言葉は、漢字を見ない限り意味はわからないから、そのまま演説することにも読み上げることにも無理があります。一方、話し言葉に近いように書くとどうなるのでしょうか。音だけで意味が通じるのであれば、漢字の重要性が薄くなり、意思疎通の成功率が上がります。この辞典は、漢字に頼る書き言葉の表現に対して、音だけに頼る表現を集めたものです。
        </Text>
    </Stack>
  )
}
