import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

interface EditProps {
    auth: any;
    mustVerifyEmail: boolean;
    status: string | null;
}

export default function Edit({ auth, mustVerifyEmail, status }: EditProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid xl:grid-cols-4">
                        <div>
                            <nav className="grid gap-4 text-sm text-muted-foreground">
                            <Link
                                    href="#"
                                    className="font-semibold text-primary"
                                >
                                    Profile
                                </Link>

                            </nav>

                        </div>
                        <div className="col-span-3 space-y-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />

                            <UpdatePasswordForm />

                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
