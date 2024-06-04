import Image from 'next/image';
import SignUpForm from './components/sign-up-form';
import culligent from '@/public/logo/logo.svg';

export default function SignUp() {
  return (
    <div className="w-full h-full inline-flex flex-col-reverse sm:flex-row justify-center items-center relative">
      <div className="w-full h-full flex-1 flex flex-col justify-center align-middle items-center content-center  bottom-0 left-0 bg-[var(--cruto-black)] absolute sm:static">
        <SignUpForm />
      </div>
      <div className="h-full  flex-1 sm:flex">
        <Image
          src={culligent}
          alt="logo"
          objectFit="contain"
          className="m-auto"
        />
      </div>
    </div>
  );
}
