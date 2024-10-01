import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 从文件夹内获取所有 mdx 文件
function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

// 读取所有 mdx 文件内容
function readMDXFile(filePath: fs.PathOrFileDescriptor) {
    let rawContent = fs.readFileSync(filePath, "utf-8");
    return matter(rawContent);
}

// 展示 mdx 数据和元信息
function getMDXData(dir: string) {
    let mdxFiles = getMDXFiles(dir);

    return mdxFiles.map((file) => {
        let {data: metadata, content} = readMDXFile(path.join(dir, file));
        let slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), "src", "app", "blog", "contents"));
}

export function formatDate(date: string, includeRelative: true) {
    let currentDate = new Date();
    if (!date.includes("T")) {
        date = `${date}T00:00:00`;
    }

    let targetDate = new Date(date);

    let fullDate = targetDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (!includeRelative) {
        return fullDate;
    }

    let yearAgo = currentDate.getFullYear() - targetDate.getFullYear();
    let monthAgo = currentDate.getMonth() - targetDate.getMonth();
    let dayAgo = currentDate.getDate()- targetDate.getDate();

    let formattedDate: string;

    if (yearAgo > 0) {
        formattedDate = `${yearAgo}y ago`;
    } else if (monthAgo > 0) {
        formattedDate = `${monthAgo}mo ago`;
    } else if (dayAgo > 0) {
        formattedDate = `${dayAgo}d ago`
    } else {
        formattedDate = "Today";
    }

    return `${fullDate} (${formattedDate})`;
}

