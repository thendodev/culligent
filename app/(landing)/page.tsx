import UserAuthForm from './components/user-auth-form';
import Image from 'next/image';
import landingImg from '../../assets/Artificial intelligence-pana.svg';
import logo from '@/public/logo/logo.svg';

export default async function Home() {
  return (
    <div className="w-full h-full inline-flex flex-col-reverse sm:flex-row justify-center items-center relative">
      <div className="w-full h-[55%] flex-1 flex flex-col justify-center align-middle items-center content-center  bottom-0 left-0 bg-[var(--cruto-white)] rounded-t-[1.5rem] absolute sm:static">
        <Image src={logo} width={200} alt="the logo" />
        <div id="sign in form" className="w-[90%] lg:w-[45%] sm:w-[80%]">
          <div className="w-full flex gap-5 align-middle justify-center content-center flex-col h-fit">
            <UserAuthForm />
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-[var(--cruto-background)] flex-1 sm:flex">
        <Image
          src={landingImg}
          alt="landing page image"
          objectFit="cover"
          className="m-auto"
        />
      </div>
    </div>
  );
}
