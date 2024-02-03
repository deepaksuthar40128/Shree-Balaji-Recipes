import NextAuth from "next-auth"; 
import { AuthOptions } from "../../util"; 
const handler: any = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
