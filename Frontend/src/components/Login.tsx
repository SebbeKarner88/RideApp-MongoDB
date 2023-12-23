import {useState} from "react";
import {FieldValues, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {fetchApi} from "../services/fetch.api.tsx";
import {
    Box,
    Button,
    Container,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import './CSS/Login.styles.css'
import {IToken} from "../interfaces/IToken.ts";

const Login = ({width, breakpoint}) => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState<boolean>();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const handleClick = () => setShow(!show);

    const schema = z.object({
        username: z
            .string()
            .min(3, {message: 'Username must be at least 3 characters.'}),
        password: z
            .string()
            .min(5, {message: 'Password must be at least 5 characters'}),
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormData>({resolver: zodResolver(schema)});

    const handleRegister = (data: FieldValues) => {
        // userService
        //     .add(undefined, data)
        //     .then(() => {
        //         setShowMessage(true);
        //         setMessage('Successfully registered to the magic');
        //         setSuccess(true);
        //     })
        //     .catch(() => {
        //         setShowMessage(true);
        //         setMessage('Unable to register');
        //         setSuccess(false);
        //     });
    };

    const handleLogin = (data: FieldValues) => {
        fetchApi.login(data).then((token: IToken) => {
            setShowMessage(true);
            sessionStorage.setItem('token', token.token);
            if (token.token !== '') {
                setMessage(
                    `Welcome!`
                );
                setSuccess(true);
            } else {
                setMessage('ERROR');
                setSuccess(false);
            }
        });
    };

    const outerBox = {
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: 'dark-lg',
        p: '6',
        rounded: 'md',
        border: '2px',
        borderColor: 'black',

    };

    return (
        <>
            <Container
                className='loginbox'
                maxW='600px'
                marginTop={10}
                width={{base: '98%', sm: '90%', lg: '80%'}}
                height={{base: '48%', xs: '48%', sm: '40%', md: '40%'}}
                justifyContent='center'
                alignContent='center'
            >
                {showMessage ? (
                    <Container
                        marginTop={10}
                        marginBottom={10}>
                        {success ? (
                            <span>{message}</span>
                        ) : (
                            <span>{message}</span>
                        )}
                    </Container>
                ) : (
                    <div></div>
                )}
                <form>
                    <FormLabel htmlFor='username' aria-required='true'>
                        Username
                    </FormLabel>
                    <Input
                        {...register('username')}
                        variant='outline'
                        id='username'
                        placeholder='Username'
                        type='text'
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <FormLabel marginTop={4} htmlFor='password' aria-required='true'>
                        Enter Password
                    </FormLabel>
                    <InputGroup>
                        <Input
                            variant='outline'
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            {...register('password')}
                            id='password'
                            placeholder='Enter password'
                        />
                        <InputRightElement
                            marginRight={1}
                            width='4.5rem'>
                            <Button h='1.75rem'
                                    backgroundColor='darkgoldenrod'
                                    size='sm'
                                    onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && <p>{errors.password.message}</p>}
                    <Box>
                        <Button
                            marginTop={4}
                            marginRight={4}
                            width={'150px'}
                            color='A67E3FFF'
                            variant='unstyled'
                            fontSize={15}
                            outlineColor='darkgoldenrod'
                            type='submit'
                            onClick={handleSubmit(handleLogin)}
                        >
                            Login
                        </Button>
                        <Button
                            marginTop={4}
                            width={'150px'}
                            color='A67E3FFF'
                            outlineColor='darkgoldenrod'
                            variant='unstyled'
                            fontSize={15}
                            disabled={true}
                            type='submit'
                            onClick={handleSubmit(handleRegister)}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default Login;
