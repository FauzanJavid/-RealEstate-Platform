import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button, useColorModeValue } from '@chakra-ui/react';

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.300');
  const badgeBg = useColorModeValue('gray.900', 'purple.500');
  
  return (
    <Box 
      position='relative' 
      overflow='hidden'
      bg={bg}
      borderRadius='3xl'
      m={{ base: '5', md: '10' }}
      boxShadow='lg'
      border='1px'
      borderColor={borderColor}
      transition='all 0.3s ease'
    >
    <Flex 
      flexWrap='wrap' 
      justifyContent='center' 
      alignItems='center' 
      minH='400px'
      position='relative'
      zIndex='2'
    >
      <Box 
        position='relative'
        borderRadius='2xl'
        overflow='hidden'
        boxShadow='0 20px 40px rgba(0,0,0,0.3)'
        border='2px'
        borderColor='purple.400'
        m='4'
      >
        <Image 
          src={imageUrl} 
          width={500} 
          height={300} 
          className="banner-image"
        />
      </Box>
      <Box p='8' maxW='500px'>
        <Box 
          bg={badgeBg}
          color='white'
          px='4'
          py='2'
          borderRadius='full'
          fontSize='sm'
          fontWeight='bold'
          display='inline-block'
          mb='4'
          boxShadow='lg'
        >
          {purpose}
        </Box>
        <Text 
          fontSize={{ base: '3xl', md: '4xl' }} 
          fontWeight='black'
          lineHeight='1.1'
          mb='4'
          color={textColor}
        >
          {title1}<br />{title2}
        </Text>
        <Text 
          fontSize='lg' 
          color={subtextColor}
          mb='6'
          lineHeight='1.6'
        >
          {desc1}<br />{desc2}
        </Text>
        <Button 
          size='lg'
          bg={useColorModeValue('gray.900', 'white')}
          color={useColorModeValue('white', 'gray.900')}
          fontWeight='bold'
          px='8'
          py='6'
          borderRadius='xl'
          boxShadow='lg'
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          transition='all 0.3s ease'
        >
          <Link href={linkName}><a>{buttonText}</a></Link>
        </Button>
      </Box>
    </Flex>
  </Box>
  );
};


const Home = ({ propertiesForSale, propertiesForRent }) => {
  const textColor = useColorModeValue('gray.900', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');
  
  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Box px={{ base: '5', md: '10' }} mb='8'>
        <Box textAlign='center' mb='8'>
          <Text 
            fontSize={{ base: '2xl', md: '3xl' }} 
            fontWeight='bold'
            color={textColor}
            mb='2'
          >
            🏠 Featured Rentals
          </Text>
          <Text color={subtextColor} fontSize='lg'>
            Discover amazing rental properties in prime locations
          </Text>
        </Box>
        <Flex flexWrap='wrap' justifyContent='center' alignItems='stretch'>
          {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      </Box>
      <Banner
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Box px={{ base: '5', md: '10' }} mb='8'>
        <Box textAlign='center' mb='8'>
          <Text 
            fontSize={{ base: '2xl', md: '3xl' }} 
            fontWeight='bold'
            color={textColor}
            mb='2'
          >
            🏡 Properties for Sale
          </Text>
          <Text color={subtextColor} fontSize='lg'>
            Find your perfect home from our exclusive listings
          </Text>
        </Box>
        <Flex flexWrap='wrap' justifyContent='center' alignItems='stretch'>
          {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      </Box>
    </Box>
  );
};

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;
