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

import { getBaseUrl } from '@/global/config';
import { envServer } from '@/global/envServer';
import { log } from 'console';
type TForgotPasswordProps = {
  username?: string;
  userImage?: string;
  inviteLink?: string;
};

export const MagicLinkEmail = ({
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
            <Section className="mt-[32px] w-full ">
              {/* <Img
                src={`data:image/png;base64,${banner}`}
                className="my-0 mx-auto absolute object-contain"
              /> */}
              <Text className="text-[var(--cruto-text)] text-4xl font-bold leading-[24px] mx-auto">
                Culligent
              </Text>
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
                  {/* <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  /> */}
                </Column>
                <Column align="center">
                  {/* <Img
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                  /> */}
                </Column>
                <Column align="left">
                  {/* <Img
                    className="rounded-full"
                    src={`data:image/png;base64,${logoImg}`}
                    width="64"
                    height="64"
                    alt="culligent logo"
                  /> */}
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
              <br />
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{' '}
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

export default MagicLinkEmail;
