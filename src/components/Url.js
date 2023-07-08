import { Box , Text, Flex, Img, VStack, Button, HStack} from '@chakra-ui/react'
import React,{ useEffect, useState } from 'react'
import { getLink } from '../utils/services';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {FaBackward} from 'react-icons/fa'
import linkImg from "../asset/share_link.svg"

const Url = () => {
    const {id } = useParams();
    console.log(id,"idddddddd k")
    const [link, setLink] = useState([]);
    

    const handleDownload = () => {
        const linktag = document.createElement('a');
        console.log(link.qrcode)
        linktag.href = link.qrcode;
        linktag.download = 'qrcode.png';
        linktag.click();
      };
    
      useEffect(() => {
        const fetchLinkDetails = async () => {
          console.log(id);
          try {
            const { data: { data } } = await getLink(id);
            console.log(data, "data");
            setLink(data);
          } catch (error) {
            console.log(error, "error");
          }
        };
      
        fetchLinkDetails();
      }, [id, fetchLinkDetails]);
  return (
   <Box p={["20px","30px"]} >
     <Link to="/shorten-urls"><Box className='gradient-text'><FaBackward/></Box></Link>
    <Flex w="100%" justifyContent="space-between" flexDir={["column","column","row"]}>
        <Img src={linkImg} objectFit="contain" w={["100%","100%","50%"]} h="300px"/>
        <Box w={["100%","100%","50%"]} >
           <Box align="baseline">
             <Text fontSize={["20px","40px"]} fontFamily="Cormorant Upright" fontWeight="700" >Original url: </Text>
             <a href={link.originalurl}>
              <Text textSizeAdjust="auto" fontSize="14px" textDecoration="underline"> { link.originalurl }</Text>
            </a>
           </Box>
           
           <Box m="20px" h="2px" w="100%" bg="purple"></Box>
           <VStack align="baseline">
             <Text fontSize={["20px","40px"]} fontFamily="Cormorant Upright" fontWeight="700">Shortened url: </Text>
            <Link>
              <a href={link.shortenurl}>
                <Text maxW="100%" fontSize="14px" textDecoration="underline">{link.shortenurl}</Text>
              </a>
            </Link>
           </VStack>
           <Flex justifyContent="space-between" flexDir={["column","column","row"]}>
             <Box>
               <Img src={link.qrcode} mt="20px" w={["50px","100px"]} h={["50px","100px"]}/>
              <Button mt="10px" onClick={handleDownload} fontSize={[12,14]}>Download qrcode</Button>
             </Box>
             <HStack alignItems="center">
                <Text fontSize={["20px","40px"]} fontFamily="Cormorant Upright" fontWeight="700">No of Clicks:</Text>
                <Text fontSize={["50px","80px","120px"]} fontFamily="Cormorant Upright" fontWeight="700" color="#A353AA">{link.clickCount}</Text>
             </HStack>
           </Flex>
        </Box>
    </Flex>
   </Box>
  )
}

export default Url
