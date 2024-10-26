import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface UpdateTargetRequest {
  pipelineStatus: string | null;
}

interface Params {
  id: string;
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    const { pipelineStatus }: UpdateTargetRequest = await req.json();

    const filePath = path.join(process.cwd(), 'data', 'targets.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const targets = JSON.parse(fileContents);

    const targetIndex = targets.findIndex((target: { id: number; }) => target.id === parseInt(id));
    if (targetIndex === -1) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    // Update history before changing the status
    const currentTarget = targets[targetIndex];
    const currentStatus = currentTarget.pipelineStatus;

    // Update the target status and timestamp
    currentTarget.pipelineStatus = pipelineStatus;
    currentTarget.lastUpdated = new Date().toISOString();

    // Add to history
    if (!currentTarget.history) {
      currentTarget.history = []; // Initialize history if it doesn't exist
    }
    currentTarget.history.push({
      status: currentStatus,
      updatedAt: currentTarget.lastUpdated
    });

    // Save the updated targets back to the file
    fs.writeFileSync(filePath, JSON.stringify(targets, null, 2));

    return NextResponse.json(currentTarget, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
