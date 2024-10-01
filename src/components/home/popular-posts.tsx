import {popularPosts} from "@/lib/placeholder-data";
import {Icons} from "@/components/icons";
import Link from "next/link";

export default function PopularPosts() {
    return (
        <ul className="overflow-auto">
            {popularPosts.map((post) => (
                <Link href={`/blog/`} key={post.title}>
                    <li className="flex items-center gap-2 cursor-pointer py-2 group">
                        <Icons.arrowRight className="h-6 w-6 group-hover:translate-x-1 transition-all"/>
                        <p>{post.title}</p>
                    </li>
                </Link>

            ))}
        </ul>
    );
}
