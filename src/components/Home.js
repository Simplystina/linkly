import React,{useState} from 'react'
import {Box, Flex, Text, Img, Button, HStack, InputGroup, InputLeftElement, Input, InputRightElement, Switch, useToast} from "@chakra-ui/react"
import {FaLink} from "react-icons/fa"

import linkly from "../asset/Linkly.png"
import {BiLinkExternal} from "react-icons/bi"
import { shortenLink , copyToClipboard} from '../utils/services'
import { Link, useNavigate } from 'react-router-dom'
import { FiCopy } from 'react-icons/fi'

const Home = () => {

  const [link, setLink] = useState('')
  const [shortenedurl, setShortenedUrl] = useState('') 
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()

  const login = ()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate('/shorten-urls')
    }else{
      navigate('/login')
    }
  }
  const shorten = async()=>{
    if(!link){
        console.log("Empty")
        return
    }

   const token = localStorage.getItem('token')
   if(!token){
    return navigate('/login')
   }
  try {
     setLoading(true)
    //"https://en.wikipedia.org/wiki/Adesua_Etomi"
    const data = {
        "url": link
       }
    const info = await shortenLink(data)
  console.log(info ,"shortened data")

  toast({
    title: 'Link Shortened',
    description: info.message,
    status: 'success',
    duration: 1000,
    isClosable: true,
    position:"top-left"
  })
   setShortenedUrl(info.data.shortenurl)
   setLink('')
  } catch (error) {
    console.log(error.message, error)
    toast({
        title: 'Error shortening url',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-left'
      })
  }finally{
    setLoading(false)
  }
}
  return (
    <Box className="homePage" p={["10px", "20px"]}>
      <Flex justifyContent="space-between">
         <Img src={linkly} w={["80px","100px"]} h={["50px","100px"]} objectFit="contain"/>
         <HStack>
          
           <Button colorScheme="gray" onClick={login} fontFamily="Inter" borderRadius={20} p={["6px 15px","10px 20px"]} fontSize={["10px","12px"]} color="FFFFFF" border="0.5px inset #FFFFFF" leftIcon={<BiLinkExternal/>}>
            login
           </Button>
         
           <Link to="/register">
               <Button _hover={{color:"#144EE3", bg:"whitesmoke"}} fontFamily="Inter" p={["15px 30px","10px 40px"]} fontSize={["10px","12px"]} bg="#144EE3" borderRadius={30} color="FFFFFF">
               Register
              </Button>
            </Link>
         </HStack>
      </Flex>
      
      <Box m={["80px auto 0 auto", "30px auto 0 auto"]} w={["100%","80%","60%"]}>
        <Text fontFamily="Cormorant Upright" textAlign="center" fontSize={["30px","45px"]} className="title-gradient-text">Shorten Your Loooong Links:)</Text>

         <Text fontFamily="Cormorant Upright" p="20px 0" textAlign="center" fontSize={["14px","16px"]}>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</Text>
         <Box mt="30px">
            <InputGroup h="100%" borderRadius="30px">
                <InputLeftElement pointerEvents='none'>
                  <FaLink/>
                </InputLeftElement>
                <Input onChange={(e) => setLink(e.target.value)} bg="#181E29" borderRadius="30px" value={link} type='tel' placeholder='Enter the link here'/>
                <InputRightElement borderRadius="30px" h='100%' w="150px">
                {
                        loading?
                        <Button isLoading loadingText="submitting" fontSize={["10px","12px"]} borderRadius="30px" w="100%" bg="#144EE3" fontFamily="Inter">
                      Shorten Now!
                    </Button>
                    :
                    <Button onClick={shorten} fontSize={["10px","12px"]} borderRadius="30px" w="100%" bg="#144EE3" fontFamily="Inter">
                      Shorten Now!
                    </Button>
                    }
                </InputRightElement>
            </InputGroup>
         </Box>
         {shortenedurl && 
        <HStack p="10px 0">
            <Text fontSize={["12px","14px"]}>{shortenedurl}</Text>
            <Box onClick={()=>copyToClipboard(shortenedurl, toast)} cursor="pointer"><FiCopy/></Box>
        </HStack>}
         <HStack justify="center" p="20px">
              <Switch></Switch>
              <Text fontSize={["10px","12px","14px"]}>Auto Paste from Clipboard </Text>
          </HStack>
          <Text fontFamily="Cormorant Upright" fontSize={["12px","14px","16px"]} textAlign="center">You can create 05 more links. Register  Now to enjoy Unlimited usage</Text>
      </Box>
    </Box>
  )
}

export default Home
