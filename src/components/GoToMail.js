import {Box, Flex, Text, Img, Button,  Center, HStack, useToast} from "@chakra-ui/react"
import React, { useState } from 'react'
import linkshorten from "../asset/link_shortener.svg"
import { Link, useNavigate } from "react-router-dom";
import { resendMail } from "../utils/services";
import { FaBackward } from "react-icons/fa";

const GoToMail = () => {

    const useremail = localStorage.getItem("useremail")
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    
    const resend = async()=>{

        console.log(useremail, 'useremail')
        setLoading(true)
         
        if(!useremail){
            navigate('/resend-mail')
            return
        }
        try {
            const data = await resendMail({email: useremail})
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
            navigate('/resend-mail')
          
        }finally{
            setLoading(false)
        }
    }
    const handleEmailClick = () => {
        window.open('https://mail.google.com/', '_blank')
      };
    
      
  return (
    <Box className="homePage" p={["20px","30px"]} >
        <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
        <Text textAlign="center" pt="40px" fontFamily="Cormorant Upright" fontSize={["35px","40px","50px"]} className="title-gradient-text">Welcome to LinkURL</Text>
        <Text textAlign="center" fontSize={[12,14]} fontFamily="Inter">please verify your email address to start shortening your URLs</Text>
        <Center><Button onClick={handleEmailClick} mt="20px">Go to Email</Button></Center>
        <Img m="0 auto" h="300px" src={linkshorten} objectFit="contain"/>
        <HStack pb="40px" justify="center">
            <Text fontSize={[14,16]}>Can't find Verification mail</Text>
        
             {
                loading?
                <Button isLoading loadingText="submitting" _hover={{color:"#144EE3", bg:"whitesmoke"}} fontFamily="Inter" p={["15px 30px","10px 40px"]} fontSize={["10px","12px"]} bg="#144EE3" borderRadius={10} color="FFFFFF" onClick={resend}>
                Resend mail
               </Button>
               :
               <Button _hover={{color:"#144EE3", bg:"whitesmoke"}} fontFamily="Inter" p={["15px 30px","10px 40px"]} fontSize={["10px","12px"]} bg="#144EE3" borderRadius={10} color="FFFFFF" onClick={resend}>
               Resend mail
              </Button>
             }
          
        </HStack>
      </Box>
  )
}

export default GoToMail
