<?php

namespace App\Models;

use App\Models\Association;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'association_id',
        'start_date',
    ];

    public function associations()
    {
        return $this->belongsTo(Association::class);
    }

    public function association_members()
    {
        return $this->belongsToMany(AssociationMember::class, 'association_member_role')
                    ->withPivot('paid_amount')
                    ->with('member') // تضمين بيانات العضو
                    ->withTimestamps();
    }

}
