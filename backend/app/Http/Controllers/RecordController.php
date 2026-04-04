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
}
