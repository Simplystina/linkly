import React, { useEffect, useState} from 'react'
import { Box,  Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, IconButton, useToast, Img} from '@chakra-ui/react'
import {FiCopy} from "react-icons/fi"
import moment from "moment"
import {MdDelete} from "react-icons/md"


import { linkHistory, deleteLinks } from '../utils/services'
import { Link, useNavigate } from 'react-router-dom'

const TableWrap = () => {

  const [allLinks, setAllLinks] = useState([])
  const toast = useToast()
  const navigate = useNavigate()


  const copyToClipboard = (text) => {

    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Link copied to clipboard');
       

       toast({
        title: 'Link copied successfully',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position:"top-left"
      })
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
        // Handle the error, e.g., show an error message to the user
      });
  };
  const history = async()=>{
    try {
      const data = await linkHistory()
      //console.log(data,"data")
      setAllLinks(data.data)
    } catch (error) {
      console.log(error,"error")
    }  
  }

  const deleteALink = async(id)=>{
    try {
      const data = await deleteLinks(id)
      console.log(data, "idddddddd")

      toast({
        title: 'Link Deleted',
        description: data.data.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-left'
      })
    } catch (error) {
      console.log(error,"error")
    }
  }

  useEffect(()=>{
    history()
  },[allLinks])

  const gotoLink = (a)=>{
    console.log(a,"iddddd")
    navigate(`/url/${a}`)
  }

  
  return (
<Box mt="50px">
  <TableContainer>
  <Table variant='simple'>
    <TableCaption>Link History</TableCaption>
    <Thead>
      <Tr>
        <Th>Short link</Th>
        <Th>Original link</Th>
        <Th>QR Code</Th>
        <Th>Clicks</Th>
        <Th>Status</Th>
        <Th>Date</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        allLinks.map((item)=>{
          return (
       
          <Tr key={item._id} onClick={(e)=>gotoLink(item._id)} _hover={{color:"#EB568E"}} cursor="pointer"> 
           
           <Td fontSize={["12px","14px"]}>
             <Link data-id={item._id} to={`/url/${item._id}`} >
            {item.shortenurl}
             </Link>
           <IconButton onClick={(e) => copyToClipboard(item.shortenurl)} aria-label='Search database' icon={<FiCopy/>}/>
         
          </Td>
           <Td fontSize={["12px","14px"]} >{item.originalurl.length >= 50 ? `${item.originalurl.slice(0, 50)}...` : item.originalurl }</Td>
          <Td ><Img src={item.qrcode} objectFit="contain" w="50px" h="50px"/></Td>
          <Td fontSize={["12px","14px"]}>{item.clickCount}</Td>
          <Td fontSize={["12px","14px"]}>active</Td>
           <Td fontSize={["12px","14px"]}>{moment(item.createdAt).format('MMMM Do YYYY')}</Td>
           <Td fontSize={["12px","14px"]} onClick={()=>deleteALink(item._id)}><IconButton aria-label='Search database' icon={<MdDelete/>} /></Td>
          
        </Tr>
      
          )
        })
      }
    </Tbody>
   </Table>
  </TableContainer>
    </Box>
  )
}

export default TableWrap
