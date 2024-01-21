<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Http\Requests\RegisterAuthRequest;
use  JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public  $loginAfterSignUp = false;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }



    // public function register(Request $request)
    // {


    //     $user = new  User();
	// 	$user->name = $request->name;
	// 	$user->email = $request->email;
	// 	$user->password = bcrypt($request->password);
	// 	$user->save();

	// 	if ($this->loginAfterSignUp) {
	// 		return  $this->login($request);
	// 	}

	// 	return  response()->json([
	// 		'status' => 'ok',
	// 		'data' => $user
	// 	], 200);


    //     // $this->validate($request,[
    //     //     'email'=>'required',
    //     //     'password'=>'required'
    //     // ]);


    //     // $validator = Validator::make($request->all(), [
    //     //     'name' => 'required|string',
    //     //     'email' => 'required|string|email|unique:users',
    //     //     'password' => 'required|string|min:6',
    //     // ]);

    //     // if ($validator->fails()) {
    //     //     return response()->json(['error' => $validator->errors()], 400);
    //     // }

    //     // $user = User::create([
    //     //     'name' => $request->name,
    //     //     'email' => $request->email,
    //     //     'password' => bcrypt($request->password),
    //     // ]);

    //     // return $this->login($request); // Llamar al método login para generar el token después del registro
    // }


    // public  function  login(Request  $request) {
	// 	$input = $request->only('email', 'password');
	// 	$jwt_token = null;
	// 	if (!$jwt_token = JWTAuth::attempt($input)) {
	// 		return  response()->json([
	// 			'status' => 'invalid_credentials',
	// 			'message' => 'Correo o contraseña no válidos.',
	// 		], 401);
	// 	}

	// 	return  response()->json([
	// 		'status' => 'ok',
	// 		'token' => $jwt_token,
	// 	]);
	// }


    public  function  logout() {

        auth()->logout();

        return response()->json(['message' => 'Succesfully logged out']);
		// $this->validate($request, [
		// 	'token' => 'required'
		// ]);

		// try {
		// 	JWTAuth::invalidate($request->token);
		// 	return  response()->json([
		// 		'status' => 'ok',
		// 		'message' => 'Cierre de sesión exitoso.'
		// 	]);
		// } catch (JWTException  $exception) {
		// 	return  response()->json([
		// 		'status' => 'unknown_error',
		// 		'message' => 'Al usuario no se le pudo cerrar la sesión.'
		// 	], 500);
		// }
	}


    public  function  getAuthUser(Request  $request) {
		$this->validate($request, [
			'token' => 'required'
		]);

		$user = JWTAuth::authenticate($request->token);
		return  response()->json(['user' => $user]);
	}


    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if (!$token = auth()->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return $this->respondWithToken($token);
    // }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }




    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->save();

        $token = JWTAuth::fromUser($user);

        // Crear una cookie con el token
        $cookie = cookie('jwt', $token, 60); // La cookie expira después de 60 minutos

    return response()->json(['message' => 'User registered successfully', 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // // Crear una cookie con el token
        // $cookie = cookie('jwt', $token, 60); // La cookie expira después de 60 minutos

        // return response()->json(['token' => $token]);

        return $this->respondWithToken($token);
    }







}