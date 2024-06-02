import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';
import culligent from '@/public/logo/logo.svg';
import logo from '@/public/favicon_io/android-chrome-192x192.png';
import Image from 'next/image';
import { getBaseUrl } from '@/global/config';
import { envServer } from '@/global/envServer';

type TForgotPasswordProps = {
  username?: string;
  userImage?: string;
  inviteLink?: string;
};

const baseUrl = getBaseUrl(envServer.NEXT_PUBLIC_ENVIRONMENT);

export const ForgotPasswordEmail = ({
  username,
  userImage,
  inviteLink,
}: TForgotPasswordProps) => {
  const previewText = `Magic Login for ${username}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Image
                src={culligent}
                fill
                objectFit="contain"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Click on the button below to gain access to your account.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Image
                    className="rounded-full"
                    src={logo}
                    width="64"
                    height="64"
                    alt="culligent logo"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Login
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for
              <span className="text-black">{username}</span>.
              <span>
                If you were not expecting this invitation, you can ignore this
                email. If you are concerned about your account`&apos;`s safety,
                please get in touch with us.
              </span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  username: 'alanturing',
  userImage: `${baseUrl}/static/vercel-user.png`,
  teamImage: logo,
} as TForgotPasswordProps;

export default ForgotPasswordEmail;
