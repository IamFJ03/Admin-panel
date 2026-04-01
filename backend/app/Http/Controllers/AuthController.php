<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
{
    try {

        $data = $request->validated();
        $user = User::where('email', $data['email'])->first();

        if(!Hash::check($data['password'], $user->password)){
        return response()->json([
            "message" => "Unauthorized User"
        ], 401);
    }
    return response()->json([
            "message"=> "User Exists",
            "user"=> $user
        ]);
    } catch (\Exception $e) {

        return response()->json([
            "message" => "error",
            "error" => $e->getMessage()
        ], 500);
    }
}

public function register(RegistrRequest $request){
        $data = $request->validated();
        
        $user = User::where('email', $data['email'])->first();
        if($user){
            return response()->json([
                "message"=> "User Already Exists"
            ]);
        }

        $data['password'] = Hash::make($data['password']);
        $newUser = User::create($data);
        return response()->json([
            "message"=>"Registered Successfully",
            "data"=> $newUser
        ]);
}

}
