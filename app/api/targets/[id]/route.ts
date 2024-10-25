// app/api/targets/[id]/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // Specify the path to the targets.json file
    const filePath = path.resolve(process.cwd(), 'data', 'targets.json');

    // Read and parse the current data in targets.json
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Find the target by ID
    const targetIndex = jsonData.findIndex((target: { id: number }) => target.id === parseInt(id, 10));
    if (targetIndex === -1) {
        return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    // Parse the request body to get the new pipelineStatus
    const { pipelineStatus } = await req.json();
    jsonData[targetIndex].pipelineStatus = pipelineStatus;

    // Write the updated data back to targets.json
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(jsonData[targetIndex], { status: 200 });
}