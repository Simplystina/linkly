import { Flex , Box, Input, Button, Text, Img, useToast} from '@chakra-ui/react'
import verified from "../asset/verified.svg"
import React, { useState } from 'react'
import { resendMail } from '../utils/services'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ResendMail = ()  => {
    const [mail, setMail] = useState('')
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const resend = async()=>{
        setLoading(true)
        try {
            const data = await resendMail({email: mail})
            console.log(data,"data")
            toast({
                title: 'Mail resent',
                description: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-left'
              })
        } catch (error) {
            console.log(error,"erorrrr")
          
        }finally{
            setLoading(false)
        }
    }
  return (
    <Box className="homePage" p={["10px", "20px"]}>
          <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
       
         <Box m="0 auto" w="50%">
           <Img src={verified} w="100%" h="300px" objectFit="contain"/>
           <Box m="0 auto">
                <Text mb="15px ">Input Email</Text>
                 <Input 
                    name="email"
                    value={mail}
                    onChange={(e)=>setMail(e.target.value)}
                    placeholder="Email"
                     ></Input>
                </Box>
               {
                loading?
                <Button isLoading loadingText="submitting" mt="10px" m="0 auto" fontSize={[14]}>resend token</Button>
                :
                <Button mt="10px" onClick={resend} m="0 auto" fontSize={[14]}>resend token</Button>
               }
       </Box>

    </Box>
  )
}

export default ResendMail
