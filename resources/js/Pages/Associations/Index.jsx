
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Association from '@/Components/Association';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Associations ({ auth, associations }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        total_months: '',
        role_price: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('associations.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ direction: 'rtl' }}>
            <Head title="Associations" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 animate__animated animate__fadeIn">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="اضافة جمعية جديدة"
                                className="custom-input w-full border border-gray-300 p-2 rounded"
                            />

                            <input
                                type="number"
                                value={data.total_months}
                                onChange={e => setData('total_months', e.target.value)}
                                placeholder="اجمالي الاشهر"
                                className="custom-input w-full border border-gray-300 p-2 rounded mt-4"
                            />

                            <input
                                type="number"
                                value={data.role_price}
                                onChange={e => setData('role_price', e.target.value)}
                                placeholder="سعر الدور"
                                className="custom-input w-full border border-gray-300 p-2 rounded mt-4"
                            />

                            <InputError message={errors.message} className="mt-2" />
                            <PrimaryButton className="mt-4" disabled={processing}>Add Association</PrimaryButton>
                        </form>
                    </div>

                    <div className="flex flex-wrap justify-center mt-4">
                        {associations.map((association, index) => (
                            <div
                                className={`animate__animated animate__fadeInUp m-12 transition-transform duration-300 hover:scale-105`}
                                style={{ animationDelay: `${index * 0.3}s` }}
                                key={association.id}
                            >
                                <div className="bg-white shadow-md rounded-lg p-8 flex flex-row relative w-72 hover:bg-yellow-100 hover:text-blue-700">
                                    <div className="flex-grow text-right pr-4">
                                        <div className="text-2xl font-bold">
                                        <Link href={route('associations.show', association.id)} className="text-blue-600 hover:text-blue-900">
                                            {association.name}
                                        </Link>
                                        </div>
                                        <div className="text-gray-600">{association.total_months} شهر</div>
                                        <div className="text-gray-600">{association.role_price} في الشهر</div>
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <Association className="text-sm" association={association} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

            </div>
            </AuthenticatedLayout>
        );
}