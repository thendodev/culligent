import culligent from '@/public/logo/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative flex w-full h-[50px]">
        <Image src={culligent} alt="logo" fill objectFit="cover" />
      </div>
      <div className="h-48">
        <Link href="/" className="m-auto">
          Back to safety
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
