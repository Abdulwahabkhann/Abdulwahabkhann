'use client';

import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="btn-3d bg-secondary text-white mb-8"
    >
      &larr; Go Back
    </button>
  );
};

export default GoBackButton;
