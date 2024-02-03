import Recepi from "@/models/Recepi";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const POST = async (req: NextRequest) => {
    try {
        await connect();
        let body = await req.formData();
        console.log("Hello Vercel!!");
        let data = body.get('data');
        let recepi = JSON.parse(data as string);
        console.log(recepi);
        let newRecepi = new Recepi({
            userId: recepi.id,
            itemName: recepi.itemName,
            title: recepi.title,
            serving: recepi.serving,
            calories: recepi.calories,
            cookingTime: recepi.cookingTime,
            heroImage: recepi.heroImage,
            photos: recepi.photos,
            recepi: recepi.recepi
        })
        await newRecepi.save();
        return new NextResponse(JSON.stringify({ success: true }));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ success: false }));
    }
}

