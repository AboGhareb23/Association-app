<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['member_id', 'association_id', 'amount', 'payment_date'];

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
}
