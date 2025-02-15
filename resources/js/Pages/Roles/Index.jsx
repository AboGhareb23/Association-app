import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Roles({ auth, associations }) {
    const { data, setData, post, errors, reset } = useForm({
        association_member_id: '',
        role_id: '',
        paid_amount: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const [selectedAssociationMember, setSelectedAssociationMember] = useState(null);

    const openModal = (association, role, association_member) => {
        setSelectedAssociation(association);
        setSelectedRole(role);
        setSelectedAssociationMember(association_member);
        setData('association_member_id', association_member); // تأكد من أن association_member هو القيمة الصحيحة
        setData('role_id', role.id);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.addMember'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ direction: 'rtl' }}>
            <Head title="Roles" />
            <div className="flex flex-wrap justify-center mt-4">
                    {associations.map((association, index) => (
                        <div
                            className="animate__animated animate__fadeIn"
                            style={{ animationDelay: `${index * 0.6}s` }}
                            key={association.id}
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4 text-blue-700">{association.name}</h2>
                                <p>عدد الأشهر: {association.total_months}</p>
                                <p>مبلغ الدور: {association.role_price}</p>
                                
                                <h3 className="mt-4 text-lg font-bold">أدوار الجمعية</h3>
                                <div className="flex flex-wrap justify-center mt-4">
                                        {association.roles.map((role, roleIndex) => (
                                            <div
                                                className="animate__animated animate__fadeInUp m-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
                                                style={{ animationDelay: `${roleIndex * 0.3}s` }}
                                                key={role.id}
                                                onClick={() => openModal(association, role)}
                                            >
                                                <div className="bg-white shadow-md rounded-lg p-4 flex flex-row relative w-80 hover:bg-yellow-100 hover:text-blue-700">
                                                <div className="flex-grow text-right pr-2">
                                                <div className="flex justify-between">
                                                        <div className="text-1xl font-bold">{role.name}</div>
                                                        <div className="text-1xl font-bold">{role.start_date}</div>
                                                    </div>
                                                        {role.association_members && role.association_members.length > 0 ? (
                                                            role.association_members.map((associationMember) => (
                                                                <div key={associationMember.id} className="text-sm text-gray-600 mt-1">
                                                                    {associationMember.member?.name || 'اسم غير متوفر'}  : {associationMember.pivot.paid_amount}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-sm text-gray-400 mt-1">لا يوجد أعضاء مرتبطين بهذا الدور</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">                        
                        <h3 className="text-xl font-bold mb-4">
                            إضافة عضو إلى الدور: {selectedRole ? selectedRole.name : 'اسم الدور غير متوفر'}
                        </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label>الأعضاء المسجلين</label>
                                    <select
                                        value={data.association_member_id}
                                        onChange={(e) => setData('association_member_id', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="" className='text-center'>اختر عضوًا</option>
                                        {selectedAssociation && selectedAssociation.members && selectedAssociation.members.length > 0 ? (
                                            selectedAssociation.members.map((member) => (
                                                <option key={member.id} value={member.association_member_id}>
                                                    {member.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>
                                                لا يوجد أعضاء مسجلين
                                            </option>
                                        )}
                                    </select>


                                    {errors.member_id && <p className="text-red-600">{errors.member_id}</p>}
                                </div>
                                <div>
                                    <label>المبلغ المدفوع</label>
                                    <input
                                        type="text"
                                        value={data.paid_amount}
                                        onChange={(e) => setData('paid_amount', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.paid_amount && <p className="text-red-600">{errors.paid_amount}</p>}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        إضافة
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
