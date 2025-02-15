<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Models\Association;
use App\Models\AssociationMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AssociationMemberController extends Controller
{
    public function destroy($id): RedirectResponse
    {
        // احذف السجل بناءً على معرفه
        DB::table('association_member')->where('id', $id)->delete();

        return redirect()->back()->with('message', 'تم حذف العضو من الجمعية بنجاح.');
    }

    
}
