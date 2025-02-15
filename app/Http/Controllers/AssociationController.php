<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use App\Models\Role;
use App\Models\Member;
use App\Models\Association;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssociationController extends Controller
{
  
    public function index()
    {
        $associations = Association::all();

        return Inertia::render('Associations/Index', [
            'associations' => $associations
        ]);
    }

    public function show($id)
    {
        $associations = Association::with(['roles', 'members'])->findOrFail($id);
        $roles = Role::all();  
        $members = Member::all(); 

        return Inertia::render('Associations/Show', [
            'associations' => $associations,
            'members' => $members,
            'roles' => $roles, 
        ]);
    }

  

public function store(Request $request): RedirectResponse
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'total_months' => 'required|integer|min:1',
        'role_price' => 'required|numeric|min:0',
    ]);

    $association = Association::create([
        'name' => $validated['name'],
        'total_months' => $validated['total_months'],
        'role_price' => $validated['role_price'],
    ]);

    // لإضافة الأدوار عند إنشاء جمعية جديدة مع تواريخ البداية لكل دور
    $role_names = [
        'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر',
        'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر', 'الخامس عشر', 'السادس عشر', 'السابع عشر',
        'الثامن عشر', 'التاسع عشر', 'العشرون'
    ];

    // تاريخ بداية الأدوار
    $startDate = Carbon::now()->startOfMonth(); // البداية من بداية الشهر الحالي

    for ($i = 0; $i < $validated['total_months']; $i++) {
        // زيادة عدد الأشهر لكل دور
        $roleDate = $startDate->copy()->addMonths($i)->toDateString(); 

        Role::create([
            'name' => $role_names[$i] ?? 'الدور ' . ($i + 1),
            'association_id' => $association->id,
            'start_date' => $roleDate, // حفظ الشهر والسنة بدون تكرار
        ]);
    }
    return redirect(route('associations.index'));
}


    public function storeMemberAssociation(Request $request, Association $association)
{
    $validated = $request->validate([
        'member_id' => 'required|exists:members,id',
        'total_amount' => 'required|numeric|min:0',
    ]);

    if ($association->members()->where('member_id', $validated['member_id'])->exists()) {
        return back()->withErrors(['member_id' => 'Member is already part of this group.']);
    }

    //$member = Member::findOrFail($validated['member_id']);

    $association->members()->attach($validated['member_id'], ['total_amount' => $validated['total_amount']]);

    return redirect()->route('associations.show', $association->id)->with('success', 'Member added to group successfully.');
}


    public function edit(Association $association)
    {
        //
    }

    

    public function update(Request $request, Association $association): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role_price' => 'required|numeric|min:0',
        ]);
 
        $association->update($validated);
 
        return redirect(route('associations.index'));
    }

    

    public function destroy(Association $association): RedirectResponse
    {
        $association->delete();
 
        return redirect(route('associations.index'));
    }

    

}
