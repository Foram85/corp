'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

export default function Hero(props: HeroProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store the current path before refresh
      sessionStorage.setItem('wasRefreshed', 'true');
    };

    // Check if this page load was from a refresh
    const wasRefreshed = sessionStorage.getItem('wasRefreshed') === 'true';
    
    if (wasRefreshed && pathname !== '/') {
      router.push('/');
      sessionStorage.removeItem('wasRefreshed');
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, router]);

  return (
    <div className="relative h-screen">
      <div className="absolute -z-10 inset-0">
        <Image
          src={props.imgData}
          alt={props.imgAlt}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900" />
      </div>
      <div className="pt-48 flex justify-center items-center">
        <h1 className="text-white text-6xl">{props.title}</h1>
      </div>
    </div>
  );
}
