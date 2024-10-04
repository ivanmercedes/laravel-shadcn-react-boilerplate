import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface DashboardProps {
    auth: any;
}

export default function Dashboard({ auth }: DashboardProps) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <h1>Start build here</h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
