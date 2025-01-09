import Registration from '@/Components/Registration';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Register" />
            <div className="">

                <header className="">
                    <div className="top-nav bg-red-600 text-white p-2">
                        <div className="container flex items-ceneter justify-between">
                        <p>
                            mail:infor@upnd.co.ke
                        </p>
                        <p>
                        Wu-Yi Plaza, Block A8, 4th Floor,
                        </p>
                        </div>
                    </div>
                    <nav className=" bg-gray-100 mx-24 mt-6 text-black p-4 px-8 rounded-full">

                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <img src="https://upnd.co.ke/wp-content/uploads/2024/10/WhatsApp_Image_2024-07-30_at_13.11.57-removebg-preview.png" alt="upnd-log" className='h-12 w-12'/>
                            </div>


                            <div className='flex gap-6 text-md text-gray-700 font-medium'>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}

                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}

                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}

                                    >
                                        Verify Membership
                                    </Link>
                                </>
                            )}

                            </div>

                        </div>

                    </nav>
                </header>

                <main className="mt-6">
                    <section className="info-brief flex flex-col items-center justify-center">
                        <h1 className="text-center font-bold text-2xl underline mb-4">
                            Party Membership Registration
                        </h1>
                        <p className="text-center w-3/4 sm:w-2/4">
                            By becoming a member of our political party, you agree to receive promotional messages, bulk SMS, and short code-based messaging. The cost for these communications will be determined by the relevant party departments periodically.
                            <br />
                            <br />
                            For any questions or concerns, please visit our <span className="text-red-600 font-bold">Support Page</span>.
                        </p>
                    </section>
                    <Registration/>
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">

                </footer>

            </div>
        </>
    );
}
