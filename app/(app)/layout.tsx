import { headers } from 'next/headers';
import { getAppConfig, getOrigin } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const hdrs = await headers();
  const origin = getOrigin(hdrs);
  const { companyName, logo, logoDark } = await getAppConfig(origin);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 hidden w-full flex-row justify-between p-6 md:flex">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.genesys.com/"
          className="scale-100 transition-transform duration-300 hover:scale-110"
        >
          <img src={logo} alt={`${companyName} Logo`} className="block h-8 w-auto dark:hidden" />
          <img
            src={logoDark ?? logo}
            alt={`${companyName} Logo`}
            className="hidden h-8 w-auto dark:block"
          />
        </a>
        <span className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
          Built for{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://project/link/tba"
            className="underline underline-offset-4"
          >
            Hackathon-2025
          </a>
        </span>
      </header>
      {children}
    </>
  );
}