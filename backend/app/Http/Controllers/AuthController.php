<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
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
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                "message" => "Unauthorized User"
            ], 401);
        }

        $request->session()->regenerate();

        $user = Auth::user();
        $user->update([
            'last_seen' => now()
        ]);

        return response()->json([
            "message" => "Login successful",
            "user" => $user
        ]);

    } catch (\Exception $e) {
        return response()->json([
            "error" => $e->getMessage(),
            "line" => $e->getLine()
        ], 500);
    }
}

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();
        if ($user) {
            return response()->json([
                "message" => "User Already Exists"
            ]);
        }

        $data['password'] = Hash::make($data['password']);
        $newUser = User::create($data);

        return response()->json([
            "message" => "Registered Successfully",
            "data" => $newUser
        ]);
    }

    public function logout(Request $request)
{
    $user = Auth::user(); // ✅ get user BEFORE logout

    if ($user) {
        $user->update([
            'last_seen' => now() // ✅ store time
        ]);
    }

    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        "message" => "Logout Successful"
    ]);
}
}