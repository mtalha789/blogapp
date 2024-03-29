import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { login } from '../state/authslice'
import authService from '../appwrite/auth'
import { Input,Logo,Button } from './'
import { useForm } from 'react-hook-form'


export default function Signup({
    name,
    email,
    password
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError]=useState('')
    const {register,handleSubmit} = useForm()

    const createAccount = async (data)=>{
        setError('')
        try {
            const user=await authService.createAccount(data)
            if (user) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    console.log(userData);
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="bg-slate-900 text-center inline-block w-full">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(createAccount)}>
                <div className='space-y-5'>
                    <Input
                    type='name'
                    placeholder="Enter Your Name"
                    label='Name'
                    {...register('name',{required:true})}
                    />
                    <Input
                    type='email'
                    placeholder="Enter Your Email Address"
                    label='Email'
                    {...register('email',{
                        required:true,
                        validate:{
                            matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    type='password'
                    placeholder="Create Password"
                    label='Password'
                    {...register('password',{
                        required:true,
                    })}
                    />
                    <Button type='submit' bgColor='bg-slate-900' className='w-full'>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}
