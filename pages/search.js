import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg'

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bg} minH='100vh' color={textColor}>
      {/* Page Header */}
      <Box 
        bg={cardBg}
        borderBottom='1px'
        borderColor={borderColor}
        p='6'
        textAlign='center'
        boxShadow='sm'
      >
        <Text 
          fontSize={{ base: '2xl', md: '3xl' }} 
          fontWeight='bold'
          color={textColor}
          mb='2'
        >
          🔍 Property Search
        </Text>
        <Text color={subtextColor} fontSize='lg'>
          Find your perfect property with advanced filters
        </Text>
      </Box>

      {/* Filter Toggle Button */}
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg={cardBg}
        border='1px'
        borderColor={borderColor}
        borderRadius='xl'
        m='6'
        p='4'
        fontWeight='bold'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
        transition='all 0.3s ease'
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg'
        }}
        boxShadow='md'
      >
        <Icon paddingRight='3' w='6' h='6' as={BsFilter} color={useColorModeValue('gray.600', 'purple.400')} />
        <Text color={textColor}>Search Property By Filters</Text>
        <Box 
          ml='3'
          transform={searchFilters ? 'rotate(180deg)' : 'rotate(0deg)'}
          transition='transform 0.3s ease'
        >
          ▼
        </Box>
      </Flex>
      
      {/* Search Filters */}
      {searchFilters && (
        <Box 
          mx='6'
          mb='6'
          borderRadius='xl'
          overflow='hidden'
          boxShadow='lg'
        >
          <SearchFilters />
        </Box>
      )}
      
      {/* Results Header */}
      <Box px='6' mb='4'>
        <Flex align='center' justify='space-between' flexWrap='wrap'>
          <Text 
            fontSize='2xl' 
            fontWeight='bold'
            color={textColor}
            mb={{ base: '2', md: '0' }}
          >
            Properties {router.query.purpose ? `for ${router.query.purpose.replace('-', ' ')}` : ''}
          </Text>
          <Text 
            color={subtextColor}
            fontSize='md'
            bg={cardBg}
            px='4'
            py='2'
            borderRadius='full'
            border='1px'
            borderColor={borderColor}
            boxShadow='sm'
          >
            {properties.length} properties found
          </Text>
        </Flex>
      </Box>
      
      {/* Properties Grid */}
      <Box px='6'>
        <Flex flexWrap='wrap' justifyContent='center' alignItems='stretch'>
          {properties.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      </Box>
      
      {/* No Results */}
      {properties.length === 0 && (
        <Flex 
          justifyContent='center' 
          alignItems='center' 
          flexDir='column' 
          py='16'
          color={subtextColor}
        >
          <Box 
            bg={cardBg}
            borderRadius='full'
            p='8'
            mb='6'
            border='1px'
            borderColor={borderColor}
            boxShadow='md'
          >
            <Image src={noresult} width={120} height={120} />
          </Box>
          <Text fontSize='xl' fontWeight='bold' mb='2' color={textColor}>
            No Properties Found
          </Text>
          <Text fontSize='md' textAlign='center' maxW='400px'>
            Try adjusting your search filters or search in a different location
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '50000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
