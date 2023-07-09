import {Box, Flex, Text, Img, Button, HStack, InputGroup, InputLeftElement, Input, InputRightElement, Switch, useToast,  InputLeftAddon, InputRightAddon, Center} from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import linkshorten from "../asset/link_shortener.svg"
import {FaLink} from "react-icons/fa"
import TableWrap from "./TableWrap"
import { shortenLink, copyToClipboard , getUser} from "../utils/services"
import {FiCopy} from "react-icons/fi"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

const ShortenUrl = () => {

    const navigate = useNavigate()
    const toast = useToast()
    const [link, setLink] = useState('')
    const [shortenedurl, setShortenedUrl] = useState('') 
    const [loading, setLoading] = useState(false)
    const [customizeurl, setCustomizeurl] = useState('')
    const [userData, setUserData] = useState([])
  
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        navigate('/')
    }


    const shorten = async()=>{
        console.log(link,"linkkkkkkkk")
        if(!link){
            console.log("Empty")
            return
        }
      try {
        setLoading(true)
        
        //"https://en.wikipedia.org/wiki/Adesua_Etomi"
        const data = {
            "url": link,
            customizedurl: customizeurl
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
            description: error.message || error,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-left'
          })
      }finally{
        setLoading(false)
        setCustomizeurl('')
        setLink('')
      }
    }
    useEffect(()=>{
     
      const userDetails = async()=>{
        try {
          const user = await getUser()
          console.log(user?.data?.data,"user")
          setUserData(user?.data?.data)
        } catch (error) {
          console.log(error)
        }
       }
       userDetails()
    },[shortenedurl])

    const handleEmailClick = () => {
      window.open('https://mail.google.com/', '_blank')
    };
  
    
  return (
    <Box p={["20px 15px","10px 30px "]}>
        <Flex justifyContent="space-between" alignItems="center">
         <Link to='/'>
         <Text fontFamily="Cormorant Upright" textAlign="center" fontSize={["20px","40px","50px"]} className="logo-gradient-text">LinkURL</Text>
         </Link>
          
         <Button size={["sm","md","lg"]} fontSize={["12px","14px"]} onClick={logout} colorScheme="red">Logout</Button>
        </Flex>
        {userData.verified ?   
        <Box>
         <Box m="60px auto 20px auto" w={["100%","90%"]}>
                <Box>
                    <InputGroup h="100%" borderRadius="30px">
                     <InputLeftElement pointerEvents='none'>
                      <FaLink/>
                      </InputLeftElement>
                      <Input onChange={(e) => setLink(e.target.value)} bg="#181E29" borderRadius="30px" value={link} type='tel' placeholder='Enter the link here'/>
                      <InputRightElement borderRadius="30px"  w="100px">
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
                    <InputGroup mt="10px" borderRadius="30px">
                        <InputLeftAddon borderTopLeftRadius="30px" borderBottomLeftRadius="30px"  fontSize="12px" children='customize link' />
                        <Input borderRadius="30px" placeholder='link' value={customizeurl} onChange={(e)=>setCustomizeurl(e.target.value)} />
                       <InputRightAddon display={["none","flex"]} borderTopRightRadius="30px" borderBottomRightRadius="30px" children='alias' />
                    </InputGroup>
                  </Box>
            </Box>
           {shortenedurl && 
            <a href={shortenedurl}>
              <HStack p="10px 0">
                 <Text fontSize={["12px","14px"]}>{shortenedurl}</Text>
                  <Box  onClick={()=>copyToClipboard(shortenedurl, toast)} cursor="pointer"><FiCopy/></Box>
               </HStack>
             </a>}
             <HStack justify="center" p={["10px","20px"]}>
              <Switch></Switch>
              <Text fontSize={["10px","12px","14px"]}>Auto Paste from Clipboard </Text>
             </HStack>
             <TableWrap/>  
           
      </Box>
      :
      <Box m="40px auto">
        <Text textAlign="center" fontFamily="Cormorant Upright" fontSize={["35px","40px","50px"]} className="title-gradient-text">Welcome to LinkURL</Text>
        <Text textAlign="center" fontSize={[12,14]} fontFamily="Inter">please verify your email address to start shortening your URLs</Text>
        <Center><Button onClick={handleEmailClick} mt="20px">verify Email</Button></Center>
        <Img m="0 auto" h="300px" src={linkshorten} objectFit="contain"/>
      </Box>
      }
   
    
  </Box> 
  )
}

export default ShortenUrl
