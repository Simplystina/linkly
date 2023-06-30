import React,{useState} from 'react'
import { Box, VStack, Text, Input, Button, Flex , useToast} from '@chakra-ui/react'
import {FaBackward} from "react-icons/fa"
import { useNavigate , Link} from "react-router-dom";
import { login } from '../utils/services'

const Login = () => {

    const toast = useToast()
    const navigate = useNavigate();
   

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the corresponding state based on the input field name
        switch (name) {
          case 'email':
            setEmail(value);
            break;
          case 'password':
            setPassword(value);
            break;
          default:
            break;
        }
    }
    const handleLogin = async () => {
        setLoading(true)
         if(!(email && password)){
            toast({
                title: 'Login error',
                description: "All input is required",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-left'
              })
            setLoading(false)
            return
         }
        try {
          const credentials = {
            email,
            password,
          };
    
          const {data} = await login(credentials);
          console.log(data, data.token); 
          localStorage.setItem('token', data.token) // Save JWT token
          localStorage.setItem("firstName", data.firstName)
          toast({
            title: 'Login successfully',
            description: data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-left'
          })
 
         
          // Reset the form fields
          setEmail('');
          setPassword('');

          navigate('/shorten-urls');
          

        } catch (error) {
          console.log(error); // Display the error message
          toast({
            title: 'Login error',
            description: error.message || error,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-left'
          })
        }finally{
            setLoading(false)
        }
      };
  return (
    <Box className="homePage" p={["10px", "20px"]}>
      
      <Link to="/"><Box className='gradient-text'><FaBackward/></Box></Link>
       <Box m="0 auto"  w={["80%","60%"]}>
           <Text textAlign="center" className='gradient-text'>Login</Text>
           <VStack w="100%" m="30px 0" spacing={5} fontFamily="Inter">
               <Box  w="100%">
                   <Text>Email</Text>
                   <Input  
                   name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"></Input>
               </Box>
               <Box  w="100%">
                   <Text>Password</Text>
                   <Input placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}></Input>
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
           <Button  onClick={handleLogin} variant="unstyled" w="100%" bg="#144EE3" borderRadius="30px" fontSize="14px">Submit</Button>
           }
          <Flex justifyContent="center" p="10px"> 
            <span >
                Not registered? <span className='gradient-text-small'> <Link to="/register" >Signup</Link></span>
            </span> 
          </Flex>
       </Box>
    </Box>
  )
}

export default Login
