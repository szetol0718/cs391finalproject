// DELETE: Remove a task by ID
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}