import { usePathname } from 'next/navigation';

const useActiveLink = (href: string) => {
  const pathname = usePathname();

  return href === pathname;
};

export default useActiveLink;
