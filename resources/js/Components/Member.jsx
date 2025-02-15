import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
 
 
export default function Member({ member }) {
 
    const [editing, setEditing] = useState(false);
 
    const { data, setData, patch, processing, reset, errors } = useForm({
        name: member.name,
    });
 
    const submit = (e) => {
        e.preventDefault();
        patch(route('members.update', member.id), { onSuccess: () => setEditing(false) });
    };
 
    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-right text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    تعديل
                                </button>
                                <Dropdown.Link as="button" href={route('members.destroy', member.id)} method="delete">
                                    حذف
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <textarea value={data.name} onChange={e => setData('name', e.target.value)} 
                        className="mt-4 w-full bg-gray-200 text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4 bg-gray-100" onClick={() => setEditing(false) && reset()}>Cancel</button>
                        </div>
                    </form>
                    : <p className="mt-4 text-lg text-gray-900"></p>
                }
            </div>
        </div>
    )
}