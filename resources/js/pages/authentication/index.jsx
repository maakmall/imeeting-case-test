import { Form, Head } from "@inertiajs/react";
import Card from "../../components/card";
import AuthLayout from "../../layouts/auth";
import { FormInput } from "../../components/form-input";
import Button from "../../components/button";

export default function Login() {
    return (
        <AuthLayout>
            <Head title="Login" />
            <Card className="w-100 bg-white">
                <img src="/logo.png" className="w-10 mx-auto" alt="Logo PLN" />
                <h1 className="text-[28px] text-center font-bold text-dark mb-5">
                    Login
                </h1>
                <Form method="POST" action="/login" className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="johndoe@gmail.com"
                                error={errors.email}
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                name="password"
                                error={errors.password}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Log in
                            </Button>
                        </>
                    )}
                </Form>
            </Card>
        </AuthLayout>
    );
}
