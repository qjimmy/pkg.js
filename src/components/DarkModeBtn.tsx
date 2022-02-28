import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, useColorMode } from '@chakra-ui/react';

interface DarkModeBtnProps extends ButtonProps {}

export const DarkModeBtn = ({ ...props }: DarkModeBtnProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} {...props} aria-label='Color Mode Button'>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
