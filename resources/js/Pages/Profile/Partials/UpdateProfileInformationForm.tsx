import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { toast } from "@/hooks/use-toast";

interface props {
    mustVerifyEmail: boolean;
    status: string | null;
    className?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: props) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e: {preventDefault: ()=> void}) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    if (recentlySuccessful) {
        toast({
            title: "Success",
            description: "Profile updated successfully",
        });
    }

    return (
        <section className={className}>
            <form onSubmit={submit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your account's profile information and email
                            address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button disabled={processing}>Save</Button>
                    </CardFooter>
                </Card>
            </form>
        </section>
    );
}
