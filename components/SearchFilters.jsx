import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const inputBg = useColorModeValue('white', 'gray.700');
  const selectBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box 
      bg={bg}
      border='1px'
      borderColor={borderColor}
      p='6'
    >
      <Flex 
        justifyContent='center' 
        flexWrap='wrap' 
        gap='4'
        mb='4'
      >
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Text 
              fontSize='sm' 
              fontWeight='bold' 
              color={subtextColor} 
              mb='2'
              textTransform='uppercase'
              letterSpacing='wide'
            >
              {filter.placeholder}
            </Text>
            <Select 
              onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} 
              placeholder={`Choose ${filter.placeholder}`}
              bg={selectBg}
              borderColor={borderColor}
              color={textColor}
              _hover={{ borderColor: useColorModeValue('gray.400', 'purple.400') }}
              _focus={{ 
                borderColor: useColorModeValue('gray.500', 'purple.400'), 
                boxShadow: useColorModeValue('0 0 0 1px rgba(0, 0, 0, 0.1)', '0 0 0 1px rgba(139, 92, 246, 0.6)') 
              }}
              borderRadius='lg'
              minW='200px'
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value} style={{ background: useColorModeValue('#FFFFFF', '#2D3748').toString(), color: useColorModeValue('#1A202C', 'white').toString() }}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
      
      {/* Location Search Section */}
      <Flex justify='center'>
        <Flex flexDir='column' align='center'>
          <Text 
            fontSize='sm' 
            fontWeight='bold' 
            color={subtextColor} 
            mb='3'
            textTransform='uppercase'
            letterSpacing='wide'
          >
            Location Search
          </Text>
          <Button 
            onClick={() => setShowLocations(!showLocations)} 
            bg={useColorModeValue('gray.900', 'white')}
            color={useColorModeValue('white', 'gray.900')}
            border='none'
            borderRadius='lg'
            px='6'
            py='3'
            fontWeight='bold'
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
            transition='all 0.3s ease'
            leftIcon={showLocations ? <MdCancel /> : undefined}
          >
            {showLocations ? 'Close Location Search' : 'Search by Location'}
          </Button>
          
          {showLocations && (
            <Flex flexDir='column' pos='relative' mt='4' w='full' maxW='400px'>
              <Input
                placeholder='Type location name...'
                value={searchTerm}
                bg={inputBg}
                borderColor={borderColor}
                color={textColor}
                _placeholder={{ color: subtextColor }}
                _hover={{ borderColor: useColorModeValue('gray.400', 'purple.400') }}
                _focus={{ 
                  borderColor: useColorModeValue('gray.500', 'purple.400'), 
                  boxShadow: useColorModeValue('0 0 0 1px rgba(0, 0, 0, 0.1)', '0 0 0 1px rgba(139, 92, 246, 0.6)') 
                }}
                borderRadius='lg'
                fontSize='md'
                p='4'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== '' && (
                <Icon
                  as={MdCancel}
                  pos='absolute'
                  cursor='pointer'
                  right='4'
                  top='4'
                  zIndex='100'
                  color={subtextColor}
                  _hover={{ color: 'red.400' }}
                  onClick={() => setSearchTerm('')}
                />
              )}
              
              {loading && (
                <Flex justify='center' mt='4'>
                  <Spinner color={useColorModeValue('gray.600', 'purple.400')} size='lg' />
                </Flex>
              )}
              
              {showLocations && searchTerm && (
                <Box 
                  mt='2'
                  maxHeight='300px' 
                  overflow='auto'
                  bg={bg}
                  borderRadius='lg'
                  border='1px'
                  borderColor={borderColor}
                  boxShadow='lg'
                >
                  {locationData?.map((location) => (
                    <Box
                      key={location.id}
                      onClick={() => {
                        searchProperties({ locationExternalIDs: location.externalID });
                        setShowLocations(false);
                        setSearchTerm(location.name);
                      }}
                      cursor='pointer'
                      p='3'
                      borderBottom='1px'
                      borderColor={borderColor}
                      _hover={{ 
                        bg: useColorModeValue('gray.50', 'gray.700'), 
                        color: useColorModeValue('gray.900', 'purple.300') 
                      }}
                      transition='all 0.2s'
                    >
                      <Text color={textColor}>
                        📍 {location.name}
                      </Text>
                    </Box>
                  ))}
                  
                  {!loading && !locationData?.length && searchTerm && (
                    <Flex 
                      justify='center' 
                      align='center' 
                      flexDir='column' 
                      py='8'
                      color={subtextColor}
                    >
                      <Box mb='4'>
                        <Image src={noresult} width={80} height={80} />
                      </Box>
                      <Text fontSize='md' fontWeight='bold' mb='1' color={textColor}>
                        No locations found
                      </Text>
                      <Text fontSize='sm' textAlign='center'>
                        Try a different search term
                      </Text>
                    </Flex>
                  )}
                  
                  {!searchTerm && (
                    <Flex 
                      justify='center' 
                      align='center' 
                      py='6'
                      color={subtextColor}
                    >
                      <Text fontSize='md'>
                        Start typing to search locations...
                      </Text>
                    </Flex>
                  )}
                </Box>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
