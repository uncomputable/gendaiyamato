import React, { useState } from 'react';
import { Clipboard, IconButton } from '@chakra-ui/react';

interface ClipboardButtonProps {
    value: string;
}

export function ClipboardButton({ value }: ClipboardButtonProps) {
  return (
    <Clipboard.Root value={value} timeout={1000}>
      <Clipboard.Trigger asChild>
        <IconButton variant="surface">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
