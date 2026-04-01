<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
{
    try {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        return response()->json([
            "message" => "login working",
            "email" => $request->email
        ]);

    } catch (\Exception $e) {

        return response()->json([
            "message" => "error",
            "error" => $e->getMessage()
        ], 500);
    }
}
}
