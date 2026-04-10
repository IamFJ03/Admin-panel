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
    $date = $request->query('date');
    $category = $request->query('category');
    $type = $request->query('types');
    $record = Record::where('user_id', $userId);

    if(!empty($category)){
        $record->where('category', $category);
    }
    if(!empty($type)){
        $record->where('type', $type);
    }
    if($date && $date !== "All"){
        $month = (int)$date;
        $year = now()->year;

        if($month > now()->month){
            $year = now()->subYear()->year;
        }

        $record->whereMonth('date', $month)
               ->whereYear('date', $year);
    }
    
    $records = $record->orderBy('date', 'desc')->paginate(6);
    return response()->json($records);
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
    ->selectRaw("category, Sum(amount) as total, Count(*) as counts")
    ->groupBy('category')
    ->get();
 }
 else{
    $category = Record::where('user_id', $userId)
    ->where('category', $categoryFetch)
    ->selectRaw("category, Sum(amount) as total, Count(*) as counts")
    ->groupBy('category')
    ->get();
 }
 $dateFilter = $request->query('date');
 if($dateFilter === "This Month"){
    $month = now()->month;
    $year = now()->year;
 }
 else{
    $month = $dateFilter;
    $year = now()->year;
    if($month > now()->month){
        $year = now()->subYear()->year;
    }
 }

$currentMonth = Record::where('user_id', $userId)
        ->whereMonth('date', $month)
        ->whereYear('date', $year)
        ->selectRaw("
            SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) as income,
            SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) as expense,
            COUNT(CASE WHEN type='Income' THEN 1 END) as income_count,
            COUNT(CASE WHEN type='Expense' THEN 1 END) as expense_count
        ")
        ->first();

  $currntTotal = $currentMonth->income - $currentMonth->expense;
  
 $categoryTotal = Record::where('user_id', $userId)->sum('amount');
    
    return response()->json([
        "message"=> "Category Data Fetched",
        "categoryData"=> $category,
        "categoryTotal"=> $categoryTotal,
        "currentMonth"=> [
            "income"=> $currentMonth->income,
            "expense"=> $currentMonth->expense,
            "incomeTransaction"=>$currentMonth->income_count,
            "expenseTransaction"=> $currentMonth->expense_count,
            "balance"=>$currntTotal
        ],
    ]);
   }

   public function deleteRecord($id){
    $deletedRecord = Record::where('id', $id)->delete();
    return response()->json(['message' => 'Deleted successfully']);
   }
}
