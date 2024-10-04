import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput?.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`${className}`}>
            <form onSubmit={deleteUser}>
                <Card>
                    <CardHeader>
                        <CardTitle>Delete Account</CardTitle>
                        <CardDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Before
                            deleting your account, please download any data or
                            information that you wish to retain.
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="border-t px-6 py-4">
                        <Button
                            onClick={confirmUserDeletion}
                            variant={"destructive"}
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </CardFooter>
                </Card>
            </form>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser}>
                    <Card className="p-6">
                        <CardContent className="space-y-6">
                            <h2 className="text-lg font-medium text-gray-100">
                                Are you sure you want to delete your account?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Please enter your password to confirm you would
                                like to permanently delete your account.
                            </p>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="sr-only"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-3/4"
                                    isFocused
                                    placeholder="Password"
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button onClick={closeModal}>Cancel</Button>

                                <Button
                                    variant="destructive"
                                    disabled={processing}
                                    className="ms-3"
                                >
                                    {" "}
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Modal>
        </section>
    );
}
