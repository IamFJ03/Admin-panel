<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use App\Models\User;

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
        
        $AnalyticData = Record::selectRaw("
            Month(date) as month,
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense
        ")
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        $CategoryFetch = Record::selectRaw("
        category,
        Sum(amount) as total
        ")
        ->groupBy('category')
        ->get();
        
        $recentTransactions = Record::latest('date')
    ->limit(5)
    ->get();
        
        return response()->json([
            "message"=> "Admin Dashboard data",
            "AnalyticData"=>$AnalyticData,
            "info"=>[
                "income"=>$UserData->income,
                "expense"=>$UserData->expense,
                "balance"=>$balance,
                "totalRecords"=>$totalRecords
            ],
            "Category"=>$CategoryFetch,
            "transaction"=>$recentTransactions
        ]);
    }
    public function AllUsers(Request $request){
        $AllUsers = User::paginate(5);
        return response()->json([
            "message"=>"All Users fetched",
            "Users"=> $AllUsers
        ]);
    }
}
