import React, { createContext, useState } from "react";
import NavBar from "../NavBar";
import Input from "../Input";
/// this belong to use form hook
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
/// this belong to use form hook

/// this belong to use form hook
export type Inputs = {
  email: string;
  name: string;
  password: string;
};
/// this belong to use form hook

enum Variant {
  SIGN_UP,
  LOG_IN,
}

interface AuthFormContextType {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs>;
}

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: {},
});

const LoginPage = () => {
  /// this belong to use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<Inputs>();
  /// this belong to use form hook

  const [variant, setVariant] = useState(Variant.LOG_IN);
  const [authError,setAuthError] = useState("")
  const { signup, login } = useAuth();
  const navigate = useNavigate()
  //console.log(errors);
  /// this belong to use form hook
  const onSubmit: SubmitHandler<Inputs> = async ({ password, email, name }) => {
    // console.log(data);
    try {
      if (variant === Variant.SIGN_UP) {
        await signup({
          email,
          password,
          username: name,
        });
      } else {
        await login({
          email,
          password,
        });
      }
      setAuthError("")
      navigate('/browse')
    } catch (error: any) {
      //console.log(error)
      setAuthError(error.response.data.errors[0].msg)
    }
  };

  const handleChangeAuthVariant = () => {
    if(variant === Variant.LOG_IN) setVariant(Variant.SIGN_UP)
    else setVariant(Variant.LOG_IN)

    setAuthError("")
  }
  /// this belong to use form hook
  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? "Sign Up" : "Sign In"}
          </h2>

          <AuthFormContext.Provider value={{ register, errors }}>
            {/* /// this belong to use form hook */}
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* /// this belong to use form hook */}

              {variant === Variant.SIGN_UP && (
                <Input id="username" type="text" label="username" name="name" />
              )}
              <Input
                id="email"
                type="email"
                label="Email Address"
                name="email"
              />
              <Input
                id="password"
                type="password"
                label="password"
                name="password"
                validate={
                  variant === Variant.SIGN_UP
                    ? () => {
                        const password = getValues("password");
                        if (password.length < 8) {
                          return "Passowrd must be graeter than 8 characters";
                        }
                        // if (!/[A-Z]/.test(password)) {
                        //   return "password must have atleast one uppercase values";
                        // }
                        // if (!/[a-z]/.test(password)) {
                        //   return "password must have atleast one lowercase values";
                        // }
                        // if (!/\d/.test(password)) {
                        //   return "password must have number";
                        // }
                        return true;
                      }
                    : undefined
                }
              />
              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFormContext.Provider>
          {variant === Variant.LOG_IN ? (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}
            >
              <span className="text-white ml-1 hover:underline cursor-pointer">
                First time using Netflix?
              </span>
            </p>
          ) : (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}
            >
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Already have an Account?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
