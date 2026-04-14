<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;

class AdminController extends Controller
{
    public function adminData(Request $request){
        $UserData = Record::selectRaw("
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense
        ")
        ->first();
        $balance = $UserData->income - $UserData->expense;
        $totalRecords = Record::count();

        return response()->json([
            "message"=> "Admin Dashboard data",
            "info"=>[
                "income"=>$UserData->income,
                "expense"=>$UserData->expense,
                "balance"=>$balance,
                "Total Records"=>$totalRecords
            ]
        ]);
    }
}
