"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signup } from "./actions";

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-black rounded-lg p-8 border border-gray-800">
        <div className="flex justify-center mb-8">
          <BsTwitterX className="w-10 h-10 text-white" /> {/* X logo */}
        </div>

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Sign in to X
        </h1>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...field}
                      required
                      className="bg-black text-white border-gray-700 focus:border-blue-400 h-14 text-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                      required
                      className="bg-black text-white border-gray-700 focus:border-blue-400 h-14 text-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              formAction={signup}
              className="w-full bg-white text-black hover:bg-gray-200 font-bold rounded-full h-14 text-lg"
            >
              Log in
            </Button>
          </form>
        </Form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <form action={signInWithGoogle}>
          <Button
            type="submit"
            variant="outline"
            className="w-full cursor-pointer border-twitter-Lightgray text-twitter-gray hover:bg-blue-400/10 font-bold rounded-full h-14 text-lg mb-4"
          >
            <FcGoogle className="mr-2" />
            Sign in with Google
          </Button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          By signing up, you agree to the{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>
          , including{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Cookie Use
          </a>
          .
        </div>
      </div>
    </div>
  );
}
