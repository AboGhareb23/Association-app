<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name', 
    ];

    public function associations()
{
    return $this->belongsToMany(Association::class, 'association_member')
                ->withPivot('id','total_amount')
                ->withTimestamps();
}

}
