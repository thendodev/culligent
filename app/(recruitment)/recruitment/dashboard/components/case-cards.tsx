import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = {
  title: string;
  desc?: string;
  Icon: any;
  action: string;
  url: string;
  color: string;
};

const caseCards = ({ title, desc, Icon, action, color, url }: Props) => {
  return (
    <Card
      className="
        h-[120px] w-full
        bg-[color:var(--cruto-white)]
        transition-all duration-300 ease-in-out
        hover:bg-[var(--cruto-whitish)]
        flex flex-row items-center content-center justify-around 
        rounded-[10px]"
    >
      <CardHeader>
        <Icon color={color} size={30} />
      </CardHeader>
      <CardContent className="flex flex-col content-center items-start justify-around p-5 h-full  w-full">
        <CardTitle className="text-[1rem]  text-[color:var(--cruto-pale-grey)]">
          {title}
        </CardTitle>
        <Link
          href={url}
          className="w-full hover:text-[color:var(--cruto-grey)] flex flex-wrap align-middle content-centernt-center items-center"
          style={{ color: color }}
        >
          <Plus size={20} color={color} /> {action}
        </Link>
      </CardContent>
    </Card>
  );
};

export default caseCards;
