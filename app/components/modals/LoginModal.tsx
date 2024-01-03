"use client"
import { FC } from 'react'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  set,
  useForm
} from "react-hook-form";
import Modal from '../Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';
// import useRegisterModal from '../../hooks/useRegisterModal'
interface LoginModalProps {
  
}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
    setIsLoading(true)
    try {
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      .then((callback) => {
        setIsLoading(false)
        if(callback?.ok){
          toast.success("Logged in successfully");
          router.refresh()
          loginModal.onClose()
        }
        else{
          toast.error("Invalid credentials");
        }
      })
    } catch (error) {
      toast.error((error as any).response.data.message || "Something went wrong");
    }
    setIsLoading(false)
  },[setIsLoading,loginModal.onClose]);
  const toggle = useCallback(() => {  
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal.onClose,registerModal.onOpen])


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back!"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>First time using Airbnb?
          <span 
            onClick={toggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )


  return (
    <Modal disabled={isLoading} title='Login' actionLabel='Sign In' onClose={loginModal.onClose} isOpen={loginModal.isOpen} onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} footer={footerContent}/>
  )
}

export default LoginModal