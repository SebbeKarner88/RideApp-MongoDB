import React, {useState} from 'react';
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {fetchApi} from "../services/fetch.api.tsx";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    FormLabel, Heading,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";

// @ts-ignore
const Register = () => {

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
        firstName: z
            .string()
            .min(1, {message: 'First name must be at least 1 character.'}),
        lastName: z
            .string()
            .min(1, {message: 'Last name must be at least 1 character.'}),
        phoneNumber: z
            .string()
            .min(6, {message: 'Phone number must be at least 6 digit.'}),
        street: z
            .string()
            .min(2, {message: 'Street name must be at least 2 characters.'}),
        streetNumber: z
            .number()
            .min(1, {message: 'Street number must be at least 1 digit.'}),
        zipCode: z
            .string()
            .min(5, {message: 'Zipcode must be at least 5 digit.'}),
        city: z
            .string()
            .min(1, {message: 'City must be at least 1 character.'}),
        country: z
            .string()
            .min(2, {message: 'Country must be at least 2 character.'}),

        bikeCollection: z.array(z.string()).default([]),

        userRides: z.array(z.string()).default([]),

    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<FormData>({resolver: zodResolver(schema)});


    const handleRegister = (data: FieldValues) => {
        fetchApi
            .register(data)
            .then(() => {
                setShowMessage(true);
                setMessage('Successfully registered');
                setSuccess(true);
            })
            .catch(() => {
                setShowMessage(true);
                setMessage('Unable to register');
                setSuccess(false);
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
            {showMessage ? (
                <Alert sx={outerBox} color="black" marginTop={10} status={success ? 'success' : 'error'}>
                    {success ? (
                        <AlertTitle>{message}</AlertTitle>
                    ) : (
                        <AlertTitle>{message}</AlertTitle>
                    )}
                </Alert>
            ) : (
                <div></div>
            )}

            <Container
                className='loginbox'
                maxW='600px'
                marginTop={10}
                width={{base: '98%', sm: '90%', lg: '80%'}}
                height={{base: '48%', xs: '48%', sm: '40%', md: '40%'}}
                justifyContent='center'
                alignContent='center'
            >
                <Heading>Register</Heading>
                <br/>
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
                        Password
                    </FormLabel>
                    <InputGroup>
                        <Input
                            variant='outline'
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            {...register('password')}
                            id='password'
                            placeholder='Password'
                        />
                        <InputRightElement
                            marginRight={1}
                            width='4.5rem'>
                            <Button h='1.75rem'
                                    size='sm'
                                    onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.password && <p>{errors.password.message}</p>}

                    <FormLabel marginTop={2} htmlFor='firstName' aria-required='true'>
                        First name
                    </FormLabel>
                    <Input
                        {...register('firstName')}
                        variant='outline'
                        id='firstName'
                        placeholder='First name'
                        type='text'
                    />
                    {errors.firstName && <p>{errors.firstName.message}</p>}

                    <FormLabel marginTop={2} htmlFor='lastName' aria-required='true'>
                        Last name
                    </FormLabel>
                    <Input
                        {...register('lastName')}
                        variant='outline'
                        id='lastName'
                        placeholder='Last name'
                        type='text'
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}

                    <FormLabel marginTop={2} htmlFor='phoneNumber' aria-required='true'>
                        Phone Number
                    </FormLabel>
                    <Input
                        {...register('phoneNumber')}
                        variant='outline'
                        id='phoneNumber'
                        placeholder='Phone number'
                        type='text'
                    />
                    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

                    <FormLabel marginTop={2} htmlFor='street' aria-required='true'>
                        Street name
                    </FormLabel>
                    <Input
                        {...register('street')}
                        variant='outline'
                        id='street'
                        placeholder='Street name'
                        type='text'
                    />
                    {errors.street && <p>{errors.street.message}</p>}

                    <FormLabel marginTop={2} htmlFor='streetNumber' aria-required='true'>
                        Street Number
                    </FormLabel>
                    <Input
                        {...register('streetNumber',{valueAsNumber: true})}
                        variant='outline'
                        id='streetNumber'
                        placeholder='Street number'
                        type='number'
                    />
                    {errors.streetNumber && <p>{errors.streetNumber.message}</p>}

                    <FormLabel marginTop={2} htmlFor='zipCode' aria-required='true'>
                        Zipcode
                    </FormLabel>
                    <Input
                        {...register('zipCode')}
                        variant='outline'
                        id='zipCode'
                        placeholder='Zip code'
                        type='text'
                    />
                    {errors.zipCode && <p>{errors.zipCode.message}</p>}

                    <FormLabel marginTop={2} htmlFor='city' aria-required='true'>
                        City
                    </FormLabel>
                    <Input
                        {...register('city')}
                        variant='outline'
                        id='city'
                        placeholder='City'
                        type='text'
                    />
                    {errors.city && <p>{errors.city.message}</p>}

                    <FormLabel marginTop={2} htmlFor='country' aria-required='true'>
                        Country
                    </FormLabel>
                    <Input
                        {...register('country')}
                        variant='outline'
                        id='country'
                        placeholder='Country'
                        type='text'
                    />
                    {errors.country && <p>{errors.country.message}</p>}
                    <Box>
                        {!success ? <Button
                            marginTop={4}
                            marginRight={4}
                            width={'150px'}
                            color='A67E3FFF'
                            variant='unstyled'
                            fontSize={15}
                            outlineColor='darkgoldenrod'
                            type='submit'
                            onClick={handleSubmit(handleRegister)}
                        >
                            Register
                        </Button>
                        :
                        <div></div>}
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default Register;