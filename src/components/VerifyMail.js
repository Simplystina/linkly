import React, { useEffect, useState } from 'react'
import { Box, Text, Button, Img } from '@chakra-ui/react'
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
  console.log(token,"token")
    
   const [message, setMessage] = useState('')
    const verify = async(token)=>{
        try {
            const data = await verifyMail(token)
            console.log(data,"data")
        } catch (error) {
            console.log(error,"erorrrr")
            if (error.success === false){
                setMessage(false)
            }
        }
    }

    useEffect(()=>{
       verify(token)
    })
  return (
    <Box className="homePage" p={["10px", "20px"]}>
          <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
        {message?
         <Box m="0 auto">
         <Img src={verified} w="100%" h="300px" objectFit="contain"/>
              <Text fontSize={["40px"]} color="#fff">Verificated successful</Text>
           <Link to='/login'>
              <Button m="0 auto" fontSize={[14]}>Click to Login</Button>
           </Link>  
       </Box>
        :
      
            <Box m="0 auto">
              <Img src={unverified} w="100%" h="300px" objectFit="contain"/>
                   <Text fontSize={["40px"]} color="#fff">Verificated Failed</Text>
                  <Button m="0 auto" fontSize={[14]}>Click to resend token</Button>
            </Box>
        }
    </Box>
  )
}

export default VerifyMail
