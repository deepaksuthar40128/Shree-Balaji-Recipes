import Recepi from "@/models/Recepi";
import connect from "@/utils/db"; 
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, { params }: { params: any }) => {
    try { 
        await connect();
        console.log(params.id); 
        let data = await Recepi.findById(params.id).populate('userId'); 
        console.log(data);
        if (data) {
            return new NextResponse(JSON.stringify(data));
        }

    } catch (err) {
        console.log(err);
    }
}