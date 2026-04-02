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

        if(!$user || !Hash::check($data['password'], $user->password)){
        return response()->json([
            "message" => "Unauthorized User"
        ], 401);
        }
        $token = $user->createToken('auth_Token')->plainTextToken;
    return response()->json([
            "message"=> "User Exists",
            "user"=> $user,
            "token"=> $token
        ]);
    } catch (\Exception $e) {
    return response()->json([
        "error" => $e->getMessage(),
        "line" => $e->getLine()
    ], 500);
}
}

public function register(RegisterRequest $request){
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
