import NextAuth from "next-auth";
import { NextApiHandler } from 'next';
import { AuthOptions } from "../../util";
const handler: NextApiHandler = NextAuth(AuthOptions);
export default handler;
