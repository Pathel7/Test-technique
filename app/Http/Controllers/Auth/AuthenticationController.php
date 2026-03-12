<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|min:3|max:255',
            'email'     => 'required|string|unique:users|max:255',
            'password'  => 'required|string|min:6'
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json(['message' => 'User registered successfully']);
    }


    public function login(Request $request)
    {
       
         $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {

            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }

        return $this->respondWithToken($token);
    }


    public function userInfo(Request $request)
    {
        return response()->json($request->user());
    }


    public function logOut(Request $request)
    {
         auth('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }


     public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
