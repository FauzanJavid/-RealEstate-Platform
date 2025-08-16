import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch, BsMoon, BsSun } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuHover = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex 
      p='4' 
      borderBottom='1px' 
      borderColor={borderColor}
      bg={bg}
      backdropFilter='blur(10px)'
      position='sticky'
      top='0'
      zIndex='999'
      boxShadow='sm'
      transition='all 0.3s ease'
    >
      <Box fontSize='3xl' fontWeight='bold' color={textColor}>
        <Link href='/' paddingLeft='2'>🏠 RealEstate</Link>
      </Box>
      <Spacer />
      
      {/* Dark Mode Toggle */}
      <IconButton
        aria-label='Toggle dark mode'
        icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}
        onClick={toggleColorMode}
        variant='ghost'
        color={textColor}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'),
          transform: 'scale(1.05)'
        }}
        transition='all 0.2s'
        mr='3'
      />
      
      <Box>
        <Menu>
          <MenuButton 
            as={IconButton} 
            icon={<FcMenu />} 
            variant='outline' 
            borderColor={borderColor}
            color={textColor}
            _hover={{
              borderColor: 'gray.400',
              transform: 'scale(1.05)'
            }}
            transition='all 0.2s'
          />
          <MenuList bg={menuBg} borderColor={borderColor} boxShadow='lg'>
            <Link href='/' passHref>
              <MenuItem 
                icon={<FcHome />} 
                _hover={{ bg: menuHover }}
                color={textColor}
              >
                Home
              </MenuItem>
            </Link>
            <Link href='/search' passHref>
              <MenuItem 
                icon={<BsSearch />} 
                _hover={{ bg: menuHover }}
                color={textColor}
              >
                Search
              </MenuItem>
            </Link>
            <Link href='/search?purpose=for-sale' passHref>
              <MenuItem 
                icon={<FcAbout />} 
                _hover={{ bg: menuHover }}
                color={textColor}
              >
                Buy Property
              </MenuItem>
            </Link>
            <Link href='/search?purpose=for-rent' passHref>
              <MenuItem 
                icon={<FiKey />} 
                _hover={{ bg: menuHover }}
                color={textColor}
              >
                Rent Property
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
