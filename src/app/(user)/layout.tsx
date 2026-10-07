import UserHeader from '@/components/user/UserHeader';
import UserFooter from '@/components/user/UserFooter';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <UserHeader />
      <main className="flex-1 w-full">{children}</main>
      <UserFooter />
    </div>
  );
}
