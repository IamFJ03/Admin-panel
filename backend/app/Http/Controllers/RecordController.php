<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Record;
use Illuminate\Http\Request;

class RecordController extends Controller
{
   public function addRecord(Request $request){
    $userId = $request->user()->id;
    $user = User::where('id', $userId)->first();
    $addedRecord = Record::create([
    'user_id' => $request->user()->id,
    'amount' => $request->amount,
    'notes' => $request->notes,
    'date' => $request->date,
    'category' => $request->category,
    'type' => $request->type,
    ]);

    return response()->json([
        "message"=>"Record stored",
        "user"=>$user,
        "record"=>$addedRecord
    ]);
   }

   public function loadRecords(Request $request){
    $userId = $request->user()->id;
    $records = Record::where('user_id', $userId)->get();

    return response()->json([
        "message"=> "Records Fetched",
        "records"=> $records
    ]);
   }

   public function loadAmount(Request $request){
    $userId = $request->user()->id;

    $records = Record::where('user_id', $userId)->count();

    $monthly = Record::where('user_id', $userId)
        ->selectRaw("
            MONTH(date) as month,
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense
        ")
        ->groupBy('month')
        ->orderBy('month')
        ->get();

    $totals = Record::where('user_id', $userId)
        ->selectRaw("
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense
        ")
        ->first();

    $category = Record::where('user_id', $userId)
    ->selectRaw('category, Sum(amount) as total')
    ->groupBy('category')
    ->get();

    $currentMonth = Record::where('user_id', $userId)
        ->whereMonth('date', now()->month)
        ->whereYear('date', now()->year)
        ->selectRaw("
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense
        ")
        ->first();

    return response()->json([
        "message"=> "Data Fetched",
        'monthly' => $monthly,
        'totals' => [
            'income' => $totals->income ?? 0,
            'expense' => $totals->expense ?? 0,
            'balance' => ($totals->income ?? 0) - ($totals->expense ?? 0),
        ],
        'currentMonth' => [
            'income' => $currentMonth->income ?? 0,
            'expense' => $currentMonth->expense ?? 0,
            'balance' => ($currentMonth->income ?? 0) - ($currentMonth->expense ?? 0),
        ],
        "totalRecords"=> $records,
        "categoryTotal"=> $category
    ]);
   }

   public function filterCategory(Request $request){
    $userId = $request->user()->id;
    
 $categoryFetch = $request->query('category');
 if($categoryFetch === "All"){
    $category = Record::where('user_id', $userId)
    ->selectRaw("category, Sum(amount) as total")
    ->groupBy('category')
    ->get();
 }

    return response()->json([
        "message"=> "Category Data Fetched",
        "categoryData"=> $category
    ]);
   }
}
