interface GuestProps {
    children: React.ReactNode;
}

export default function Guest({ children }: GuestProps) {
    return (
        <div className="w-full lg:grid  xl:grid-cols-2 min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">{children}</div>
            </div>
            <div className="hidden bg-muted xl:block"></div>
        </div>
    );
}
