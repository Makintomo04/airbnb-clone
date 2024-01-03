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
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useLoginModal from '@/app/hooks/useLoginModal';
// import useRegisterModal from '../../hooks/useRegisterModal'
interface RegisterModalProps {
  
}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post("/api/register", data);
      if (response.data.success) {
        toast.success("Account created successfully");
        registerModal.onClose()
      }
    } catch (error) {
      toast.error((error as any).response.data.message || "Something went wrong");
    }
    setIsLoading(false)
  },[setIsLoading,registerModal.onClose]);

  const toggle = useCallback(() => {  
    registerModal.onClose()
    loginModal.onOpen()
  },[registerModal.onClose,loginModal.onOpen])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
        <p>Already have an account?
          <span 
            onClick={toggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )


  return (
    <Modal disabled={isLoading} title='Register' actionLabel='Create Account' onClose={registerModal.onClose} isOpen={registerModal.isOpen} onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} footer={footerContent}/>
  )
}

export default RegisterModal