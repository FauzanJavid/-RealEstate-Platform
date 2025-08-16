import { Box, Flex, Text, Link, Divider, VStack, HStack } from '@chakra-ui/layout';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { FaHeart, FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box 
      bg={bg} 
      borderTop='1px' 
      borderColor={borderColor}
      mt='8'
      transition='all 0.3s ease'
    >
      <VStack spacing='4' p='8' maxWidth='1200px' mx='auto'>
      {/* Main Content */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify='space-between' 
        align='center'
        width='full'
        gap='6'
      >
        {/* Left Section - Brand */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing='3'>
            <Text 
              fontSize='2xl' 
              fontWeight='bold' 
              color={textColor}
            >
              🏠 RealEstate Platform
            </Text>
            <Text color={subtextColor} fontSize='sm' textAlign={{ base: 'center', md: 'left' }}>
              Your gateway to finding the perfect property
            </Text>
          </VStack>

        {/* Center Section - Quick Links */}
          <HStack spacing='6' flexWrap='wrap' justify='center'>
            <Link href='/' color={subtextColor} _hover={{ color: textColor }} fontSize='sm'>
              Home
            </Link>
            <Link href='/search' color={subtextColor} _hover={{ color: textColor }} fontSize='sm'>
              Search
            </Link>
            <Link href='/search?purpose=for-sale' color={subtextColor} _hover={{ color: textColor }} fontSize='sm'>
              Buy
            </Link>
            <Link href='/search?purpose=for-rent' color={subtextColor} _hover={{ color: textColor }} fontSize='sm'>
              Rent
            </Link>
          </HStack>

          {/* Right Section - Social Links */}
          <HStack spacing='4'>
            <Icon 
              as={FaGithub} 
              boxSize='5' 
              color={subtextColor} 
              _hover={{ color: textColor, transform: 'scale(1.1)' }}
              cursor='pointer'
              transition='all 0.2s'
            />
            <Icon 
              as={FaLinkedin} 
              boxSize='5' 
              color={subtextColor} 
              _hover={{ color: '#0077B5', transform: 'scale(1.1)' }}
              cursor='pointer'
              transition='all 0.2s'
            />
            <Icon 
              as={FaCode} 
              boxSize='5' 
              color={subtextColor} 
              _hover={{ color: useColorModeValue('gray.700', 'purple.400'), transform: 'scale(1.1)' }}
              cursor='pointer'
              transition='all 0.2s'
            />
          </HStack>
        </Flex>

        <Divider borderColor={borderColor} />

        {/* Bottom Section - Copyright */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
          width='full'
          gap='3'
        >
          <Text color={subtextColor} fontSize='sm' textAlign='center'>
            © {new Date().getFullYear()} RealEstate Platform. All rights reserved.
          </Text>
          
          <HStack spacing='2' color={subtextColor} fontSize='sm'>
            <Text>Made with</Text>
            <Icon as={FaHeart} color='red.400' boxSize='4' />
            <Text>by</Text>
            <Text 
              fontWeight='bold' 
              color={textColor}
              fontSize='md'
            >
              Fauzan
            </Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Footer;