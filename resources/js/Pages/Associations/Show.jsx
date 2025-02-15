import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Associations ({ auth, associations, members }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        member_id: '',
        total_amount: '',
    });

    const totalAmount = associations.members.reduce((acc, member) => {
        return acc + parseFloat(member.pivot?.total_amount || 0); // تحويل المبلغ إلى رقم
    }, 0);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('associations.members.store', associations.id), {
            onSuccess: () => reset(),
        });
    };

    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Members Amount" />
            <div className="w-full p-6 sm:p-6 lg:p-12 animate__animated animate__fadeIn" style={{ direction: 'rtl' }}>
                <h4 className="text-lg font-bold text-center">اضافة العضو و اجمالي مبلغة في الجمعية</h4>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-6 animate__animated animate__fadeIn">
                    <select
                        value={data.member_id}
                        onChange={e => setData('member_id', e.target.value)}
                        className="custom-input text-center w-full border border-gray-300 p-2 rounded"
                    >
                        <option value=""> اختار العضو</option>
                        {members.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                    {errors.member_id && <div className="text-red-500">{errors.member_id}</div>}

                    <input
                        type="number"
                        value={data.total_amount}
                        onChange={e => setData('total_amount', e.target.value)}
                        placeholder="المبلغ"
                        className="custom-input text-center mt-4 w-full border border-gray-300 p-2 rounded"
                    />
                    <InputError message={errors.total_amount} className="mt-2" />
                    <PrimaryButton type="submit" className="btn btn-primary mt-4" disabled={processing}>
                        Add Member
                    </PrimaryButton>
                </form>

                <div className='text-center'>
                    <h2 className="text-xl font-bold p-4">{associations.name}</h2>
                    <p>عدد الاشهر :  {associations.total_months}</p>
                    <p>مبلغ الدور : {associations.role_price}</p>
                </div>

                <h3 className="text-xl mt-4 font-bold">اعضاء الجمعية </h3>
                    <p>إجمالي المبلغ: {totalAmount}</p>
                
               <div className="flex flex-wrap justify-center mt-4">
                                    {associations.members.map((member, memberIndex) => (
                                        <div
                                            className="animate__animated animate__fadeInUp m-4 transition-transform duration-300 hover:scale-105"
                                            style={{ animationDelay: `${memberIndex * 0.3}s` }}
                                            key={member.pivot.id}
                                        >
                                            <div className="bg-white shadow-md rounded-lg p-4 flex flex-row relative w-80 hover:bg-yellow-100 hover:text-blue-700">
                                            <div className="flex-grow text-right pr-2">
                                                <div className="flex-grow text-center">
                                                    <div className="text-1xl">{member.name}</div>
                                                    <div className="text-1xl">{member.pivot.total_amount}</div>
                                                </div>
                                                <div className="absolute bottom-2 left-2">
                                                <Link as="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    href={route('member-amount.destroy', member.pivot.id)} method="delete"
                                                >
                                                      <i className="fas fa-trash"></i>
                                                </Link>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                
            </div>
        </AuthenticatedLayout>
    );
}
