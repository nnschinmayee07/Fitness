import React from 'react';
import ProfileIcon from './ProfileIcon';

export default function ProfileCorner({ initials = 'U', onClick = null }) {
  return (
    <div className="fixed top-6 right-6 z-40">
      <ProfileIcon
        initials={initials}
        size="lg"
        onClick={onClick}
      />
    </div>
  );
}
