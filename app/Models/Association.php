<?php

namespace App\Models;

use App\Models\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Association extends Model
{
    use HasFactory;
 
    protected $fillable = [
        'name',
        'total_months',
        'role_price',
    ];

    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    public function members()
{
    return $this->belongsToMany(Member::class, 'association_member')
                ->withPivot('id', 'total_amount') // لتضمين عمود 'id' من الجدول الوسيط
                ->withTimestamps();
}

// في App\Models\Association.php
public function association_members()
{
    return $this->hasMany(AssociationMember::class);
}

}
