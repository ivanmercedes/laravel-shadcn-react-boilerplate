import { Link } from '@inertiajs/react';
import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <Link href="/">
        <span
            className="font-light text-3xl bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text hover:cursor-pointer"
        >
            Kit Starter shadcn
        </span>
    </Link>
    );
}
