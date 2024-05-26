import React from 'react';
import PageWrapper from '../components/page-wrapper';
import Image from 'next/image';

const Profile = () => {
  return (
    <PageWrapper
      title={'settings'}
      description={'fiddle with your settings here'}
    >
      <div className="flex flex-row">
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
