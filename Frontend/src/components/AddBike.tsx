import {useState} from 'react';
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
    Input
} from "@chakra-ui/react";

// @ts-ignore
const AddBike = () => {

    const [success, setSuccess] = useState<boolean>();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const schema = z.object({
        maker: z
            .string()
            .min(1, {message: 'Maker must be at least 1 characters.'}),
        model: z
            .string()
            .min(1, {message: 'Model must be at least 1 characters'}),
        size: z
            .string()
            .min(1, {message: 'Size can only be XS to XL.'})
            .max(2, {message: 'Size can only be XS to XL.'}),
        pictures: z
            .string()
            .min(10, {message: 'At least one url is required'}),
        year: z
            .number()
            .min(1970, {message: 'Year must be 4 digits'}),
        type: z
            .string()
            .min(2, {message: 'Type must be at least 2 characters.'}),
        colors: z
            .string()
            .min(2, {message: 'At least one color is required.'}),
        material: z
            .string()
            .min(3, {message: 'Material must be at least 3 characters.'}),
        wheelSize: z
            .number()
            .min(8, {message: 'Wheelsize must be at least 8 - max 36.'})
            .max(36, {message: 'Wheelsize must be at least 8 - max 36.'}),
        gears: z
            .string()
            .min(1, {message: 'Gears must be at least 1 character - max 4'})
            .max(4, {message: 'Gears must be at least 1 character - max 4'}),
        ebike: z
            .string()
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({resolver: zodResolver(schema)});



    const handleAddBike = (data: FieldValues) => {

        data.pictures = data.pictures.split(',').map((url:string) => url.trim());
        data.colors = data.colors.split(',').map((color:string) => color.trim());

        // @ts-ignore
        fetchApi.addNewBike(sessionStorage.getItem('token'), data)
            .then(() => {
                setShowMessage(true);
                setMessage('Successfully added');
                setSuccess(true);
            })
            .catch(() => {
                setShowMessage(true);
                setMessage('Unable to add bike');
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
                marginTop={2}
                width={{base: '98%', sm: '90%', lg: '80%'}}
                height={{base: '48%', xs: '48%', sm: '40%', md: '40%'}}
                justifyContent='center'
                alignContent='center'
            >
                <Heading>Add Bike</Heading>
                <br/>
                <form>
                    <FormLabel htmlFor='maker' aria-required='true'>
                        Maker
                    </FormLabel>
                    <Input
                        {...register('maker')}
                        variant='outline'
                        id='maker'
                        placeholder='Specialized, Santa cruz ...'
                        type='text'
                    />
                    {errors.maker && <p>{errors.maker.message}</p>}

                    <FormLabel marginTop={4} htmlFor='model' aria-required='true'>
                        Model
                    </FormLabel>
                        <Input
                            variant='outline'
                            {...register('model')}
                            id='model'
                            placeholder='SL7, Megatower, Madone ...'
                            type='text'
                        />
                    {errors.model && <p>{errors.model.message}</p>}

                    <FormLabel marginTop={2} htmlFor='size' aria-required='true'>
                        Size
                    </FormLabel>
                    <Input
                        {...register('size')}
                        variant='outline'
                        id='size'
                        placeholder='XS - S - M - L - XL'
                        type='text'
                    />
                    {errors.size && <p>{errors.size.message}</p>}

                    <FormLabel marginTop={2} htmlFor='pictures' aria-required='true'>
                        Picture URLs
                    </FormLabel>
                    <Input
                        {...register('pictures')}
                        variant='outline'
                        id='pictures'
                        placeholder='URLs, seperated by a comma ","'
                        type='text'
                    />
                    {errors.pictures && <p>{errors.pictures.message}</p>}

                    <FormLabel marginTop={2} htmlFor='year' aria-required='true'>
                        Year
                    </FormLabel>
                    <Input
                        {...register('year',{valueAsNumber: true})}
                        variant='outline'
                        id='year'
                        placeholder='Ex. 2021...'
                        type='number'
                    />
                    {errors.year && <p>{errors.year.message}</p>}

                    <FormLabel marginTop={2} htmlFor='type' aria-required='true'>
                        Biketype
                    </FormLabel>
                    <Input
                        {...register('type')}
                        variant='outline'
                        id='type'
                        placeholder='Racer, Trail, TT...'
                        type='text'
                    />
                    {errors.type && <p>{errors.type.message}</p>}

                    <FormLabel marginTop={2} htmlFor='colors' aria-required='true'>
                        Colors
                    </FormLabel>
                    <Input
                        {...register('colors')}
                        variant='outline'
                        id='colors'
                        placeholder='Colors, seperated by a comma ","'
                        type='test'
                    />
                    {errors.colors && <p>{errors.colors.message}</p>}

                    <FormLabel marginTop={2} htmlFor='material' aria-required='true'>
                        Frame material
                    </FormLabel>
                    <Input
                        {...register('material')}
                        variant='outline'
                        id='material'
                        placeholder='Alloy, Carbon, Steel...'
                        type='text'
                    />
                    {errors.material && <p>{errors.material.message}</p>}

                    <FormLabel marginTop={2} htmlFor='wheelSize' aria-required='true'>
                        Wheel size
                    </FormLabel>
                    <Input
                        {...register('wheelSize', {valueAsNumber: true})}
                        variant='outline'
                        id='wheelSize'
                        placeholder='26 - 27,5 - 29... '
                        type='number'
                    />
                    {errors.wheelSize && <p>{errors.wheelSize.message}</p>}

                    <FormLabel marginTop={2} htmlFor='gears' aria-required='true'>
                        Gearing
                    </FormLabel>
                    <Input
                        {...register('gears')}
                        variant='outline'
                        id='gears'
                        placeholder='1 , 12-1 , 11-2...'
                        type='text'
                    />
                    {errors.gears && <p>{errors.gears.message}</p>}

                    <FormLabel marginTop={2} marginBottom={2} htmlFor='ebike' aria-required='true'>
                        E-Bike
                    </FormLabel>
                    <Input
                        {...register('ebike')}
                        variant='outline'
                        id='ebike'
                        placeholder='true / false'
                        type='text'
                    />
                    {errors.ebike && <p>{errors.ebike.message}</p>}
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
                                onClick={handleSubmit(handleAddBike)}
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
export default AddBike;