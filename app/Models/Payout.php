<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    protected $fillable = ['member_id', 'association_id', 'role_id', 'amount', 'payout_date'];

    // علاقة 1:n مع الأعضاء
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    // علاقة 1:n مع الجمعيات
    public function association()
    {
        return $this->belongsTo(Association::class);
    }

    // علاقة 1:n مع الأدوار
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
