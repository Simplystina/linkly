 import React, { useState } from 'react'
 import { Box, VStack, Text, Input , Button, useToast, Flex} from '@chakra-ui/react'
 import {FaBackward} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../utils/services'
 
 const Register = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)
        console.log("clicking on signup")

        try {
          const userData = {
            email,
            firstName,
            lastName,
            password,
          };
    
          const data = await signUp(userData);
          console.log(data, "data"); // User registered successfully

          toast({
            title: 'Account created.',
            description: data.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    
          // Reset the form fields
          setEmail('');
          setFirstName('');
          setLastName('');
          setPassword('');

          navigate('/login')
        } catch (error) {
            console.log(error.message, error); // Display the error message
            toast({
                title: 'Error creating account',
                description: error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-left'
              })
          }finally{
            setLoading(false)
          }
        };


    const handleChange = (e) => {
        console.log(e,"ee")
        const { name, value } = e.target;
        // Update the corresponding state based on the input field name
        switch (name) {
          case 'email':
            setEmail(value);
            break;
          case 'firstName':
            setFirstName(value);
            break;
          case 'lastName':
            setLastName(value);
            break;
          case 'password':
            setPassword(value);
            break;
          default:
            break;
        }
    }
   return (
     <Box className="homePage" p={["10px", "20px"]}>
       
       <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
        <Box m="0 auto"  w={["80%","60%"]}>
            <Text textAlign="center" className='gradient-text'>Sign up</Text>
            <VStack w="100%" m="30px 0" spacing={5} fontFamily="Inter">
                <Box  w="100%">
                    <Text>Email</Text>
                    <Input 
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                     ></Input>
                </Box>
                <Box  w="100%">
                    <Text>First Name</Text>
                    <Input 
                    placeholder="last name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    ></Input>
                </Box>
                <Box  w="100%">
                    <Text>Last name</Text>
                    <Input 
                    placeholder="last name"
                    name="lastName"
                    value={lastName}
                   onChange={handleChange}
                    ></Input>
                </Box>
                <Box  w="100%">
                    <Text>Password</Text>
                    <Input 
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    ></Input>
                </Box>
            </VStack>
            {loading? 
              <Button  
                isLoading
                loadingText='Submitting'
                 w="100%" 
                  bg="#144EE3"
                 borderRadius="30px"
                  fontSize="14px"
                  _hover={{color : "white"}}>
                   Submit
                </Button>
                :
           <Button  onClick={handleSignUp} variant="unstyled" w="100%" bg="#144EE3" borderRadius="30px" fontSize="14px">Submit</Button>}
          
           <Flex justifyContent="center" p="10px">
           <span style={{textAlign:"center"}} >
           Already registered? <span className='gradient-text-small'> <Link to="/login" >Login</Link></span>
            </span> 
           </Flex>
        </Box>
        
     </Box>
   )
 }
 
 export default Register
 