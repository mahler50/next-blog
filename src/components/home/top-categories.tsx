import {categories} from "@/lib/placeholder-data";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function TopCategories() {
    return (
        <div className="grid grid-cols-3 gap-2">
            {categories.map((category) => (
                <Button key={category} variant={"secondary"} className="hover:scale-110 transition-all" asChild>
                    <Link href={`/blog/${category.replace(' ', '-')}`}>
                        {category}
                    </Link>
                </Button>
            ))}
        </div>
    );
}
