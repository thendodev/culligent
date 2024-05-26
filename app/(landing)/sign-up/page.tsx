import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import signupImage from '@/assets/Sign up-bro.svg';
import Image from 'next/image';
import SignUpForm from './components/sign-up-form';

export default function SignUp() {
  return (
    <div className="w-full h-full inline-flex flex-col-reverse sm:flex-row justify-center items-center relative">
      <div className="w-full flex-1 flex flex-col justify-center align-middle items-center content-center  bottom-0 left-0 bg-[var(--cruto-white)] rounded-t-[1.5rem] absolute sm:static">
        <div id="sign in form" className="w-[90%] lg:w-[45%] sm:w-[80%] h-full">
          <div className=" w-full flex align-middle justify-start content-center flex-col h-[500px]">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="h-full bg-[var(--cruto-green)] flex-1 sm:flex">
        <Image
          src={signupImage}
          alt="landing page image"
          objectFit="contain"
          className="m-auto"
        />
      </div>
    </div>
  );
}
