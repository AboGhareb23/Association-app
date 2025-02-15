<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Member;
use App\Models\Association;
use App\Models\AssociationMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    
    
    public function index()
    {
        $associations = Association::with(['roles', 'members' => function($query) {
            $query->select('members.id', 'name', 'association_member.id as association_member_id');
            },'roles.association_members' => function ($query) {
                $query->withPivot('paid_amount');
            }
            ])->get();
            
        $roles = Role::with(['association_members.member'])->get();

        return Inertia::render('Roles/Index', [
            'associations' => $associations,
        ]);
    }
    
    public function addMember(Request $request)
{
    //dd($request->all());
    $request->validate([
        'association_member_id' => 'required|exists:association_member,id',
        'role_id' => 'required|exists:roles,id',
        'paid_amount' => 'required|numeric',
    ]);

    $associationMember = AssociationMember::find($request->association_member_id);
    $associationMember->roles()->attach($request->role_id, ['paid_amount' => $request->paid_amount]);

    return redirect()->back()->with('success', 'تم إضافة المبلغ للدور بنجاح.');
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
