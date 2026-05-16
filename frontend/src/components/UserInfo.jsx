import React from 'react'
import { User, Check, UserX, UserPlus, Menu } from 'lucide-react';
export default function UserInfo() {
    const userDetails = [
        {
            heading: 'Total Users',
            userCount: 1248,
            color: 'bg-purple-50',
            icon: User,
            iconColor: 'purple'
        },
        {
            heading: 'Active Users',
            userCount: 1156,
            color: 'bg-green-50',
            icon: Check,
            iconColor: 'green'
        },
        {
            heading: 'New this month',
            userCount: 42,
            color: 'bg-blue-50',
            icon: UserPlus,
            iconColor: 'blue'
        },
        {
            heading: 'Inactive Users',
            userCount: 92,
            color: 'bg-orange-50',
            icon: UserX,
            iconColor: 'orange'
        }

    ];
    return (
        <div className='grid grid-cols-4 m-5 gap-5'>
            {userDetails.map((item, index) => {
                const Icon = item.icon
                return (

                    <div className={`${item.color} p-2 rounded shadow-md`}>
                        <div className='flex items-center gap-5'>
                            <div>
                                <Icon size={30} color={item.iconColor} />
                            </div>
                            <div>
                                <p>{item.heading}</p>
                                <p className='text-xl font-semibold'>{item.userCount}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
