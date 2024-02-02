import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const getPages = (req: NextApiRequest, res: NextApiResponse) => {

const pagesDirectory = path.join(process.cwd(), "public/img");
    const filenames = fs.readdirSync(pagesDirectory);
    const pages = filenames.filter((filename) => {
        return (
            path.extname(filename) === ".jpg" &&
            path.extname(filename) === ".png" &&
            path.extname(filename) === ".jpeg" &&
            path.extname(filename) === ".gif"
        );
    });

    res.status(200).json(pages);
};

export default getPages;