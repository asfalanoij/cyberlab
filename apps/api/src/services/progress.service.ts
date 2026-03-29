import { db, schema } from '../db'
import { eq, and } from 'drizzle-orm'

export const progressService = {
  async getByUser(userId: string) {
    return db.select().from(schema.progress).where(eq(schema.progress.userId, userId))
  },

  async upsert(userId: string, notebookSlug: string, status: string, notes?: string) {
    const existing = await db.select().from(schema.progress)
      .where(and(eq(schema.progress.userId, userId), eq(schema.progress.notebookSlug, notebookSlug)))
      .get()

    if (existing) {
      return db.update(schema.progress)
        .set({
          status,
          notes: notes ?? existing.notes,
          completedAt: status === 'completed' ? new Date() : existing.completedAt,
          updatedAt: new Date(),
        })
        .where(eq(schema.progress.id, existing.id))
        .returning()
        .get()
    }

    return db.insert(schema.progress)
      .values({
        userId,
        notebookSlug,
        status,
        notes: notes ?? null,
        completedAt: status === 'completed' ? new Date() : null,
      })
      .returning()
      .get()
  }
}
