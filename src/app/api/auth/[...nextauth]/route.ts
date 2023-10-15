import NextAuth from "next-auth";
import { NextApiHandler } from 'next';
import { AuthOptions } from "../../util";
import { GET } from "../../recepi/route";
const handler: NextApiHandler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
