import {Box, Flex, Text, Img, Button, HStack, InputGroup, InputLeftElement, Input, InputRightElement, Switch, useToast,  InputLeftAddon, InputRightAddon} from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import linkly from "../asset/Linkly.png"
import {FaLink} from "react-icons/fa"
import TableWrap from "./TableWrap"
import { shortenLink, copyToClipboard } from "../utils/services"
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

    const firstName = localStorage.getItem('firstName');

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
        
    },[shortenedurl])
  return (
    <Box p={["10px 15px","10px 30px "]}>
        <Flex justifyContent="space-between" alignItems="center">
         <Link to='/'>
           <Img src={linkly} w={["50px","100px"]} h={["50px","100px"]} objectFit="contain"/>
         </Link>
           <Box w="60%" display={["none","none", "block"]}>
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

             <InputGroup size='sm' mt="20px">
             <InputLeftAddon borderTopLeftRadius="10px" borderBottomLeftRadius="10px" 
              children='customize link' />
                <Input borderRadius="10px" placeholder='link' value={customizeurl} onChange={(e)=>setCustomizeurl(e.target.value)}/>
                <InputRightAddon  borderTopRightRadius="10px" borderBottomRightRadius="10px" children='alias' />
              </InputGroup>
          </Box>
         <Flex justifyContent="center" alignItems="center"  bg="#353C4A" borderRadius="10px" p={["5px 10px","5px 20px"]}>
            <Box>
              <Text fontSize={["8px","10px "]}>Welcome</Text>
              <Text  fontSize={["10px","12px","14px"]}>{firstName}</Text>
            </Box>
         </Flex>
         <Button size={["sm","md","lg"]} fontSize={["12px","14px"]} onClick={logout} colorScheme="red">Logout</Button>
        </Flex>
        <Box mt="20px" w={["100%","90%"]} display={["block","block", "none"]}>
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
        <a href={shortenedurl}><HStack p="10px 0">
            <Text fontSize={["12px","14px"]}>{shortenedurl}</Text>
            <Box  onClick={()=>copyToClipboard(shortenedurl, toast)} cursor="pointer"><FiCopy/></Box>
        </HStack></a>}
        <HStack justify="center" p={["10px","20px"]}>
              <Switch></Switch>
              <Text fontSize={["10px","12px","14px"]}>Auto Paste from Clipboard </Text>
          </HStack>
        <TableWrap/>  
    </Box>
  )
}

export default ShortenUrl
