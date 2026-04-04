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
    return response()->json([
        "message"=>"Record stored",
        "user"=>$user,
        "record"=>$request->all()
    ]);
   }
}
