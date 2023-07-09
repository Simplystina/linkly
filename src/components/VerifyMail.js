import React, { useEffect, useState } from 'react'
import { Box, Text, Button, Img, Flex, Spinner } from '@chakra-ui/react'
import { verifyMail } from '../utils/services'
import {useLocation} from "react-router-dom"
import verified from "../asset/verified.svg"
import unverified from "../asset/unverified.svg"
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const VerifyMail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

  // Accessing query parameters
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  console.log(token,"token",email)
    
   const [message, setMessage] = useState('')
   const [loading, setLoading] = useState(false)
    const verify = async(token, email)=>{
      setLoading(true)
        try {
            const data = await verifyMail(token,email)
            console.log(data,"data")
            setMessage(true)
            setLoading(false)
        } catch (error) {
            console.log(error,"erorrrr")
          setMessage(false)
          setLoading(false)
        }finally{
         
        }
        
    }

    useEffect(()=>{
       verify(token,email)
    },[token])
    
  return (
    <Box className="homePage" p={["10px", "20px"]}>
        <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
     {loading? 
       <Flex w="100%" h="100%" justifyContent="center" alignContent="center" alignItems="center" ><Spinner size='xl' /></Flex>
       : 
       <Box>
          {message?
         <Box m="0 auto">
         <Img src={verified} w="100%" h="300px" objectFit="contain"/>
              <Text fontSize={["40px"]} color="#fff">Verification successful</Text>
           <Link to='/login'>
              <Button m="0 auto" fontSize={[14]}>Click to Login</Button>
           </Link>  
          </Box>
        :
      
            <Box m="0 auto">
              <Img src={unverified} w="100%" h="300px" objectFit="contain"/>
                   <Text fontSize={["40px"]} color="#fff">Verificated Failed</Text>
                 <Link to='/resend-mail'>
                    <Button m="0 auto" fontSize={[14]}>Click to resend token</Button>
                  </Link> 
            </Box>
        }
       </Box>
      }
    </Box>
  )
}

export default VerifyMail
