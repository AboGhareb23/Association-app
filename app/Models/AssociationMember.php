<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssociationMember extends Model
{
    // تأكد من تعيين الجدول إذا كان له اسم غير قياسي
    protected $table = 'association_member'; // أو 'association_members' إذا كان كذلك

    // العلاقات الأخرى هنا (مثل العلاقة مع Association)
    public function association()
    {
        return $this->belongsTo(Association::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'association_member_role')
                    ->withPivot('paid_amount')
                    ->withTimestamps();
    }

    public function member()
    {
        return $this->belongsTo(Member::class); // إذا كان لديك علاقة مع نموذج Member
    }

}
