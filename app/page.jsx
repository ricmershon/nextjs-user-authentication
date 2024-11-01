import AuthForm from '@/components/auth-form';

export default async function Home({ searchParams }) {
    return <AuthForm mode={searchParams.mode || 'login'} />;
}