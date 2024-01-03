import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  src?: string;
  altText?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, altText }) => {
  return (
    <div>
      <Image
      className='rounded-full'
       src={src ||"/images/placeholder.jpg"} alt="avatar" height="30" width="30"
       />
    </div>
  );
};

export default Avatar;
