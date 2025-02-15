
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Member from '@/Components/Member';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Members ({ auth, members }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('members.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ direction: 'rtl' }}>
            <Head title="Members" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 animate__animated animate__fadeIn">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="اضافة عضو جديد"
                                className="custom-input w-full border border-gray-300 p-2 rounded"
                            />

                            <InputError message={errors.name} className="mt-2" />
                            <PrimaryButton className="mt-4" disabled={processing}>Add Member</PrimaryButton>
                        </form>
                    </div>

                    <div className="flex flex-wrap justify-center mt-4">
                        {members.map((member, index) => (
                            <div
                                className={`animate__animated animate__fadeInUp m-12 transition-transform duration-300 hover:scale-105`}
                                style={{ animationDelay: `${index * 0.3}s` }}
                                key={member.id}
                            >
                                <div className="bg-white shadow-md rounded-lg p-8 flex flex-row relative w-72 hover:bg-yellow-100 hover:text-blue-700">
                                    <div className="flex-grow text-right pr-4">
                                        <div className="text-2xl font-bold">
                                        <Link href="" className="text-blue-600 hover:text-red-500">
                                            {member.name}
                                        </Link>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <Member className="text-sm" member={member} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

            </div>
            </AuthenticatedLayout>
        );
}