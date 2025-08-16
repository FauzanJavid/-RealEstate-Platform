import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/images/house.jpg';

const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID  } }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  const detailsBg = useColorModeValue('gray.50', 'gray.700');
  const priceColor = useColorModeValue('gray.900', 'purple.300');
  
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Box 
        w='380px'
        h='100%'
        bg={bg}
        borderRadius='xl'
        overflow='hidden'
        cursor='pointer'
        transition='all 0.3s ease'
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
        }}
        border='1px'
        borderColor={borderColor}
        m='3'
        boxShadow='lg'
      >
      {/* Image Section */}
      <Box position='relative' overflow='hidden'>
        <Image 
          src={coverPhoto ? coverPhoto.url : DefaultImage} 
          width={400} 
          height={250} 
          className="property-image"
        />
        {/* Verification Badge */}
        {isVerified && (
          <Box 
            position='absolute'
            top='3'
            left='3'
            bg='green.500'
            color='white'
            px='3'
            py='1'
            borderRadius='full'
            fontSize='xs'
            fontWeight='bold'
            display='flex'
            alignItems='center'
            gap='1'
            boxShadow='md'
          >
            <GoVerified />
            Verified
          </Box>
        )}
        {/* Price Badge */}
        <Box 
          position='absolute'
          bottom='3'
          left='3'
          bg={useColorModeValue('rgba(255,255,255,0.95)', 'rgba(0,0,0,0.8)')}
          color={priceColor}
          px='3'
          py='2'
          borderRadius='lg'
          backdropFilter='blur(10px)'
          boxShadow='md'
          border='1px'
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Text fontWeight='bold' fontSize='lg'>
            ₹ {millify(price)}{rentFrequency && `/${rentFrequency}`}
          </Text>
        </Box>
      </Box>

        {/* Content Section */}
        <Box p='5'>
          <Flex alignItems='center' justifyContent='space-between' mb='3'>
            <Text 
              fontSize='lg' 
              fontWeight='semibold' 
              color={textColor}
              noOfLines={1}
              flex='1'
            >
              {title}
            </Text>
            <Avatar size='sm' src={agency?.logo?.url} ml='3'></Avatar>
          </Flex>
          
          {/* Property Details */}
          <Flex 
            alignItems='center' 
            justifyContent='space-between' 
            color={subtextColor}
            fontSize='sm'
            bg={detailsBg}
            p='3'
            borderRadius='lg'
            border='1px'
            borderColor={borderColor}
          >
            <Flex alignItems='center' gap='1'>
              <FaBed color={useColorModeValue('#4A5568', '#9f7aea')} />
              <Text>{rooms} Beds</Text>
            </Flex>
            <Box w='1px' h='4' bg={borderColor}></Box>
            <Flex alignItems='center' gap='1'>
              <FaBath color={useColorModeValue('#4A5568', '#9f7aea')} />
              <Text>{baths} Baths</Text>
            </Flex>
            <Box w='1px' h='4' bg={borderColor}></Box>
            <Flex alignItems='center' gap='1'>
              <BsGridFill color={useColorModeValue('#4A5568', '#9f7aea')} />
              <Text>{millify(area)} sqft</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default Property;