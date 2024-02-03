import Recepi from "@/models/Recepi";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest) => {
    try {
        await connect();
        let pageNum = parseInt(req.nextUrl.searchParams.get('page') as string);
        let searchQuery = req.nextUrl.searchParams.get('q') as string;
        console.log(searchQuery)
        let data;
        if (searchQuery.length) {
            data = await Recepi.aggregate([
                {
                    '$match': {
                        '$or': [
                            {
                                'title': new RegExp(searchQuery, 'i')
                            }, {
                                'itemName': new RegExp(searchQuery, 'i')
                            }
                        ]
                    }
                }, {
                    '$sort': {
                        'createdAt': -1
                    }
                }, {
                    '$skip': 6 * (pageNum as number),
                }, {
                    '$limit': 6
                }
            ])
        } else {
            data = await Recepi.aggregate([
                {
                    $sort: {
                        createdAt: -1,
                    },

                }, {
                    $skip: 6 * (pageNum as number),
                },
                {
                    $limit: 6,
                }
            ])
        }
        console.log("gone")
        return new NextResponse(JSON.stringify({ success: true, data }));
    } catch (err) {
        return new NextResponse(JSON.stringify({ success: false ,error:err}));
    }
}