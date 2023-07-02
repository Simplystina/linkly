import React, { useEffect } from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { verifyMail } from '../utils/services'
import {useLocation} from "react-router-dom"

const VerifyMail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

  // Accessing query parameters
  const token = queryParams.get('token');
  console.log(token,"token")

    const verify = async(token)=>{
        try {
            const data = await verifyMail(token)
            console.log(data,"data")
        } catch (error) {
            
        }
    }

    useEffect(()=>{
       verify(token)
    },[token])
  return (
    <Flex className="homePage" p={["10px", "20px"]}>
        <Box m="auto">
           <Text fontSize={["40px"]} color="#fff">Verification Successful</Text>
           <Button m="0 auto">Click to Login</Button>
        </Box>
    </Flex>
  )
}

export default VerifyMail
